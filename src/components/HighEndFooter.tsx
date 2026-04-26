'use client'

import { useRef, useEffect } from 'react'
import { ArrowUpRight, GitBranch, Globe, Mail, Sparkles } from 'lucide-react'
import gsap from 'gsap'

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'Growth', href: '#growth' },
  { name: 'Vision', href: '#vision' },
  { name: 'Partners', href: '#partners' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Globe },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Mail },
  { name: 'GitHub', href: 'https://github.com', icon: GitBranch },
]

const serviceLinks = [
  { name: 'Brand Systems', href: '#solutions' },
  { name: 'Growth Engineering', href: '#growth' },
  { name: 'Interactive UX', href: '#vision' },
  { name: 'Conversion Design', href: '#pricing' },
]

export const HighEndFooter = () => {
  const footerRef = useRef<HTMLElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line, i) => {
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 1.2,
              delay: i * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 90%',
              },
            }
          )
        }
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      id="contact"
      data-no-cursor-reveal
      className="relative z-10 overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#1E3A5F] to-[#F8FAFC]"
    >
      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,rgba(15,23,42,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.2)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Soft radial glow accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] pointer-events-none bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] pointer-events-none bg-[radial-gradient(circle,rgba(147,197,253,0.15),transparent_70%)]" />

      <div className="container relative mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top section - Large brand statement */}
        <div className="pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-16">
          <div className="max-w-5xl">
            <p className="mb-4 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.5em] text-[#3B82F6]/70">
              Engineering digital dominance
            </p>
            <h2 className="text-[clamp(3rem,10vw,7rem)] font-display font-bold tracking-tighter leading-[0.95]">
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent">
                V C LAB TECH
              </span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white/40 max-w-xl leading-relaxed">
              Premium interfaces, cinematic motion systems, and speed-first architecture for brands that demand standout presence.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          ref={(el) => { lineRefs.current[0] = el }}
          className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"
        />

        {/* Middle section - Links grid */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Navigation */}
            <div>
              <p className="mb-6 text-[10px] font-mono uppercase tracking-[0.35em] text-white/30">
                Navigation
              </p>
              <div className="space-y-3">
                {footerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/70 transition-all duration-300 hover:text-[#93C5FD] hover:drop-shadow-[0_0_10px_rgba(147,197,253,0.55)]"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#93C5FD] shadow-[0_0_8px_rgba(147,197,253,0.7)] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <p className="mb-6 text-[10px] font-mono uppercase tracking-[0.35em] text-white/30">
                Capabilities
              </p>
              <div className="space-y-3">
                {serviceLinks.map((service) => (
                  <a
                    key={service.name}
                    href={service.href}
                    className="group flex items-center gap-2 text-sm text-white/70 transition-all duration-300 hover:text-[#93C5FD] hover:drop-shadow-[0_0_10px_rgba(147,197,253,0.55)]"
                  >
                    <span className="relative">
                      {service.name}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#93C5FD] shadow-[0_0_8px_rgba(147,197,253,0.7)] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="mb-6 text-[10px] font-mono uppercase tracking-[0.35em] text-white/30">
                Contact
              </p>
              <a
                href="mailto:info@vclabtech.com"
                className="block text-lg sm:text-xl font-display font-semibold text-white/90 transition-all duration-300 hover:text-[#93C5FD] hover:drop-shadow-[0_0_14px_rgba(147,197,253,0.6)] mb-8"
              >
                info@vclabtech.com
              </a>

              <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.35em] text-white/30">
                Social
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.15em] text-white/70 transition-all duration-300 hover:border-[#93C5FD]/60 hover:bg-[#60A5FA]/10 hover:text-[#93C5FD] hover:shadow-[0_0_16px_rgba(96,165,250,0.35)]"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {social.name}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          ref={(el) => { lineRefs.current[1] = el }}
          className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"
        />

        {/* Bottom bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-[#3B82F6]/60" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
              VC LAB TECH
            </span>
          </div>
          
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Virtual Connect Lab Tech. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 transition-colors hover:text-white/50">
              Privacy
            </a>
            <a href="#" className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 transition-colors hover:text-white/50">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

