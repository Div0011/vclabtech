'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const protocols = [
  {
    name: "01 // BASIC",
    price: "499",
    features: ["Strategic Audit", "SEO Implementation", "Performance Baseline", "Monthly Reporting"],
    featured: false
  },
  {
    name: "02 // ADVANCE",
    price: "999",
    features: ["Full Architectural Rebuild", "Aggressive SEO Scaling", "Custom WebGL Integration", "24/7 Authority Monitoring"],
    featured: true
  },
  {
    name: "03 // CUSTOM",
    price: "VARIES",
    features: ["Global Infrastructure", "Data Dominance Suite", "Dedicated Engineering Team", "Zero-Latency Maintenance"],
    featured: false
  }
]

export const PricingSection = () => {
  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-32 bg-platinum border-t border-navy/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-18 lg:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[var(--text-h1)] font-display font-bold text-navy tracking-tighter leading-[0.9] mb-12"
          >
            SCALABLE <br /> <span className="text-cobalt italic">INFRASTRUCTURE</span>
          </motion.h2>
          <p className="text-[10px] font-mono text-cobalt tracking-[0.5em] uppercase">Architecture Tiers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {protocols.map((protocol, i) => (
            <motion.div
              key={i}
              whileHover={{ 
                rotateZ: i % 2 === 0 ? 2 : -2, 
                rotateY: i % 2 === 0 ? 5 : -5,
                scale: 1.02 
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group p-6 sm:p-8 lg:p-12 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] bg-white/20 backdrop-blur-[8px] border border-navy/10 hover:border-cobalt/30 transition-all duration-500 relative overflow-hidden foggy-element"
            >
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cobalt/5 blur-[80px] group-hover:bg-cobalt/10 transition-all" />
              
              <div className="relative z-10">
                <span className="text-[10px] font-mono text-cobalt tracking-[0.4em] uppercase mb-8 block opacity-60">{`0${i + 1} // Protocol`}</span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy tracking-tighter mb-4">{protocol.name}</h3>
                <div className="text-4xl sm:text-5xl font-display font-bold text-navy mb-8 sm:mb-12 tracking-tighter italic">
                  ${protocol.price}<span className="text-sm font-sans font-normal text-slate-500"> /MO</span>
                </div>
                
                <ul className="space-y-4 sm:space-y-6 mb-10 sm:mb-16">
                  {protocol.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-4 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-5 rounded-full border border-navy/20 text-navy font-display font-bold text-xs tracking-widest uppercase hover:bg-navy hover:text-white transition-all duration-500 flex items-center justify-center gap-2 group/btn">
                  Select Plan
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:-rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
