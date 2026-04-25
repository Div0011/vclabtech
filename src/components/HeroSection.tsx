'use client'

import { motion } from 'framer-motion'
import { MagneticButton } from './MagneticButton'
import { useAudioStore } from '@/context/AudioContext'
import { RevealText, SectionTilt } from './InteractiveWrappers'
import { VantaBackground } from './VantaBackground'

export const HeroSection = () => {
  const { hasEngaged } = useAudioStore()

  const headline = "ENGINEERING DIGITAL DOMINANCE"
  const words = headline.split(' ')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2 // Small delay after engagement
      }
    }
  }

  const wordVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
      }
    }
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 sm:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <VantaBackground />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={hasEngaged ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 container mx-auto px-2 sm:px-6 text-center"
      >
        {/* Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={hasEngaged ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative font-mono text-[9px] sm:text-[10px] tracking-[0.45em] sm:tracking-[0.6em] text-[#60A5FA] mb-6 sm:mb-8 opacity-90"
        >
          001 // NEURAL ARCHITECTURE
        </motion.div>
        
        <SectionTilt direction="right">
          <motion.h1 
            className="relative text-[clamp(2.4rem,12vw,6rem)] sm:text-[clamp(2.5rem,8vw,6rem)] font-display font-bold bg-gradient-to-br from-[#3B82F6] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent tracking-tighter leading-[0.88] sm:leading-[0.85] mb-8 sm:mb-12 max-w-4xl mx-auto flex flex-wrap justify-center overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate={hasEngaged ? "visible" : "hidden"}
          >
            {words.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mx-[0.05em] pb-3 sm:pb-6">
                <motion.span 
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </SectionTilt>
        
        <div className="flex flex-col items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={hasEngaged ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="max-w-3xl px-2 sm:px-0"
          >
            <RevealText 
              text="We architect high-performance web experiences that convert attention into authority."
              className="text-xl sm:text-2xl lg:text-3xl text-navy/60 font-medium"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasEngaged ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
            className="flex justify-center w-full"
          >
            <MagneticButton className="group relative overflow-hidden px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold tracking-[0.16em] sm:tracking-[0.2em] text-[10px] sm:text-[11px] transition-all bg-navy text-white hover:bg-cobalt hover:shadow-[0_15px_40px_-10px_rgba(37,99,235,0.4)] border border-transparent">
              <span className="relative z-10 flex items-center justify-center gap-3">
                START TRANSFORMATION
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
