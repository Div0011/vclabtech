'use client'

import React from 'react'

interface CursorRevealProps {
  children: React.ReactNode
  variant: 'black' | 'blue' | 'white'
  className?: string
  as?: React.ElementType<{ className?: string; children?: React.ReactNode }>
}

export const CursorReveal = ({ 
  children, 
  variant, 
  className = '',
  as: Component = 'span'
}: CursorRevealProps) => {
  return (
    <Component className={`cursor-reveal cursor-reveal-${variant} ${className}`}>
      {children}
    </Component>
  )
}
