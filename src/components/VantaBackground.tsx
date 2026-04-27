'use client'

import React, { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    VANTA?: {
      HALO: (options: VantaHaloOptions) => VantaEffectInstance
    }
    THREE?: unknown
  }
}

type VantaEffectInstance = {
  destroy: () => void
}

type VantaHaloOptions = {
  el: HTMLDivElement
  mouseControls: boolean
  touchControls: boolean
  gyroControls: boolean
  minHeight: number
  minWidth: number
  backgroundColor: number
  baseColor: number
  size: number
  amplitudeFactor: number
  xOffset: number
  yOffset: number
}

export const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<VantaEffectInstance | null>(null)
  const [shouldUseVanta, setShouldUseVanta] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const updateMode = () => setShouldUseVanta(mediaQuery.matches)

    updateMode()
    mediaQuery.addEventListener('change', updateMode)

    return () => mediaQuery.removeEventListener('change', updateMode)
  }, [])

  useEffect(() => {
    if (!shouldUseVanta) return

    let cancelled = false

    const loadScripts = async () => {
      if (cancelled) return
      const win = window as Window & {
        requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
        cancelIdleCallback?: (handle: number) => void
      }

      if (!win.THREE) {
        const threeScript = document.createElement('script')
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
        document.head.appendChild(threeScript)
        await new Promise((resolve) => (threeScript.onload = resolve))
      }

      if (cancelled) return

      if (!win.VANTA) {
        const vantaScript = document.createElement('script')
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js'
        document.head.appendChild(vantaScript)
        await new Promise((resolve) => (vantaScript.onload = resolve))
      }

      if (cancelled) return

      if (!vantaEffect && vantaRef.current && win.VANTA) {
        setVantaEffect(
          win.VANTA.HALO({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            backgroundColor: 0xf7f7f5,
            baseColor: 0x0f172a,
            size: 1.2,
            amplitudeFactor: 1.1,
            xOffset: 0,
            yOffset: 0
          })
        )
      }
    }

    const startLoading = () => {
      void loadScripts()
    }

    const win = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (handle: number) => void
    }

    const idleCallbackId = win.requestIdleCallback
      ? win.requestIdleCallback(startLoading, { timeout: 1500 })
      : window.setTimeout(startLoading, 1200)

    return () => {
      cancelled = true
      if (win.cancelIdleCallback && typeof idleCallbackId === 'number') {
        win.cancelIdleCallback(idleCallbackId)
      } else {
        window.clearTimeout(idleCallbackId)
      }
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [shouldUseVanta, vantaEffect])

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 z-0 opacity-65 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.12),transparent_45%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]"
      id="vanta-bg"
    />
  )
}
