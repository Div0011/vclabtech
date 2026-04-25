'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorLabelRef = useRef<HTMLDivElement>(null)
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)
  const xDotTo = useRef<gsap.QuickToFunc | null>(null)
  const yDotTo = useRef<gsap.QuickToFunc | null>(null)

  useGSAP(() => {
    if (cursorRef.current && cursorDotRef.current) {
      xTo.current = gsap.quickTo(cursorRef.current, 'x', { duration: 0.6, ease: 'power3' })
      yTo.current = gsap.quickTo(cursorRef.current, 'y', { duration: 0.6, ease: 'power3' })
      xDotTo.current = gsap.quickTo(cursorDotRef.current, 'x', { duration: 0.1, ease: 'power3' })
      yDotTo.current = gsap.quickTo(cursorDotRef.current, 'y', { duration: 0.1, ease: 'power3' })
    }
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      if (xTo.current) xTo.current(e.clientX)
      if (yTo.current) yTo.current(e.clientY)
      if (xDotTo.current) xDotTo.current(e.clientX)
      if (yDotTo.current) yDotTo.current(e.clientY)
      
      // Update global CSS variables for reveal effects
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1.35, duration: 0.25, ease: 'power2.out' })
        gsap.to(cursorDotRef.current, { scale: 1.5, duration: 0.2, ease: 'power2.out' })
      }
    }
    
    const handleMouseLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.25, ease: 'power2.out' })
        gsap.to(cursorDotRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    // Add listeners to interactive elements
    const interactables = document.querySelectorAll('button, a, input, select, textarea')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener)
      el.addEventListener('mouseleave', handleMouseLeave as EventListener)
    })

    const handlePointerDown = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 0.9, duration: 0.15, ease: 'power2.out' })
      }
    }

    const handlePointerUp = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1.35, duration: 0.2, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('mouseup', handlePointerUp)

    const handleHoverLabel = (event: Event) => {
      const target = event.target as HTMLElement | null
      const labeledElement = target?.closest<HTMLElement>('[data-cursor-label]')
      if (!cursorLabelRef.current) {
        return
      }

      if (labeledElement) {
        cursorLabelRef.current.textContent = labeledElement.dataset.cursorLabel || ''
        gsap.to(cursorLabelRef.current, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' })
      } else {
        gsap.to(cursorLabelRef.current, { opacity: 0, y: 4, duration: 0.2, ease: 'power2.out' })
      }
    }

    document.addEventListener('mouseover', handleHoverLabel)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('mouseup', handlePointerUp)
      document.removeEventListener('mouseover', handleHoverLabel)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener)
        el.removeEventListener('mouseleave', handleMouseLeave as EventListener)
      })
    }
  }, [isTouchDevice])

  if (isTouchDevice) {
    return null
  }

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-11 h-11 pointer-events-none z-[100] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      >
        {/* Main ring */}
        <div 
          style={{ filter: 'url(#pixelate)' }}
          className="absolute inset-0 rounded-full border border-navy/40 bg-navy/5 backdrop-blur-[2px] shadow-[0_0_20px_rgba(15,23,42,0.1)] animate-[spin_10s_linear_infinite]"
        >
          <div className="absolute inset-2 rounded-full border border-navy/15" />
          <div className="absolute inset-[0.2rem] rounded-full border border-navy/10 opacity-50" />
        </div>
      </div>
      
      <div 
        ref={cursorDotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-navy pointer-events-none z-[101] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(15,23,42,0.3)]"
      />

      <div
        ref={cursorLabelRef}
        className="fixed top-0 left-0 z-[102] pointer-events-none -translate-x-1/2 translate-y-5 rounded-full border border-white/25 bg-navy/70 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-white opacity-0 backdrop-blur-sm"
      />
    </>
  )
}
