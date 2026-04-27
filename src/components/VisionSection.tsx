'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useGlobalStore } from '@/store/useGlobalStore'
import { motion } from 'framer-motion'
import { withBasePath } from '@/lib/assetPath'

gsap.registerPlugin(ScrollTrigger)

const phases = [
  {
    eyebrow: "THE CORE MISSION",
    headline: "ARCHITECTING INTELLIGENT GROWTH ECOSYSTEMS.",
    description: "We enable global enterprises to scale with mathematical precision and long-term strategic impact, bridging the gap between complexity and efficiency."
  },
  {
    eyebrow: "THE GENESIS",
    headline: "UNIFYING INTELLIGENCE WITH OPERATIONAL POWER.",
    description: "VC Lab Tech was founded to transcend traditional agency models. We provide a technical infrastructure capable of sustaining industrial-scale growth."
  },
  {
    eyebrow: "THE EDGE",
    headline: "MARKET DOMINANCE IS OUR BASELINE.",
    description: "We do not merely offer services; we serve as the strategic backbone for organizations that reject the status quo in favor of absolute market influence."
  }
]

export const VisionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const setVisionMode = useGlobalStore((state) => state.setVisionMode)

  useGSAP(() => {
    // Skip horizontal scroll on mobile — use vertical layout instead
    if (window.innerWidth < 768) return

    const totalWidth = horizontalRef.current?.scrollWidth || 0
    const windowWidth = window.innerWidth

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${(totalWidth - windowWidth) * 1.2}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
        anticipatePin: 1.2,
        onEnter: () => {
          setVisionMode(true)
        },
        onLeaveBack: () => {
          setVisionMode(false)
        },
        onLeave: () => {
          setVisionMode(false)
        },
        onEnterBack: () => {
          setVisionMode(true)
        }
      }
    })

    tl.to(horizontalRef.current, {
      x: -(totalWidth - windowWidth),
      ease: "none",
      autoRound: true
    }, 0)

    // Cinematic reveals for each phase
    const phasesEl = gsap.utils.toArray('.vision-phase') as HTMLElement[]
    phasesEl.forEach((phase) => {
      gsap.fromTo(phase.querySelector('.reveal-text'), 
        { clipPath: 'inset(0 100% 0 0)' },
        { 
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: phase,
            containerAnimation: tl,
            start: "left center",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Return cleanup - useGSAP with scope handles cleanup automatically
    // Do NOT call ScrollTrigger.getAll().kill() here as it nukes other sections' triggers
  }, { scope: containerRef })

  return (
    <section className="relative min-h-screen bg-platinum pt-0 pb-16 sm:pb-24 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24 lg:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[var(--text-h1)] font-display font-bold text-navy tracking-tighter leading-[0.9] mb-12"
          >
            THE CORE <br /> <span className="text-cobalt italic">MISSION</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-slate-500 font-light leading-relaxed"
          >
            VC Lab Tech was founded to transcend traditional agency models. We provide a technical infrastructure capable of sustaining industrial-scale growth.
          </motion.p>
        </div>

        {/* Cinematic Asset Section */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] rounded-[1.5rem] sm:rounded-[2.2rem] lg:rounded-[3rem] overflow-hidden mb-16 sm:mb-24 lg:mb-32 group">
          <motion.div
            initial={{ opacity: 0, scale: 1.14 }}
            whileInView={{ opacity: 1, scale: 1.1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.2, 1, 0.3, 1] }}
            className="absolute inset-0 group-hover:scale-100 transition-transform duration-[2s] ease-out"
          >
            <Image
              src={withBasePath('/assets/vision-main.png')}
              alt="VC Lab Tech Vision"
              fill
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 1200px"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8 lg:p-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="text-center"
            >
              <h3 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold text-white tracking-tighter leading-none mb-5 sm:mb-8 max-w-4xl">
                UNIFYING INTELLIGENCE WITH <br /> OPERATIONAL POWER.
              </h3>
              <div className="flex justify-center gap-3 sm:gap-4">
                <div className="w-12 h-[1px] bg-cobalt mt-3" />
                <span className="text-[9px] sm:text-[10px] font-mono text-cobalt tracking-[0.25em] sm:tracking-[0.4em] uppercase">Phase 02 // Genesis</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Phase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 px-0 sm:px-4 lg:px-12">
          {phases.slice(0, 2).map((phase, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <span className="text-[9px] sm:text-[10px] font-mono text-cobalt tracking-[0.25em] sm:tracking-[0.5em] uppercase">0{i + 1} - {phase.eyebrow}</span>
              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-navy tracking-tighter">{phase.headline}</h4>
              <p className="text-slate-500 leading-relaxed max-w-md">{phase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cobalt/5 blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-silver/5 blur-[200px] pointer-events-none" />
    </section>
  )
}
