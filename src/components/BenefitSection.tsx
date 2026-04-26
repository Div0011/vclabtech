'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { withBasePath } from '@/lib/assetPath'

export const BenefitSection = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-platinum border-t border-navy/5 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-20 lg:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[var(--text-h1)] font-display font-bold text-navy tracking-tighter leading-[0.9] mb-12"
          >
            TO DOMINATE THE MARKET, WE NEED TO <span className="text-cobalt italic">ARCHITECT</span> DIFFERENTLY.
          </motion.h2>
          <p className="text-[9px] sm:text-[10px] font-mono text-cobalt tracking-[0.35em] sm:tracking-[0.5em] uppercase">The Architectural Advantage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 lg:gap-12">
          {[
            { img: withBasePath('/assets/benefit-1.png'), text: "PRECISION" },
            { img: withBasePath('/assets/benefit-2.png'), text: "THROUGH" },
            { img: withBasePath('/assets/benefit-3.png'), text: "ARCHITECTURE" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="relative aspect-square rounded-full overflow-hidden group border border-navy/10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.08 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, ease: [0.2, 1, 0.3, 1] }}
                className="absolute inset-0 transition-transform duration-[3s] group-hover:scale-125"
              >
                <Image
                  src={item.img}
                  alt={item.text}
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                <div className="w-[80%] h-[80%] border border-white/20 rounded-full flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tighter uppercase text-center">{item.text}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
