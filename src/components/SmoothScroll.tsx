'use client'

import { useEffect, useState } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useGlobalStore } from '@/store/useGlobalStore'

const LenisVelocityTracker = ({ onVelocity }: { onVelocity: (velocity: number) => void }) => {
  useLenis(({ velocity }) => {
    onVelocity(velocity)
  })

  return null
}

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const setVelocity = useGlobalStore((state) => state.setVelocity)
  const [enableLenis, setEnableLenis] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    const updateMode = () => setEnableLenis(mediaQuery.matches)

    updateMode()
    mediaQuery.addEventListener('change', updateMode)

    return () => mediaQuery.removeEventListener('change', updateMode)
  }, [])

  if (!enableLenis) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      <LenisVelocityTracker onVelocity={setVelocity} />
      {children}
    </ReactLenis>
  )
}
