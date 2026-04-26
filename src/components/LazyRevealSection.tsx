'use client'

import { ReactNode, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface LazyRevealSectionProps {
  children: ReactNode
  className?: string
  minHeightClassName?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  threshold?: number
}

export const LazyRevealSection = ({
  children,
  className = '',
  minHeightClassName = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 40,
  once = true,
  threshold = 0.15,
}: LazyRevealSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 }
      case 'down': return { y: -distance, x: 0 }
      case 'left': return { x: distance, y: 0 }
      case 'right': return { x: -distance, y: 0 }
      default: return { y: distance, x: 0 }
    }
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={`${className} ${minHeightClassName}`}
    >
      {children}
    </motion.div>
  )
}

