'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '@/context/AudioContext'
import { useGlobalStore } from '@/store/useGlobalStore'

type Step = 'objective' | 'parameters' | 'uplink' | 'success'

export const LeadCapture = () => {
  const [step, setStep] = useState<Step>('objective')
  const [formData, setFormData] = useState({
    objective: '',
    budget: 5000,
    timeline: 3,
    name: '',
    email: ''
  })
  const { playClick, playSuccess } = useAudio()
  const setWarpMode = useGlobalStore((state) => state.setWarpMode)

  const handleNext = (nextStep: Step) => {
    playClick()
    setStep(nextStep)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    playSuccess()
    setWarpMode(true)
    setStep('success')
    
    // Reset warp after 2 seconds
    setTimeout(() => {
      setWarpMode(false)
    }, 2000)
  }

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <section className="relative py-24 sm:py-32 lg:py-64 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cobalt via-cobalt/90 to-silver opacity-90" />
      
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto flex flex-col items-center"
        >
          <span className="text-[9px] sm:text-[10px] font-mono text-white/50 tracking-[0.45em] sm:tracking-[0.8em] uppercase mb-8 sm:mb-12">
            PROTOCOL // JOIN_THE_ELITE
          </span>

          <h2 className="text-[clamp(2.2rem,10vw,5rem)] sm:text-[clamp(2.5rem,7vw,5rem)] font-display font-bold text-white tracking-tighter leading-[0.9] sm:leading-[0.85] mb-8 sm:mb-12">
            JOIN THE MISSION TO <br /> <span className="text-white/40 italic">ARCHITECT</span> DOMINANCE.
          </h2>

          <p className="text-base sm:text-xl md:text-3xl text-white/60 font-light mb-12 sm:mb-20 max-w-3xl mx-auto leading-tight">
            Apply today to learn how we engineer digital growth with mathematical precision.
          </p>
          
          <div className="w-full flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 sm:px-16 lg:px-20 py-5 sm:py-6 lg:py-8 rounded-full border border-white/40 bg-white/5 backdrop-blur-3xl text-white font-display font-bold text-base sm:text-xl tracking-tight hover:bg-white hover:text-navy transition-all duration-700 shadow-2xl"
            >
              INITIATE UPLINK
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/20 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 blur-[150px] rounded-full animate-pulse" />
    </section>
  )
}
