'use client'

import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { label: "YEARS OF DIGITAL EXPERIENCE", value: "5+" },
  { label: "SUCCESSFUL CAMPAIGNS", value: "100+" },
  { label: "CONTENT PIECES CREATED", value: "1K+" },
  { label: "INDUSTRY AWARDS", value: "10+" },
  { label: "CLIENTS WORLDWIDE", value: "5+" }
]

export const StatsSection = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-platinum relative border-b border-navy/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border-l border-navy/5">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 lg:p-12 border-r border-navy/5 flex flex-col items-start justify-start relative group overflow-hidden"
            >
              <span className="text-[9px] sm:text-[10px] font-mono text-cobalt/40 mb-8 sm:mb-12 block">
                0{index + 1}
              </span>
              <div className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-navy mb-4 sm:mb-6 group-hover:text-cobalt transition-colors duration-500">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-[0.16em] sm:tracking-[0.2em] leading-relaxed">
                {stat.label}
              </div>
              
              {/* Subtle hover reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-cobalt/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
