'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'

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
    image: "/assets/revenue-1.png"
  },
  {
    phase: "02",
    title: "DEPLOY ADVANCED SEO",
    description: "Advanced SEO frameworks position your brand in front of customers actively searching for your solutions.",
    image: "/assets/revenue-2.png"
  },
  {
    phase: "03",
    title: "ACCELERATE RESULTS",
    description: "Precision-targeted campaigns across Google and social platforms generate immediate visibility and scalable revenue growth.",
    image: "/assets/revenue-3.png"
  }
]

export const RevenueSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = Math.min(steps.length - 1, Math.floor(latest * steps.length))
    setActiveStep((prev) => (prev === step ? prev : step))
  })

  return (
    <section ref={sectionRef} className="relative bg-platinum border-t border-navy/5 h-[260vh] sm:h-[300vh] lg:h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
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
                  <div className="bg-white/74 backdrop-blur-xl border border-white/60 rounded-3xl px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 text-center shadow-[0_25px_90px_rgba(15,23,42,0.14)]">
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
