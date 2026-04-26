import React from 'react'

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <img 
      src="/logo.png" 
      alt="VC Lab Tech" 
      className={`object-contain ${className}`}
      style={{ 
        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
      }}
      draggable={false}
    />
  )
}
