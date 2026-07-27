'use client'

import { ShieldCheck } from 'lucide-react'
import { FabinsLogo } from '@/components/ui/FabinsLogo'

const NAV = [
  { name: 'About', id: 'about' },
  { name: 'System', id: 'system' },
  { name: 'Standards', id: 'standards' },
  { name: 'Innovators', id: 'innovators' },
  { name: 'Deploy FABINS', id: 'contact' },
]

const INNOVATORS = [
  { name: 'Md Rahinur Rahman', role: 'Lead AI Systems Engineer · EEE, BUET' },
  { name: 'Mohammad Ninad Mahmud Nobo', role: 'Lead AI Software Engineer · CSE, BUET' },
]

export const Footer = () => {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
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

  return (
    <footer className="border-t border-line bg-canvas-alt/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a
              href="#home"
              onClick={(e) => scrollTo(e, 'home')}
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <FabinsLogo className="h-12 w-12" />
              <span className="flex flex-col justify-center leading-none">
                <span className="block text-xl font-extrabold tracking-[-0.02em]">
                  FAB<span className="text-accent">INS</span>
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  Fabric Inspection Automation
                </span>
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              An AI-powered Fabric Defect Inspection System built for Textile Industries. It captures moving fabric, measures defects in millimetres, and issues automated Four-Point grading reports directly on existing inspection frames.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-line bg-panel px-4 py-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
              <span className="text-xs leading-tight">
                <span className="block font-semibold">Saturn Textiles Limited</span>
                <span className="block text-ink-soft">Research &amp; Development</span>
              </span>
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Navigate
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollTo(e, item.id)}
                    className="text-ink-muted transition-colors hover:text-accent"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Innovators */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Innovators
            </h4>
            <ul className="mt-5 space-y-4 text-sm">
              {INNOVATORS.map((person) => (
                <li key={person.name}>
                  <a href="#innovators" onClick={(e) => scrollTo(e, 'innovators')} className="group block">
                    <span className="block font-medium transition-colors group-hover:text-accent">
                      {person.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-soft">{person.role}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-ink-soft sm:flex-row">
          <p>© {new Date().getFullYear()} FABINS · Saturn Textiles Limited. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  )
}
