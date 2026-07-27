'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FabinsLogo } from '@/components/ui/FabinsLogo'

const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'System', id: 'system' },
  { name: 'Standards', id: 'standards' },
  { name: 'Innovators', id: 'innovators' },
]

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollTo = (targetId: string) => {
    setMobileMenuOpen(false)

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(targetId)
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 96,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const trackedIds = [...NAV_LINKS.map((l) => l.id), 'contact']

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16)

      const probe = window.scrollY + 200
      let current = 'home'
      for (let i = trackedIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(trackedIds[i])
        if (el && el.offsetTop <= probe) {
          current = trackedIds[i]
          break
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border backdrop-blur-xl transition-all duration-300',
          'px-3 py-2 sm:px-4',
          'hover:-translate-y-1 hover:border-accent/50 hover:bg-panel/90 hover:shadow-[0_20px_50px_-16px_rgba(8,145,178,0.55)]',
          isScrolled
            ? 'border-line bg-panel/85 shadow-[0_12px_44px_-26px_rgba(8,145,178,0.75)]'
            : 'border-line/60 bg-panel/45'
        )}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('home')
          }}
          className="group flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-panel-2"
        >
          <FabinsLogo className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" />
          <span className="flex flex-col justify-center leading-none">
            <span className="block text-[17px] font-extrabold tracking-[-0.02em]">
              FAB<span className="text-accent">INS</span>
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              Fabric Inspection Automation
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(link.id)
                }}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5',
                  isActive ? 'text-[var(--btn-ink)]' : 'text-ink-muted hover:bg-accent-quiet hover:text-accent'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--btn-from)] to-[var(--btn-to)] shadow-[0_8px_25px_-8px_var(--btn-from)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('contact')
            }}
            className={cn(
              'btn hidden !px-5 !py-2.5 text-[13px] sm:inline-flex transition-all duration-300',
              activeSection === 'contact' ? 'btn-primary' : 'btn-secondary'
            )}
          >
            Let's Connect
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-ink-muted transition-colors hover:border-line-strong hover:text-accent lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-line bg-panel/95 p-3 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(link.id)
              }}
              className={cn(
                'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200',
                activeSection === link.id
                  ? 'bg-gradient-to-r from-[var(--btn-from)] to-[var(--btn-to)] text-[var(--btn-ink)] shadow-[0_8px_25px_-8px_var(--btn-from)]'
                  : 'text-ink-muted hover:bg-panel-2 hover:text-ink'
              )}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('contact')
            }}
            className={cn(
              'btn mt-2 w-full transition-all duration-300',
              activeSection === 'contact' ? 'btn-primary' : 'btn-secondary'
            )}
          >
            Let's Connect
          </a>
        </div>
      )}
    </header>
  )
}
