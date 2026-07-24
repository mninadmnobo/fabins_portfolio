'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Cpu, Menu, X, PlayCircle, FileText, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Why FABINS', href: '#why-fabins', id: 'why-fabins' },
    { name: 'Architecture', href: '#pipeline', id: 'pipeline' },
    { name: 'Hardware', href: '#hardware', id: 'hardware' },
    { name: 'Demonstration', href: '#demonstration', id: 'demonstration' },
    { name: 'Roadmap', href: '#roadmap', id: 'roadmap' },
    { name: 'Team', href: '#team', id: 'team' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname)
      }
    } else {
      const element = document.getElementById(targetId)
      if (element) {
        const topOffset = element.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: topOffset, behavior: 'smooth' })
        window.history.replaceState(null, '', `#${targetId}`)
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Active Section Scroll Tracking (including contact section)
      const scrollPosition = window.scrollY + 220
      const trackedIds = ['home', 'why-fabins', 'pipeline', 'hardware', 'demonstration', 'roadmap', 'team', 'contact']
      const sectionElements = trackedIds.map((id) => ({ id, el: document.getElementById(id) }))

      let currentSection = 'home'
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i]
        if (item.el && item.el.offsetTop <= scrollPosition) {
          currentSection = item.id
          break
        }
      }

      setActiveSection(currentSection)

      // Dynamic URL Hash Synchronization
      if (currentSection === 'home') {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname)
        }
      } else {
        const expectedHash = `#${currentSection}`
        if (window.location.hash !== expectedHash) {
          window.history.replaceState(null, '', expectedHash)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#030712]/92 backdrop-blur-xl border-b border-cyan-500/25 py-3 shadow-[0_4px_30px_rgba(0,240,255,0.12)]'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Brand Logo */}
        <a href="/" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 flex items-center justify-center p-0.5 shadow-[0_0_18px_rgba(0,240,255,0.45)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider text-white font-mono flex items-center">
              FAB<span className="text-cyan-400">INS</span>
            </span>
            <span className="block text-[10px] text-cyan-400/90 uppercase font-mono tracking-widest leading-none mt-0.5">
              Fabric Inspection Automation
            </span>
          </div>
        </a>

        {/* Floating Active Pill Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#080d1a]/90 p-1.5 rounded-full border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(0,240,255,0.1)] relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={cn(
                  "relative px-4 py-2 text-xs font-semibold font-mono rounded-full transition-all duration-300 flex items-center gap-1.5 select-none",
                  isActive
                    ? "text-white font-bold"
                    : "text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                )}
              >
                {/* Floating Motion Active Pill */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/25 via-blue-600/30 to-cyan-500/25 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Glowing Pulse Indicator */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse relative z-10" />
                )}

                <span className="relative z-10">{link.name}</span>
              </a>
            )
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold font-mono text-[#030712] bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#030712]" />
            Deploy FABINS
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-slate-900/90 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030712]/98 border-b border-cyan-500/30 px-6 py-6 space-y-3 backdrop-blur-2xl animate-fadeIn shadow-[0_10px_40px_rgba(0,240,255,0.15)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={cn(
                  "flex items-center justify-between text-sm font-semibold font-mono py-2.5 px-4 rounded-xl transition-all border",
                  isActive
                    ? "text-cyan-300 bg-cyan-500/15 border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "text-slate-300 border-transparent hover:bg-slate-900 hover:text-cyan-400"
                )}
              >
                <span>{link.name}</span>
                {isActive && <Sparkles className="w-4 h-4 text-cyan-400" />}
              </a>
            )
          })}
          <div className="pt-4 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="w-full text-center py-3.5 rounded-xl text-xs font-bold font-mono text-[#030712] bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              Deploy FABINS
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

