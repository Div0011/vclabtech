'use client'

import dynamic from 'next/dynamic'
import { Navbar } from '@/components/Navbar'
import { LazyRevealSection } from '@/components/LazyRevealSection'
import { HighEndFooter } from '@/components/HighEndFooter'
import { ScrollRestoration } from '@/components/ScrollRestoration'

const sectionFallback = (className: string) => {
  function SectionFallback() {
    return <div aria-hidden="true" className={className} />
  }

  return SectionFallback
}

// Dynamic imports for components
const CustomCursor = dynamic(() => import('@/components/CustomCursor').then(mod => mod.CustomCursor), { ssr: false, loading: () => null })
const HeroSection = dynamic(() => import('@/components/HeroSection').then(mod => mod.HeroSection), { ssr: false, loading: sectionFallback('min-h-[100dvh] w-full') })
const StatsSection = dynamic(() => import('@/components/StatsSection').then(mod => mod.StatsSection), { ssr: false, loading: sectionFallback('min-h-[26rem] w-full bg-platinum') })
const SolutionsSection = dynamic(() => import('@/components/SolutionsSection').then(mod => mod.SolutionsSection), { ssr: false, loading: sectionFallback('min-h-[44rem] w-full bg-white') })
const BenefitSection = dynamic(() => import('@/components/BenefitSection').then(mod => mod.BenefitSection), { ssr: false, loading: sectionFallback('min-h-[44rem] w-full bg-platinum') })
const RevenueSection = dynamic(() => import('@/components/RevenueSection').then(mod => mod.RevenueSection), { ssr: false, loading: sectionFallback('min-h-[44rem] w-full bg-slate-950') })
const VisionSection = dynamic(() => import('@/components/VisionSection').then(mod => mod.VisionSection), { ssr: false, loading: sectionFallback('min-h-[44rem] w-full bg-white') })
const PricingSection = dynamic(() => import('@/components/PricingSection').then(mod => mod.PricingSection), { ssr: false, loading: sectionFallback('min-h-[42rem] w-full bg-platinum') })
const PartnerSection = dynamic(() => import('@/components/PartnerSection').then(mod => mod.PartnerSection), { ssr: false, loading: sectionFallback('min-h-[24rem] w-full bg-white') })
const LeadCapture = dynamic(() => import('@/components/LeadCapture').then(mod => mod.LeadCapture), { ssr: false, loading: sectionFallback('min-h-[32rem] w-full') })

export default function Home() {
  return (
    <>
      <ScrollRestoration />
      <CustomCursor />
      <Navbar />

      <section id="home">
        <HeroSection />
      </section>

      <section id="stats">
        <LazyRevealSection delay={0.1}>
          <StatsSection />
        </LazyRevealSection>
      </section>

      <section id="solutions">
        <SolutionsSection />
      </section>

      <section id="benefits">
        <LazyRevealSection delay={0.15}>
          <BenefitSection />
        </LazyRevealSection>
      </section>

      <section id="growth">
        <RevenueSection />
      </section>

      <section id="vision">
        <VisionSection />
      </section>

      <section id="pricing">
        <LazyRevealSection delay={0.1}>
          <PricingSection />
        </LazyRevealSection>
      </section>

      <section id="partners">
        <LazyRevealSection delay={0.1}>
          <PartnerSection />
        </LazyRevealSection>
      </section>

      <section id="lead">
        <LazyRevealSection minHeightClassName="min-h-[25vh]" delay={0.1}>
          <LeadCapture />
        </LazyRevealSection>
      </section>

      <HighEndFooter />
    </>
  )
}
