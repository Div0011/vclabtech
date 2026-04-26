import React from 'react'
import Image from 'next/image'
import { withBasePath } from '@/lib/assetPath'

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <Image
      src={withBasePath('/logo.png')}
      alt="VC Lab Tech" 
      width={128}
      height={128}
      className={`object-contain ${className}`}
      style={{ 
        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
      }}
      draggable={false}
      priority
    />
  )
}
