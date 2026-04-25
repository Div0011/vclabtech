'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

interface LazyRevealSectionProps {
  children: ReactNode
  className?: string
  minHeightClassName?: string
}

export const LazyRevealSection = ({
  children,
  className = '',
  minHeightClassName = 'min-h-[40vh]',
}: LazyRevealSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '240px 0px', threshold: 0.08 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${className} ${isVisible ? 'reveal-on-scroll is-visible' : `reveal-on-scroll ${minHeightClassName}`}`}
    >
      {isVisible ? children : null}
    </div>
  )
}
