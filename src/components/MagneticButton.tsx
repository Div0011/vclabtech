'use client'

import { useRef, MouseEvent, ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export const MagneticButton = ({ children, onClick, className = '' }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)

  useGSAP(() => {
    if (buttonRef.current) {
      xTo.current = gsap.quickTo(buttonRef.current, 'x', { duration: 0.4, ease: 'power3' })
      yTo.current = gsap.quickTo(buttonRef.current, 'y', { duration: 0.4, ease: 'power3' })
    }
  }, { scope: buttonRef })

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    
    if (xTo.current) xTo.current(x * 0.2)
    if (yTo.current) yTo.current(y * 0.2)
  }

  const handleMouseEnter = (_e: MouseEvent) => {
    // magnetic entrance — no audio
  }

  const handleMouseLeave = () => {
    if (xTo.current) xTo.current(0)
    if (yTo.current) yTo.current(0)
  }

  const handleClick = () => {
    if (onClick) onClick()
  }

  return (
    <button
      ref={buttonRef}
      data-sfx-local="true"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative focus-visible:outline-cyan ${className}`}
      aria-label="Interactive Button"
    >
      {children}
    </button>
  )
}
