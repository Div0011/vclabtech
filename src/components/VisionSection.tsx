'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useGlobalStore } from '@/store/useGlobalStore'
import { useAudio } from '@/context/AudioContext'
import { motion } from 'framer-motion'

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
  const { playMilestone } = useAudio()
  const setVisionMode = useGlobalStore((state) => state.setVisionMode)

  useGSAP(() => {
    const totalWidth = horizontalRef.current?.scrollWidth || 0
    const windowWidth = window.innerWidth

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalWidth - windowWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          playMilestone()
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
    })

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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, { scope: containerRef })

  return (
    <section className="relative min-h-screen bg-platinum py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-32">
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
            className="text-2xl text-slate-500 font-light leading-relaxed"
          >
            VC Lab Tech was founded to transcend traditional agency models. We provide a technical infrastructure capable of sustaining industrial-scale growth.
          </motion.p>
        </div>

        {/* Cinematic Asset Section */}
        <div className="relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden mb-32 group">
          <motion.img
            src="/assets/vision-main.png"
            alt="VC Lab Tech Vision"
            loading="lazy"
            initial={{ opacity: 0, scale: 1.14 }}
            whileInView={{ opacity: 1, scale: 1.1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.2, 1, 0.3, 1] }}
            className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-[2s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter leading-none mb-8 max-w-4xl">
                UNIFYING INTELLIGENCE WITH <br /> OPERATIONAL POWER.
              </h3>
              <div className="flex justify-center gap-4">
                <div className="w-12 h-[1px] bg-cobalt mt-3" />
                <span className="text-[10px] font-mono text-cobalt tracking-[0.4em] uppercase">Phase 02 // Genesis</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Phase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 px-12">
          {phases.slice(0, 2).map((phase, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <span className="text-[10px] font-mono text-cobalt tracking-[0.5em] uppercase">0{i + 1} - {phase.eyebrow}</span>
              <h4 className="text-4xl font-display font-bold text-navy tracking-tighter">{phase.headline}</h4>
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
