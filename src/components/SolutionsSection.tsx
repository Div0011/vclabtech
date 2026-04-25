'use client'

import { useRef, useState, useEffect } from 'react'
import { ServiceCard } from './ServiceCard'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionTilt } from './InteractiveWrappers'

const services = [
  {
    title: "WEBSITE STRATEGY & OPTIMIZATION",
    description: "Data-driven analysis and optimization to improve user experience, speed, engagement, and conversion performance.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18M7 16l3-4 4 4 4-8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "HIGH-PERFORMANCE WEBSITE DESIGN",
    description: "Conversion-focused, visually powerful, and scalable web experiences built to strengthen brand authority and drive growth.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "ADVANCED SEO & SEARCH GROWTH",
    description: "Strategic search engine optimization frameworks that increase organic traffic, rankings, and long-term digital authority.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "ADVERTISING & GOOGLE CAMPAIGNS",
    description: "Precision-targeted ad campaigns designed to maximize ROI, reach high-intent audiences, and accelerate lead generation.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "SOCIAL MEDIA GROWTH MARKETING",
    description: "Strategic content and campaign management to increase brand awareness, engagement, and community-driven growth.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "CONTENT STRATEGY & STORYTELLING",
    description: "High-impact content ecosystems — blogs, visuals, videos, and campaigns — engineered to attract, educate, and convert.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "VIDEO MARKETING & BRAND MEDIA",
    description: "High-conversion video strategies including promotional content, explainers, testimonials, and social-first visuals.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "INTEGRATED DIGITAL SOLUTIONS",
    description: "A holistic approach combining SEO, automation, branding, and analytics to drive sustainable growth.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
]

export const SolutionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let rafId: number | null = null

    const updateByScrollPosition = () => {
      const sectionRect = section.getBoundingClientRect()
      const scrollableDistance = sectionRect.height - window.innerHeight

      if (scrollableDistance <= 0) {
        setActiveServiceIndex(0)
        return
      }

      const rawProgress = -sectionRect.top / scrollableDistance
      const progress = Math.min(1, Math.max(0, rawProgress))
      const nextIndex = Math.min(
        services.length - 1,
        Math.max(0, Math.floor(progress * services.length))
      )

      setActiveServiceIndex((prev) => (prev === nextIndex ? prev : nextIndex))
    }

    const handleScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        updateByScrollPosition()
        rafId = null
      })
    }

    updateByScrollPosition()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-platinum px-4 sm:px-6 lg:px-12"
      style={{ height: `${services.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.04),transparent_36%),linear-gradient(180deg,#fbfbfa_0%,#f8fafc_55%,#f7f7f5_100%)]" />
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:84px_84px]" />

        <div className="relative container mx-auto h-full flex flex-col z-10">
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <span className="text-cobalt font-mono text-[9px] sm:text-xs mb-3 sm:mb-4 block tracking-[0.35em] sm:tracking-[0.4em] uppercase opacity-80">
              OUR PROTOCOLS
            </span>
            <SectionTilt direction="right">
              <h2 className="text-[clamp(2rem,8vw,4.5rem)] sm:text-[clamp(2.2rem,5vw,4.5rem)] font-display font-bold text-navy tracking-tighter leading-[0.95] max-w-4xl">
                CORE <span className="text-cobalt">SOLUTIONS</span>
              </h2>
            </SectionTilt>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[42%_58%] items-center gap-8 lg:gap-16 py-4 sm:py-8">
            <div className="flex items-center justify-center order-2 lg:order-1 min-h-[210px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`icon-${activeServiceIndex}`}
                  initial={{ opacity: 0, y: 28, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.992 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-40 h-40 sm:w-52 sm:h-52 flex items-center justify-center border border-navy/10 rounded-[2rem] bg-white/75 backdrop-blur-xl shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
                  aria-live="polite"
                  aria-label={`${services[activeServiceIndex].title} icon`}
                >
                  <span className="absolute inset-4 rounded-[1.35rem] border border-cobalt/10" />
                  <div className="text-cobalt relative z-10">
                    {services[activeServiceIndex].icon}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center order-1 lg:order-2 min-h-[210px]">
              <div className="w-full max-w-xl">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`card-${activeServiceIndex}`}
                    initial={{ opacity: 0, y: 26, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.992 }}
                    transition={{ duration: 0.92, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ServiceCard
                      index={activeServiceIndex}
                      title={services[activeServiceIndex].title}
                      description={services[activeServiceIndex].description}
                      isActive
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-auto pb-6 sm:pb-10 flex justify-center">
            <div className="flex items-center gap-2">
              {services.map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    width: activeServiceIndex === idx ? 24 : 8,
                    backgroundColor: activeServiceIndex === idx ? '#2563EB' : '#d1d5db'
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full transition-all"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
