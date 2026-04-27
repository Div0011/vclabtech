'use client'

import dynamic from 'next/dynamic'
import { SmoothScroll } from '@/components/SmoothScroll'
import { ReactNode } from 'react'

const FluidBackground = dynamic(() => import('@/components/FluidBackground'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-1] overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.10),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]"
    />
  ),
})

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <FluidBackground />
      {children}
    </SmoothScroll>
  )
}
