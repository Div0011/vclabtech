'use client'

import { motion } from 'framer-motion'

export const LeadCapture = () => {
  return (
    <section
      className="relative py-24 sm:py-32 lg:py-64 overflow-hidden"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1200px' }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cobalt via-cobalt/90 to-silver opacity-90" />

      {/* Join Bubble Layer */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden="true"
          className="absolute -left-20 top-12 h-52 w-52 rounded-full border border-white/20 bg-white/12 hidden md:block"
          animate={{ y: [-10, 12, -10], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute right-8 top-20 h-40 w-40 rounded-full border border-white/20 bg-white/10 hidden md:block"
          animate={{ y: [12, -8, 12], x: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-10 left-1/4 h-32 w-32 rounded-full border border-white/20 bg-white/10 hidden lg:block"
          animate={{ y: [8, -12, 8] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -bottom-14 right-1/3 h-60 w-60 rounded-full border border-white/20 bg-white/8 hidden lg:block"
          animate={{ y: [-6, 10, -6], x: [0, 6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      
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
            className="px-10 sm:px-16 lg:px-20 py-5 sm:py-6 lg:py-8 rounded-full border border-white/40 bg-white/5 backdrop-blur-3xl text-white font-display font-bold text-base sm:text-xl tracking-tight hover:bg-white hover:text-navy transition-all duration-300 shadow-2xl will-change-transform"
            >
              INITIATE UPLINK
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
