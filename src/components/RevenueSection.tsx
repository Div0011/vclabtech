'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { withBasePath } from '@/lib/assetPath'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const CinematicTitle = ({ text, step }: { text: string; step: number }) => {
  const chars = text.split('')

  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.03em]">
      {chars.map((char, idx) => (
        <motion.span
          key={`${step}-${char}-${idx}`}
          initial={{ rotateX: -95, opacity: 0, y: 10 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: idx * 0.03,
            ease: [0.2, 0.92, 0.3, 1],
          }}
          style={{ transformOrigin: '50% 55%', transformStyle: 'preserve-3d' }}
          className={char === ' ' ? 'w-[0.35em]' : 'inline-block'}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

const steps = [
  {
    phase: "01",
    title: "STRENGTHEN FOUNDATION",
    description: "We begin by optimizing your website infrastructure for speed, user experience, and conversion performance.",
    image: withBasePath('/assets/revenue-1.png')
  },
  {
    phase: "02",
    title: "DEPLOY ADVANCED SEO",
    description: "Advanced SEO frameworks position your brand in front of customers actively searching for your solutions.",
    image: withBasePath('/assets/revenue-2.png')
  },
  {
    phase: "03",
    title: "ACCELERATE RESULTS",
    description: "Precision-targeted campaigns across Google and social platforms generate immediate visibility and scalable revenue growth.",
    image: withBasePath('/assets/revenue-3.png')
  }
]

/* ─── Desktop: wheel-intercept, one scroll = one step ─── */
const DesktopRevenue = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const indexRef = useRef(0)
  const cooldownRef = useRef(false)
  const isActiveRef = useRef(false)

  const pinVh = steps.length * 100

  useGSAP(() => {
    if (!sectionRef.current || window.innerWidth < 768) return

    const st = ScrollTrigger.create({
      id: 'revenue-pin',
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${pinVh}vh`,
      pin: true,
      anticipatePin: 1,
      onEnter: () => { isActiveRef.current = true },
      onLeave: () => { isActiveRef.current = false },
      onEnterBack: () => { isActiveRef.current = true },
      onLeaveBack: () => { isActiveRef.current = false },
    })

    return () => { st.kill() }
  }, { scope: sectionRef })

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return
    const COOLDOWN = 700

    const handleWheel = (e: WheelEvent) => {
      if (!isActiveRef.current) return

      const dir = e.deltaY > 0 ? 1 : -1
      const next = indexRef.current + dir

      if (next < 0 || next >= steps.length) return

      e.preventDefault()
      if (cooldownRef.current) return
      cooldownRef.current = true

      indexRef.current = next
      setActiveStep(next)

      const st = ScrollTrigger.getById('revenue-pin')
      if (st) {
        const stepPx = (st.end - st.start) / steps.length
        window.scrollTo({ top: st.start + next * stepPx, behavior: 'instant' as ScrollBehavior })
      }

      setTimeout(() => { cooldownRef.current = false }, COOLDOWN)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-platinum border-t border-navy/5 hidden md:block"
    >
      <div className="h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[#f2f6fc]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/20 to-white/70 z-10 pointer-events-none" />

        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={`image-${activeStep}`}
              initial={{ opacity: 0, x: -70, scale: 1.01 }}
              animate={{ opacity: 1, x: 0, scale: 1.06 }}
              exit={{ opacity: 0, x: 150, scale: 1.02 }}
              transition={{ duration: 1.25, ease: [0.18, 0.98, 0.32, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                fill
                className="object-cover"
                priority={activeStep === 0}
                sizes="100vw"
                decoding="async"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-20 h-full container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 flex flex-col">
          <div>
            <h4 className="text-[9px] sm:text-[10px] font-mono text-cobalt tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-4 sm:mb-5">Frameworks & Insights</h4>
            <h2 className="text-[clamp(1.8rem,8vw,4.6rem)] sm:text-[clamp(2rem,5.2vw,4.6rem)] font-display font-bold text-navy tracking-tighter leading-[0.94] sm:leading-[0.92] max-w-4xl">
              ENGINEERING REVENUE <span className="text-cobalt italic">GROWTH</span>
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-3xl min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]" style={{ perspective: '1800px' }}>
              <AnimatePresence mode="sync">
                <motion.div
                  key={`text-${activeStep}`}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -26 }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="bg-white/74 backdrop-blur-xl border border-white/60 rounded-2xl sm:rounded-3xl px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12 text-center shadow-[0_25px_90px_rgba(15,23,42,0.14)]">
                    <p className="text-[10px] sm:text-[11px] font-mono text-cobalt tracking-[0.3em] sm:tracking-[0.35em] uppercase mb-4 sm:mb-6">Phase {steps[activeStep].phase}</p>
                    <h3
                      className={`text-[clamp(1.5rem,8vw,3rem)] sm:text-[clamp(1.8rem,4vw,3rem)] tracking-tight mb-4 sm:mb-5 ${activeStep % 2 === 0 ? 'font-display font-bold' : 'font-sans font-extrabold uppercase'}`}
                    >
                      <CinematicTitle text={steps[activeStep].title} step={activeStep} />
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-navy/75 leading-relaxed max-w-2xl mx-auto">{steps[activeStep].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Mobile: simple stacked cards ─── */
const MobileRevenue = () => {
  return (
    <section className="relative bg-platinum border-t border-navy/5 md:hidden py-10 sm:py-14">
      <div className="absolute inset-0 bg-[#f2f6fc]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/20 to-white/70 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 z-10">
        <div className="mb-10 sm:mb-14">
          <h4 className="text-[9px] sm:text-[10px] font-mono text-cobalt tracking-[0.4em] uppercase mb-4">Frameworks & Insights</h4>
          <h2 className="text-[clamp(1.8rem,8vw,3rem)] font-display font-bold text-navy tracking-tighter leading-[0.94] max-w-4xl">
            ENGINEERING REVENUE <span className="text-cobalt italic">GROWTH</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="bg-white/74 backdrop-blur-xl border border-white/60 rounded-2xl px-5 py-6 shadow-[0_15px_50px_rgba(15,23,42,0.1)]">
                <p className="text-[10px] font-mono text-cobalt tracking-[0.3em] uppercase mb-3">Phase {step.phase}</p>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-navy tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-navy/75 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const RevenueSection = () => {
  return (
    <>
      <DesktopRevenue />
      <MobileRevenue />
    </>
  )
}

