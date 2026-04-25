'use client'

import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { useGlobalStore } from '@/store/useGlobalStore'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AudioState {
  isMuted: boolean
  hasEngaged: boolean
  toggleMute: () => void
  engage: () => void
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      isMuted: false,
      hasEngaged: false,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      engage: () => set({ hasEngaged: true }),
    }),
    { name: 'vclabtech-audio-settings' }
  )
)

type SoundType = 'hover' | 'click' | 'milestone' | 'success'

interface AudioContextType {
  playHover: (x?: number, y?: number) => void
  playClick: () => void
  playMilestone: () => void
  playSuccess: () => void
}

const AudioContext = createContext<AudioContextType | null>(null)

export const AudioEngineProvider = ({ children }: { children: React.ReactNode }) => {
  const { isMuted, hasEngaged } = useAudioStore()
  const setAudioReady = useGlobalStore((state) => state.setAudioReady)
  const spriteRef = useRef<import('howler').Howl | null>(null)
  const howlerRef = useRef<typeof import('howler') | null>(null)
  // Ensure we don't fade multiple times simultaneously
  const isFading = useRef(false)

  useEffect(() => {
    // Keep the UI responsive by not blocking initial render on audio loading.
    setAudioReady(true)
  }, [setAudioReady])

  useEffect(() => {
    if (typeof window === 'undefined' || !hasEngaged || spriteRef.current) return

    let cancelled = false

    const initAudio = async () => {
      const howler = await import('howler')
      if (cancelled) return

      howlerRef.current = howler
      const { Howl, Howler } = howler

      spriteRef.current = new Howl({
        src: ['/audio/UI-Sprite.mp3'],
        sprite: {
          hover: [0, 150],
          click: [200, 50],
          milestone: [300, 1500],
          success: [2000, 800],
        },
        volume: 0.8,
        preload: true,
        onloaderror: () => {
          console.warn('Audio sprite failed to load. Providing fallback.')
        }
      })

      const handleVisibilityChange = () => {
        if (!spriteRef.current) return
        if (document.hidden) {
          isFading.current = true
          spriteRef.current.fade(0.8, 0, 500)
        } else {
          if (!useAudioStore.getState().isMuted) {
            spriteRef.current.fade(0, 0.8, 500)
          }
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)

      if (document.hidden && spriteRef.current) {
        spriteRef.current.volume(0)
      }

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        if (spriteRef.current) spriteRef.current.unload()
        Howler.unload()
      }
    }

    void initAudio()

    return () => {
      cancelled = true
    }
  }, [hasEngaged])

  useEffect(() => {
    if (howlerRef.current) {
      howlerRef.current.Howler.mute(isMuted || !hasEngaged)
    }
  }, [isMuted, hasEngaged])

  const playSound = useCallback((id: SoundType, x?: number, y?: number) => {
    if (!spriteRef.current || isMuted || !hasEngaged) return
    
    const soundId = spriteRef.current.play(id)
    
    // Simple spatial panning
    if (x !== undefined && y !== undefined && id === 'hover') {
      const normX = (x / window.innerWidth) * 2 - 1
      const normY = (y / window.innerHeight) * 2 - 1
      spriteRef.current.pos(normX, normY, -0.5, soundId)
    }
  }, [hasEngaged, isMuted])

  useEffect(() => {
    const shouldPlayForTarget = (target: EventTarget | null) => {
      const element = target as HTMLElement | null
      if (!element) return true
      if (element.closest('[data-sfx-local="true"]')) return false
      return true
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!shouldPlayForTarget(event.target)) return
      playSound('click')
    }

    const handleKeyboardActivate = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      if (!shouldPlayForTarget(event.target)) return
      playSound('click')
    }

    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('keydown', handleKeyboardActivate)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyboardActivate)
    }
  }, [playSound])

  return (
    <AudioContext.Provider
      value={{
        playHover: (x, y) => playSound('hover', x, y),
        playClick: () => playSound('click'),
        playMilestone: () => playSound('milestone'),
        playSuccess: () => playSound('success'),
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) throw new Error('useAudio must be used within AudioEngineProvider')
  return context
}
