'use client'

import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

interface SectionTiltProps {
  children: ReactNode
  className?: string
  direction?: 'left' | 'right'
}

export const SectionTilt = ({ children, className = "", direction = 'right' }: SectionTiltProps) => {
  const xShift = direction === 'right' ? 4 : -4

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        x: xShift,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
      className={`transition-all duration-700 ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface RevealTextProps {
  text: string
  className?: string
}

export const RevealText = ({ text, className = "" }: RevealTextProps) => {
  return (
    <div className={`reveal-wrapper group ${className}`}>
      <span className="reveal-base">{text}</span>
      <span className="reveal-overlay">{text}</span>
    </div>
  )
}
