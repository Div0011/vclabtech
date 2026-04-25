import React from 'react'

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Refined Triangular V-Shape */}
      <path 
        d="M20 10 L50 90 L80 10 L70 10 L50 65 L30 10 H20Z" 
        fill="currentColor" 
      />
      {/* Refined Blocky C Internal Element */}
      <path 
        d="M45 20 H75 V35 H60 V45 H75 V60 H45 V20Z" 
        fill="currentColor"
        clipPath="url(#v-cutout)"
      />
      <defs>
        <clipPath id="v-cutout">
          <path d="M0 0 H100 V100 H0 Z" />
        </clipPath>
      </defs>
    </svg>
  )
}
