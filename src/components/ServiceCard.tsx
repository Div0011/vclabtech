'use client'

import { useRef, useEffect } from 'react'
import { useAudio } from '@/context/AudioContext'
import { motion } from 'framer-motion'

interface ServiceCardProps {
  title: string
  description: string
  index: number
  icon?: React.ReactNode
  isActive?: boolean
}

export const ServiceCard = ({ title, description, index, icon, isActive }: ServiceCardProps) => {
  const { playHover } = useAudio()
  const cardRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const tick = () => {
      if (cardRef.current) {
        cardRef.current.style.setProperty('--mouse-x', `${mousePos.current.x}px`)
        cardRef.current.style.setProperty('--mouse-y', `${mousePos.current.y}px`)
      }
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  void icon

  return (
    <motion.div
      onMouseEnter={() => playHover()}
      initial={isActive ? false : { opacity: 0, y: 50 }}
      whileInView={isActive ? undefined : { opacity: 1, y: 0 }}
      viewport={isActive ? undefined : { once: true }}
      transition={isActive ? undefined : { duration: 0.8, delay: index * 0.1 }}
      className={`group relative p-6 sm:p-8 lg:p-12 min-h-[280px] sm:min-h-[340px] lg:min-h-[400px] flex gap-6 sm:gap-8 lg:gap-12 items-center border border-navy/5 bg-white/40 backdrop-blur-xl hover:bg-white/60 transition-all duration-700 rounded-[1.6rem] sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-sm ${isActive ? 'ring-1 ring-cobalt/20 bg-white/80' : ''}`}
    >
      <div className="absolute top-5 right-5 sm:top-8 sm:right-8 lg:top-12 lg:right-12 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full border border-cobalt/20 flex items-center justify-center text-cobalt group-hover:bg-cobalt group-hover:text-white transition-all duration-500 overflow-hidden">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
          className="arrow-right transition-transform duration-500"
        >
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Content Side (Right) */}
      <div className="relative z-10 flex-grow">
        <span className="text-[9px] sm:text-[10px] font-mono text-cobalt tracking-[0.25em] sm:tracking-[0.4em] mb-3 sm:mb-4 block opacity-60">
          0{index + 1} - PROTOCOL
        </span>
        <h3 className="text-[clamp(1.35rem,6vw,2rem)] lg:text-4xl font-display font-bold text-navy mb-3 sm:mb-4 tracking-tighter leading-tight pr-10 sm:pr-14">
          {title}
        </h3>
        <p className="text-slate-500 max-w-md leading-relaxed mb-4 sm:mb-6 text-sm lg:text-base">
          {description}
        </p>
        <div className="flex items-center gap-4 text-cobalt font-mono text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span>LEARN MORE</span>
          <div className="w-8 h-[1px] bg-cobalt" />
        </div>
      </div>
      
      {/* Organic Glow Background */}
      <div className={`absolute -bottom-24 -right-24 w-64 h-64 blur-[100px] transition-all duration-700 ${isActive ? 'bg-cobalt/20' : 'bg-cobalt/5'}`} />
    </motion.div>
  )
}
