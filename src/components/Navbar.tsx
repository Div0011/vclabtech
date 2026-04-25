'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { MagneticButton } from './MagneticButton'
import { Logo } from './Logo'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)

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
    { name: 'HOME', href: '#home' },
    { name: 'STATS', href: '#stats' },
    { name: 'SOLUTIONS', href: '#solutions' },
    { name: 'BENEFITS', href: '#benefits' },
    { name: 'GROWTH', href: '#growth' },
    { name: 'VISION', href: '#vision' },
    { name: 'PRICING', href: '#pricing' },
    { name: 'PARTNERS', href: '#partners' },
    { name: 'CONTACT', href: '#lead' },
  ]

  const scrollToSection = (hash: string) => {
    const sectionId = hash.replace('#', '')
    const target = document.getElementById(sectionId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  const CyberNavLink = ({
    name,
    href,
    onClick,
  }: {
    name: string
    href: string
    onClick: () => void
  }) => {
    const linkId = href.replace('#', '')
    const isHovered = hoveredCell === linkId
    const isActive = activeSection === linkId
    
    return (
      <motion.div 
        className={`relative group rounded-2xl border px-4 py-5 sm:px-5 sm:py-6 lg:px-6 lg:py-7 overflow-hidden transition-all duration-400 ${
          isHovered
            ? 'border-cobalt/60 bg-cobalt/16 shadow-[0_0_45px_rgba(37,99,235,0.35)]'
            : 'border-white/12 bg-white/5'
        }`}
        onMouseEnter={() => {
          setHoveredCell(linkId)
        }}
        onMouseLeave={() => {
          setHoveredCell(null)
        }}
      >
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-y-2 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-cobalt/80 shadow-[0_0_18px_rgba(37,99,235,0.6)]"
          aria-hidden="true"
        />
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-x-2 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-cobalt/80 shadow-[0_0_18px_rgba(37,99,235,0.6)]"
          aria-hidden="true"
        />

        <a
          href={href} 
          onClick={(event) => {
            event.preventDefault()
            scrollToSection(href)
            onClick()
          }}
          className={`relative block ${
            isHovered || isActive ? 'text-cobalt' : 'text-white/88'
          } transition-colors duration-300`}
          data-cursor-label="Open Section"
        >
          <span className={`inline-flex text-lg sm:text-xl lg:text-2xl font-bold tracking-tight transition-all duration-300 ${
            isHovered ? 'drop-shadow-[0_0_18px_rgba(37,99,235,0.6)]' : ''
          }`}>
            {name}
          </span>
        </a>
      </motion.div>
    )
  }

  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'py-4 glass' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">
          <Logo className="w-7 h-7 sm:w-8 sm:h-8 text-navy" />
          
          <div className="flex items-center gap-3 sm:gap-8">
            <MagneticButton 
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 sm:w-12 sm:h-12 flex flex-col justify-center items-center gap-1.5 rounded-full bg-navy/5 border border-navy/10 hover:bg-navy/10 transition-colors"
            >
              <span className={`w-5 h-[1px] bg-navy transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-[1px] bg-navy transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-5 h-[1px] bg-navy transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </MagneticButton>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[#060a14]/95 backdrop-blur-3xl"
            ref={menuContainerRef}
          >
            <div className="absolute top-0 w-full py-5 sm:py-8 px-4 sm:px-6 lg:px-12 flex justify-between items-center z-50">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Logo className="w-7 h-7 sm:w-8 sm:h-8 text-cobalt group-hover:scale-110 transition-transform duration-500" />
                <div className="text-base sm:text-xl font-display font-bold tracking-tighter text-white">
                  VC LAB <span className="text-cobalt">TECH / MENU</span>
                </div>
              </motion.div>
              
              <MagneticButton 
                onClick={() => setIsOpen(false)}
                className="w-11 h-11 sm:w-12 sm:h-12 flex flex-col justify-center items-center gap-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <span className="w-5 h-[1px] bg-white rotate-45 translate-y-[1px]" />
                <span className="w-5 h-[1px] bg-white -rotate-45 -translate-y-[1px]" />
              </MagneticButton>
            </div>

            <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[linear-gradient(to_right,rgba(148,163,184,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.2)_1px,transparent_1px)] bg-[size:52px_52px]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_20%,rgba(37,99,235,0.25),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(29,78,216,0.2),transparent_35%)]" />
            
            <div className="relative z-10 flex min-h-full w-full items-center justify-center px-4 sm:px-10 lg:px-12 pt-24 pb-16 sm:pt-16">
              <nav className="w-full max-w-6xl">
                <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[9px] sm:text-[10px] font-mono text-cobalt tracking-[0.25em] sm:tracking-[0.45em] uppercase opacity-80">
                    Cyber Navigation Matrix 3x3
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cobalt/30 bg-cobalt/10 px-3 sm:px-4 py-2 text-[9px] sm:text-[10px] font-mono tracking-[0.18em] sm:tracking-[0.3em] uppercase text-cobalt">
                    <Sparkles className="h-3.5 w-3.5" />
                    Hover to Illuminate
                  </span>
                </div>

                <div className="border-y border-white/15 py-5 sm:py-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                    {navLinks.map((link) => (
                      <CyberNavLink 
                        key={link.name} 
                        name={link.name} 
                        href={link.href} 
                        onClick={() => setIsOpen(false)} 
                      />
                    ))}
                  </div>
                </div>
              </nav>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-10 px-4 sm:px-10 lg:px-12">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.32em] text-white/55">
                <span>VC LAB TECH // PIXELATED MENU</span>
                <span className="hidden md:inline-flex items-center gap-2">
                  Focus brings clarity
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
