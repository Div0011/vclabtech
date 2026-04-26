'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface PixelParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

const BLUE_GRADIENT = [
  '#1E40AF',
  '#2563EB',
  '#3B82F6',
  '#60A5FA',
  '#93C5FD',
  '#BFDBFE',
]

function getRandomBlue(): string {
  return BLUE_GRADIENT[Math.floor(Math.random() * BLUE_GRADIENT.length)]
}

const REVEAL_VARIANTS = ['cursor-reveal-black', 'cursor-reveal-blue', 'cursor-reveal-white'] as const

const AUTO_REVEAL_SELECTOR = [
  'main h1',
  'main h2',
  'main h3',
  'main h4',
  'main h5',
  'main h6',
  'main p',
  'main a',
  'main li',
  'main span',
  'main strong',
  'main em',
  'main small',
  'header a',
  'nav a',
].join(', ')

function detectRevealVariant(element: HTMLElement): typeof REVEAL_VARIANTS[number] {
  const color = window.getComputedStyle(element).color
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  if (!match) return 'cursor-reveal-black'

  const r = Number(match[1])
  const g = Number(match[2])
  const b = Number(match[3])
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

  if (luminance >= 0.82) return 'cursor-reveal-white'
  if (b > r + 18 && b > g + 10 && b >= 110) return 'cursor-reveal-blue'
  return 'cursor-reveal-black'
}

function shouldAutoReveal(element: HTMLElement): boolean {
  if (element.closest('[data-no-cursor-reveal], .cursor-reveal-ignore')) return false
  if (element.closest('button, input, textarea, select, label, [contenteditable="true"]')) return false
  if (element.classList.contains('reveal-wrapper') || element.classList.contains('menu-link-pixel')) return false
  if (!element.textContent || !element.textContent.trim()) return false

  const rect = element.getBoundingClientRect()
  return rect.width > 0 && rect.height > 0
}

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorLabelRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const revealElementsRef = useRef<HTMLElement[]>([])
  const observerRef = useRef<MutationObserver | null>(null)
  const refreshTimerRef = useRef<number | null>(null)
  const particlesRef = useRef<PixelParticle[]>([])
  const mouseRef = useRef({ x: -100, y: -100, prevX: -100, prevY: -100 })
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)
  const xDotTo = useRef<gsap.QuickToFunc | null>(null)
  const yDotTo = useRef<gsap.QuickToFunc | null>(null)

  const PIXEL_SIZE = 3
  const GRID_SIZE = 7

  useGSAP(() => {
    if (cursorRef.current && cursorDotRef.current) {
      // Both follow at same fast speed for tight alignment
      xTo.current = gsap.quickTo(cursorRef.current, 'x', { duration: 0.08, ease: 'power2.out' })
      yTo.current = gsap.quickTo(cursorRef.current, 'y', { duration: 0.08, ease: 'power2.out' })
      xDotTo.current = gsap.quickTo(cursorDotRef.current, 'x', { duration: 0.08, ease: 'power2.out' })
      yDotTo.current = gsap.quickTo(cursorDotRef.current, 'y', { duration: 0.08, ease: 'power2.out' })
    }
  }, [])

  const animateCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    ctx.clearRect(0, 0, rect.width, rect.height)

    const particles = particlesRef.current
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.92
      p.vy *= 0.92
      p.life--

      if (p.life <= 0) {
        particles.splice(i, 1)
        continue
      }

      const alpha = p.life / p.maxLife
      const aHex = Math.floor(alpha * 255).toString(16).padStart(2, '0')
      ctx.fillStyle = p.color + aHex
      ctx.fillRect(p.x, p.y, p.size, p.size)
    }

    const mouse = mouseRef.current
    const dx = mouse.x - mouse.prevX
    const dy = mouse.y - mouse.prevY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist > 1) {
      const numParticles = Math.min(Math.max(2, Math.floor(dist / 3)), 10)
      for (let i = 0; i < numParticles; i++) {
        const t = (i + 1) / (numParticles + 1)
        const px = mouse.prevX + dx * t + (Math.random() - 0.5) * 2
        const py = mouse.prevY + dy * t + (Math.random() - 0.5) * 2

        particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 1.0,
          vy: (Math.random() - 0.5) * 1.0,
          life: 10 + Math.random() * 14,
          maxLife: 24,
          size: 1.5 + Math.random() * 1,
          color: getRandomBlue(),
        })
      }
    }

    mouse.prevX = mouse.x
    mouse.prevY = mouse.y

    animationFrameRef.current = requestAnimationFrame(animateCanvas)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const refreshRevealTargets = () => {
      const candidates = Array.from(document.querySelectorAll<HTMLElement>(AUTO_REVEAL_SELECTOR))

      candidates.forEach((el) => {
        if (!shouldAutoReveal(el)) return
        if (el.classList.contains('cursor-reveal')) return

        el.classList.add('cursor-reveal', 'cursor-reveal-auto')
        el.classList.add(detectRevealVariant(el))
      })

      const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('.cursor-reveal, .reveal-wrapper, .menu-link-pixel'))

      revealNodes.forEach((el) => {
        if (!el.classList.contains('cursor-reveal-auto')) return
        REVEAL_VARIANTS.forEach((cls) => el.classList.remove(cls))
        el.classList.add(detectRevealVariant(el))
      })

      revealElementsRef.current = revealNodes
    }

    refreshRevealTargets()
    observerRef.current = new MutationObserver(() => {
      refreshRevealTargets()
    })
    observerRef.current.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('resize', refreshRevealTargets)
    refreshTimerRef.current = window.setInterval(refreshRevealTargets, 2000)

    animationFrameRef.current = requestAnimationFrame(animateCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      // Move cursor elements
      if (xTo.current) xTo.current(e.clientX)
      if (yTo.current) yTo.current(e.clientY)
      if (xDotTo.current) xDotTo.current(e.clientX)
      if (yDotTo.current) yDotTo.current(e.clientY)
      if (cursorLabelRef.current) {
        gsap.set(cursorLabelRef.current, { x: e.clientX, y: e.clientY })
      }

      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      if (mouseRef.current.prevX < 0) {
        mouseRef.current.prevX = e.clientX
        mouseRef.current.prevY = e.clientY
      }

      // Update global mouse position for reveal effects
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)

      // Keep local clip-path effects aligned by writing per-element cursor coords.
      revealElementsRef.current.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const relX = e.clientX - rect.left
        const relY = e.clientY - rect.top
        el.style.setProperty('--cursor-x', `${relX}px`)
        el.style.setProperty('--cursor-y', `${relY}px`)
      })
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1.3, duration: 0.2, ease: 'power2.out' })
        gsap.to(cursorDotRef.current, { scale: 1.5, duration: 0.15, ease: 'power2.out' })
      }
    }

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' })
        gsap.to(cursorDotRef.current, { scale: 1, duration: 0.15, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const interactables = document.querySelectorAll('button, a, input, select, textarea')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener)
      el.addEventListener('mouseleave', handleMouseLeave as EventListener)
    })

    const handlePointerDown = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 0.85, duration: 0.1, ease: 'power2.out' })
      }
    }

    const handlePointerUp = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1.3, duration: 0.15, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('mouseup', handlePointerUp)

    const handleHoverLabel = (event: Event) => {
      const target = event.target as HTMLElement | null
      const labeledElement = target?.closest<HTMLElement>('[data-cursor-label]')
      if (!cursorLabelRef.current) return

      if (labeledElement) {
        cursorLabelRef.current.textContent = labeledElement.dataset.cursorLabel || ''
        gsap.to(cursorLabelRef.current, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' })
      } else {
        gsap.to(cursorLabelRef.current, { opacity: 0, y: 4, duration: 0.2, ease: 'power2.out' })
      }
    }

    document.addEventListener('mouseover', handleHoverLabel)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (refreshTimerRef.current !== null) {
        window.clearInterval(refreshTimerRef.current)
      }
      window.removeEventListener('resize', refreshRevealTargets)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('mouseup', handlePointerUp)
      document.removeEventListener('mouseover', handleHoverLabel)
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener)
        el.removeEventListener('mouseleave', handleMouseLeave as EventListener)
      })
    }
  }, [isTouchDevice, animateCanvas])

  if (isTouchDevice) return null

  const pixels = []
  const center = Math.floor(GRID_SIZE / 2)
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const distFromCenter = Math.sqrt(Math.pow(row - center, 2) + Math.pow(col - center, 2))
      if (distFromCenter <= center + 0.5) {
        const colorIndex = Math.floor(((row * GRID_SIZE + col) / (GRID_SIZE * GRID_SIZE)) * BLUE_GRADIENT.length)
        pixels.push({
          row,
          col,
          color: BLUE_GRADIENT[Math.min(colorIndex, BLUE_GRADIENT.length - 1)],
          distFromCenter,
        })
      }
    }
  }

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[99]" style={{ width: '100%', height: '100%' }} />

      <div ref={cursorRef} className="fixed top-0 left-0 pointer-events-none z-[100]" style={{ transform: 'translate(-50%, -50%)', width: GRID_SIZE * PIXEL_SIZE, height: GRID_SIZE * PIXEL_SIZE }}>
        <div className="relative w-full h-full">
          {pixels.map((pixel, i) => (
            <div key={i} className="absolute" style={{ width: PIXEL_SIZE, height: PIXEL_SIZE, left: pixel.col * PIXEL_SIZE, top: pixel.row * PIXEL_SIZE, backgroundColor: pixel.color, opacity: 0.5 + (1 - pixel.distFromCenter / (center + 0.5)) * 0.5, boxShadow: `0 0 ${3 + pixel.distFromCenter}px ${pixel.color}60` }} />
          ))}
        </div>
      </div>

      <div ref={cursorDotRef} className="fixed top-0 left-0 pointer-events-none z-[101]" style={{ transform: 'translate(-50%, -50%)' }}>
        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_6px_rgba(96,165,250,0.9),0_0_12px_rgba(59,130,246,0.5)]" />
      </div>

      <div ref={cursorLabelRef} className="fixed top-0 left-0 z-[102] pointer-events-none rounded-full border border-[#3B82F6]/30 bg-[#0F172A]/80 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-[#93C5FD] opacity-0 backdrop-blur-sm" style={{ transform: 'translate(-50%, 18px)' }} />
    </>
  )
}

