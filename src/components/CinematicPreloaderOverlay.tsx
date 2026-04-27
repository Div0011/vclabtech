'use client'

import { useGlobalStore } from '@/store/useGlobalStore'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export const CinematicPreloaderOverlay = () => {
  const { assetsLoaded, loadProgress, setLoadProgress } = useGlobalStore()
  const [hasEngaged, setHasEngaged] = useState(false)

  useEffect(() => {
    if (!assetsLoaded) {
      const interval = setInterval(() => {
        setLoadProgress(Math.min((useGlobalStore.getState().loadProgress || 0) + 0.05, 1))
      }, 100)
      return () => clearInterval(interval)
    }
  }, [assetsLoaded, setLoadProgress])

  return (
    <AnimatePresence>
      {!hasEngaged && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian backdrop-blur-xl"
        >
          {assetsLoaded ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => setHasEngaged(true)}
              className="group relative px-8 py-4 bg-transparent border border-white/20 text-white tracking-[0.2em] uppercase text-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              <span className="relative z-10 group-hover:text-obsidian transition-colors duration-500">
                Initialize Interface
              </span>
            </motion.button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="text-cyan font-mono tracking-widest text-xs uppercase animate-pulse">
                Compiling Assets... {Math.round(loadProgress * 100)}%
              </div>
              <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-cyan"
                  style={{ width: `${loadProgress * 100}%` }}
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
