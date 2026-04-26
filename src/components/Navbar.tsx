'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { MagneticButton } from './MagneticButton'
import { Logo } from './Logo'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ids = ['home', 'stats', 'solutions', 'benefits', 'growth', 'vision', 'pricing', 'partners', 'lead']
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.45 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home', number: '01' },
    { name: 'Services', href: '#solutions', number: '02' },
    { name: 'Pricing', href: '#pricing', number: '03' },
    { name: 'Vision', href: '#vision', number: '04' },
  ]

  const ctaLink = { name: 'Get Started', href: '#lead', number: '05' }

  const scrollToSection = (hash: string) => {
    const sectionId = hash.replace('#', '')
    const target = document.getElementById(sectionId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <header className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${scrolled ? 'top-4' : 'top-6'}`}>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(15,23,42,0.1)] border border-white/40' : 'bg-white/40 backdrop-blur-md border border-white/30'}`}>
          <Logo className="w-6 h-6 sm:w-7 sm:h-7" />
          <MagneticButton onClick={() => setIsOpen(!isOpen)} className="w-9 h-9 sm:w-10 sm:h-10 flex flex-col justify-center items-center gap-[3px] rounded-full bg-navy/5 border border-navy/10 hover:bg-navy/10 transition-colors">
            <span className={`w-4 h-[1.5px] bg-navy transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`w-4 h-[1.5px] bg-navy transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-2' : ''}`} />
            <span className={`w-4 h-[1.5px] bg-navy transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </MagneticButton>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-50 overflow-hidden bg-[#050a14]" ref={menuContainerRef} onMouseMove={handleMouseMove}>
            <motion.div className="absolute pointer-events-none" animate={{ x: mousePos.x - 400, y: mousePos.y - 400 }} transition={{ type: 'spring', damping: 30, stiffness: 100 }}>
              <div className="w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_70%)]" />
            </motion.div>

            <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, delay: 0.1 }} className="absolute top-0 w-full py-6 sm:py-8 px-6 sm:px-10 lg:px-16 flex justify-between items-center z-50">
              <div className="flex items-center gap-3">
                <Logo className="w-7 h-7 sm:w-8 sm:h-8" />
                <div className="text-sm sm:text-base font-mono font-bold tracking-widest text-white/60">
                  VC LAB <span className="text-cobalt">TECH</span>
                </div>
              </div>
              <MagneticButton onClick={() => setIsOpen(false)} className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300">
                <span className="text-white/60 text-xs font-mono tracking-wider">CLOSE</span>
              </MagneticButton>
            </motion.div>

            <div className="relative z-10 flex min-h-full items-center px-6 sm:px-10 lg:px-16 pt-24 pb-20">
              <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5 hidden lg:block">
                  <div className="space-y-6">
                    <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-cobalt/70">Navigation Menu</p>
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold tracking-tight leading-[0.95]">
                      <span className="text-white/90">Explore</span><br />
                      <span className="bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent">Our World</span>
                    </h2>
                    <p className="text-white/30 text-sm max-w-sm leading-relaxed">Navigate through our digital ecosystem. Each section is crafted with precision and purpose.</p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="h-px w-16 bg-gradient-to-r from-cobalt to-transparent" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">{String(navLinks.length + 1).padStart(2, '0')} Sections</span>
                    </div>
                  </div>
                </motion.div>

                <nav className="lg:col-span-7">
                  <div className="space-y-1">
                    {navLinks.map((link, i) => {
                      const linkId = link.href.replace('#', '')
                      const isActive = activeSection === linkId
                      return (
                        <motion.div key={link.name} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}>
                          <a href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); setIsOpen(false) }} className="group flex items-center justify-between py-4 sm:py-5 border-b border-white/[0.06] transition-all duration-300 hover:pl-4">
                            <div className="flex items-center gap-4 sm:gap-6">
                              <span className="text-[10px] sm:text-xs font-mono text-white/20 group-hover:text-cobalt/60 transition-colors duration-300">{link.number}</span>
                              <span className={`text-2xl sm:text-3xl lg:text-4xl font-display font-semibold tracking-tight transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent' : 'text-white/70 group-hover:text-white'}`}>{link.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              {isActive && <motion.span layoutId="activeIndicator" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-cobalt/15 border border-cobalt/30 px-3 py-1 text-[10px] font-mono text-cobalt">Current</motion.span>}
                              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/20 group-hover:text-cobalt group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                            </div>
                          </a>
                        </motion.div>
                      )
                    })}
                    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.4, delay: 0.1 + navLinks.length * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }} className="pt-6">
                      <a href={ctaLink.href} onClick={(e) => { e.preventDefault(); scrollToSection(ctaLink.href); setIsOpen(false) }} className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:scale-105">
                        <span>{ctaLink.name}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    </motion.div>
                  </div>
                </nav>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.5, delay: 0.4 }} className="absolute bottom-0 left-0 right-0 z-10 px-6 sm:px-10 lg:px-16 py-6">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <a href="mailto:info@vclabtech.com" className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/30 hover:text-cobalt transition-colors duration-300">info@vclabtech.com</a>
                </div>
                <div className="flex items-center gap-6">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/25 hover:text-white/60 transition-colors duration-300">IG</a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/25 hover:text-white/60 transition-colors duration-300">LI</a>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/25 hover:text-white/60 transition-colors duration-300">GH</a>
                </div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">&copy; {new Date().getFullYear()} VC LAB TECH</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
