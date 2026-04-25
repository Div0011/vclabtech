'use client'

import { ArrowUpRight, GitBranch, Globe, Mail, Sparkles } from 'lucide-react'

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
  return (
    <footer id="contact" className="relative z-10 overflow-hidden border-t border-navy/10 bg-[#f7f8fc]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_0%_0%,rgba(37,99,235,0.09),transparent_30%),radial-gradient(circle_at_100%_100%,rgba(15,23,42,0.08),transparent_28%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.12)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.35em] text-cobalt/85">
          <span className="rounded-full border border-cobalt/20 bg-white/70 px-4 py-2">Grid Footer Mode</span>
          <span className="h-px w-20 bg-gradient-to-r from-cobalt/60 to-transparent" />
          <span className="rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-navy/70">Structured Information Architecture</span>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-navy/10 bg-white/75 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            <div className="border-b border-navy/10 p-6 sm:p-8 md:border-r xl:border-b-0">
              <p className="mb-4 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] sm:tracking-[0.45em] text-cobalt">VC LAB TECH</p>
              <h3 className="text-2xl font-display font-bold tracking-tight text-navy sm:text-3xl">
                High-end digital experiences engineered for performance.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                Premium interfaces, cinematic motion systems, and speed-first architecture for brands that want standout presence.
              </p>
            </div>

            <div className="border-b border-navy/10 p-6 sm:p-8 xl:border-b-0 xl:border-r">
              <p className="mb-4 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] sm:tracking-[0.45em] text-cobalt">Navigation</p>
              <div className="space-y-2">
                {footerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-navy transition-all duration-300 hover:border-cobalt/20 hover:bg-cobalt/5 hover:text-cobalt"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            <div className="border-b border-navy/10 p-6 sm:p-8 md:border-r xl:border-b-0">
              <p className="mb-4 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] sm:tracking-[0.45em] text-cobalt">Capabilities</p>
              <div className="space-y-2">
                {serviceLinks.map((service) => (
                  <a
                    key={service.name}
                    href={service.href}
                    className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-navy transition-all duration-300 hover:border-cobalt/20 hover:bg-cobalt/5 hover:text-cobalt"
                  >
                    <span>{service.name}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-cobalt/10 via-white/90 to-white p-6 sm:p-8">
              <p className="mb-4 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] sm:tracking-[0.45em] text-cobalt">Contact + Social</p>
              <a
                href="mailto:info@vclabtech.com"
                className="block text-xl font-display font-bold tracking-tight text-navy transition-colors duration-300 hover:text-cobalt sm:text-2xl"
              >
                info@vclabtech.com
              </a>
              <div className="mt-5 grid grid-cols-1 gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                    className="group inline-flex items-center justify-between rounded-xl border border-navy/15 bg-white/80 px-3 py-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.12em] sm:tracking-[0.22em] text-navy transition-all duration-300 hover:border-cobalt/40 hover:text-cobalt"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5" />
                        {social.name}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="relative border-t border-navy/10 bg-gradient-to-r from-navy via-[#11213f] to-cobalt px-6 py-5 sm:px-8">
            <div className="absolute inset-0 pointer-events-none opacity-[0.16] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:42px_42px]" />
            <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 text-white/80">
                <Sparkles className="h-4 w-4" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.35em]">Grid System Active</span>
              </div>
              <p className="text-sm text-white/70">
                &copy; {new Date().getFullYear()} Virtual Connect Lab Tech. Crafted for a unique high-end web experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
