'use client'

import React from 'react'
import { motion } from 'framer-motion'

const partners = [
  { name: "Partner 1", logo: "/partners/11062b_1db239e728f641c3a3be5b7ca708f239~mv2.png" },
  { name: "Partner 2", logo: "/partners/11062b_9e78da3320da497ab23ce28d738d388a~mv2.png" },
  { name: "Gemini AI", logo: "/partners/Gemini_Generated_Image_8xmp7c8xmp7c8xmp-removebg-preview.png" },
  { name: "Partner 4", logo: "/partners/images__1_-removebg-preview.png" },
  { name: "KC Overseas", logo: "/partners/kc-overseas-education-laxmipuram-guntur-overseas-education-consultants-for-australia-5xos4.png" },
  { name: "OpenTrain AI", logo: "/partners/opentrainai_logo-removebg-preview_edited.png" }
]

export const PartnerSection = () => {
  // Double the partners for a seamless loop
  const doubledPartners = [...partners, ...partners]

  return (
    <section className="py-48 bg-platinum border-t border-navy/5 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 mb-24">
        <h4 className="text-[11px] font-mono text-slate-500 tracking-[0.5em] uppercase">As featured in</h4>
      </div>
      
      <div className="relative flex overflow-hidden">
        <motion.div 
          animate={{ x: ["-50%", "0%"] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-32 items-center whitespace-nowrap px-12"
        >
          {doubledPartners.map((partner, index) => (
            <div
              key={index}
              className="foggy-element flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 min-w-[300px]"
            >
              <motion.img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                initial={{ opacity: 0.35 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9 }}
                className="max-h-32 w-auto object-contain brightness-110 contrast-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
