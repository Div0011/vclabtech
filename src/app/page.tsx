'use client'

import dynamic from 'next/dynamic'
import { Navbar } from '@/components/Navbar'
import { LazyRevealSection } from '@/components/LazyRevealSection'
import { HighEndFooter } from '@/components/HighEndFooter'

// Dynamic imports for components
const CustomCursor = dynamic(() => import('@/components/CustomCursor').then(mod => mod.CustomCursor), { ssr: false, loading: () => null })
const HeroSection = dynamic(() => import('@/components/HeroSection').then(mod => mod.HeroSection), { ssr: false })
const StatsSection = dynamic(() => import('@/components/StatsSection').then(mod => mod.StatsSection), { ssr: false })
const SolutionsSection = dynamic(() => import('@/components/SolutionsSection').then(mod => mod.SolutionsSection), { ssr: false })
const BenefitSection = dynamic(() => import('@/components/BenefitSection').then(mod => mod.BenefitSection), { ssr: false })
const RevenueSection = dynamic(() => import('@/components/RevenueSection').then(mod => mod.RevenueSection), { ssr: false })
const VisionSection = dynamic(() => import('@/components/VisionSection').then(mod => mod.VisionSection), { ssr: false })
const PricingSection = dynamic(() => import('@/components/PricingSection').then(mod => mod.PricingSection), { ssr: false })
const PartnerSection = dynamic(() => import('@/components/PartnerSection').then(mod => mod.PartnerSection), { ssr: false })
const LeadCapture = dynamic(() => import('@/components/LeadCapture').then(mod => mod.LeadCapture), { ssr: false })

export default function Home() {
  return (
    <>
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
        <LazyRevealSection delay={0.15}>
          <RevenueSection />
        </LazyRevealSection>
      </section>

      <section id="vision">
        <LazyRevealSection delay={0.15}>
          <VisionSection />
        </LazyRevealSection>
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

