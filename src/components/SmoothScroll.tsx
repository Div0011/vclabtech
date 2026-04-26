'use client'

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react'
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import type Lenis from 'lenis'
import { useGlobalStore } from '@/store/useGlobalStore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugin once
gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

export const useSmoothScroll = () => {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) {
    throw new Error('useSmoothScroll must be used within SmoothScroll')
  }
  return ctx
}

const LenisGsapSync = () => {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to drive Lenis RAF for perfect sync
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(tickerCallback)
    }
  }, [lenis])

  return null
}

const LenisVelocityTracker = ({ onVelocity }: { onVelocity: (velocity: number) => void }) => {
  useLenis((lenisInstance) => {
    onVelocity(lenisInstance.velocity)
  })

  return null
}

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const setVelocity = useGlobalStore((state) => state.setVelocity)
  const [enableLenis, setEnableLenis] = useState(false)
  const lenisRef = useRef<LenisRef | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const updateMode = () => setEnableLenis(mediaQuery.matches)

    updateMode()
    mediaQuery.addEventListener('change', updateMode)

    return () => mediaQuery.removeEventListener('change', updateMode)
  }, [])

  const scrollTo = (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
    const lenis = lenisRef.current?.lenis
    if (lenis) {
      lenis.scrollTo(target as never, {
        offset: 0,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      })
    } else {
      // Fallback for reduced-motion or before Lenis init
      if (typeof target === 'string') {
        const el = document.querySelector(target)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  if (!enableLenis) {
    return (
      <SmoothScrollContext.Provider value={{ scrollTo }}>
        {children}
      </SmoothScrollContext.Provider>
    )
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        autoRaf: false, // We drive RAF via GSAP ticker for perfect sync
      }}
    >
      <LenisGsapSync />
      <LenisVelocityTracker onVelocity={setVelocity} />
      <SmoothScrollContext.Provider value={{ scrollTo }}>
        {children}
      </SmoothScrollContext.Provider>
    </ReactLenis>
  )
}

