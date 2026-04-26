'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { withBasePath } from '@/lib/assetPath'

const partners = [
  { name: "Partner 1", logo: withBasePath('/partners/11062b_1db239e728f641c3a3be5b7ca708f239~mv2.png') },
  { name: "Partner 2", logo: withBasePath('/partners/11062b_9e78da3320da497ab23ce28d738d388a~mv2.png') },
  { name: "Gemini AI", logo: withBasePath('/partners/Gemini_Generated_Image_8xmp7c8xmp7c8xmp-removebg-preview.png') },
  { name: "Partner 4", logo: withBasePath('/partners/images__1_-removebg-preview.png') },
  { name: "KC Overseas", logo: withBasePath('/partners/kc-overseas-education-laxmipuram-guntur-overseas-education-consultants-for-australia-5xos4.png') },
  { name: "OpenTrain AI", logo: withBasePath('/partners/opentrainai_logo-removebg-preview_edited.png') }
]

export const PartnerSection = () => {
  // Double the partners for a seamless loop
  const doubledPartners = [...partners, ...partners]

  return (
    <section className="py-20 sm:py-28 lg:py-40 bg-platinum border-t border-navy/5 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-10 sm:mb-16 lg:mb-24">
        <h4 className="text-[10px] sm:text-[11px] font-mono text-slate-500 tracking-[0.3em] sm:tracking-[0.5em] uppercase">As featured in</h4>
      </div>
      
      <div className="relative flex overflow-hidden">
        <motion.div 
          animate={{ x: ["-50%", "0%"] }}
          transition={{ 
            duration: 34,
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-12 sm:gap-20 lg:gap-32 items-center whitespace-nowrap px-6 sm:px-10 lg:px-12"
        >
          {doubledPartners.map((partner, index) => (
            <div
              key={index}
              className="foggy-element flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 min-w-[180px] sm:min-w-[220px] lg:min-w-[300px]"
            >
              <motion.div
                initial={{ opacity: 0.35 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9 }}
                className="relative h-16 sm:h-24 lg:h-32 w-[180px] sm:w-[220px] lg:w-[300px]"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 300px"
                  className="object-contain brightness-110 contrast-110"
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
