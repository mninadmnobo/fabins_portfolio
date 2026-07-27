'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, PRIMARY_CTA, SECTION_IDS } from '@/lib/data/site'
import { scrollToSection, useActiveSection, useIsScrolled } from '@/lib/scroll'
import { cn } from '@/lib/utils'
import { FabinsLogo } from '@/components/ui/FabinsLogo'

/**
 * NAVBAR — the floating pill header.
 *
 * Links come from `NAV_LINKS` in `lib/data/site.ts`, which the footer also
 * reads. To add or reorder a nav item, edit that file — not this one.
 *
 * ─── BEHAVIOUR ──────────────────────────────────────────────────────────────
 *   - `useIsScrolled` swaps the bar from translucent to solid once the page moves.
 *   - `useActiveSection` highlights the link for the section in view.
 *   - Clicks are intercepted so navigation scrolls smoothly with the header
 *     offset applied, instead of jumping. The `href="#id"` is kept so the links
 *     still work without JavaScript and can be opened in a new tab.
 *
 * The sliding highlight behind the active link is a single element shared
 * between links via Framer Motion's `layoutId` — that is what makes it glide
 * from one link to the next rather than cross-fade.
 */

export const Navbar = () => {
  const isScrolled = useIsScrolled()
  const activeSection = useActiveSection(SECTION_IDS)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  /** Scrolls to a section and closes the mobile menu if it is open. */
  const handleNavigate = (event: React.MouseEvent, sectionId: string) => {
    event.preventDefault()
    setIsMobileMenuOpen(false)
    scrollToSection(sectionId)
  }

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
        {/* Brand — scrolls back to the top of the page. */}
        <a
          href="#home"
          onClick={(event) => handleNavigate(event, 'home')}
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

        {/* Desktop navigation. Collapses into the mobile menu below `lg`. */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => handleNavigate(event, link.id)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5',
                  isActive
                    ? 'text-[var(--btn-ink)]'
                    : 'text-ink-muted hover:bg-accent-quiet hover:text-accent'
                )}
              >
                {/*
                  Shared `layoutId` means Framer Motion animates this one pill
                  between links rather than fading a new one in per link.
                */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--btn-from)] to-[var(--btn-to)] shadow-[0_8px_25px_-8px_var(--btn-from)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {/* Sits above the pill so the label stays readable. */}
                <span className="relative z-10">{link.name}</span>
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Contact CTA — fills in solid once the contact section is reached. */}
          <a
            href={`#${PRIMARY_CTA.id}`}
            onClick={(event) => handleNavigate(event, PRIMARY_CTA.id)}
            className={cn(
              'btn hidden !px-5 !py-2.5 text-[13px] transition-all duration-300 sm:inline-flex',
              activeSection === PRIMARY_CTA.id ? 'btn-primary' : 'btn-secondary'
            )}
          >
            {PRIMARY_CTA.name}
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-ink-muted transition-colors hover:border-line-strong hover:text-accent lg:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — same destinations, stacked. Closes on any selection. */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-7xl rounded-3xl border border-line bg-panel/95 p-3 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => handleNavigate(event, link.id)}
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
            href={`#${PRIMARY_CTA.id}`}
            onClick={(event) => handleNavigate(event, PRIMARY_CTA.id)}
            className={cn(
              'btn mt-2 w-full transition-all duration-300',
              activeSection === PRIMARY_CTA.id ? 'btn-primary' : 'btn-secondary'
            )}
          >
            {PRIMARY_CTA.name}
          </a>
        </div>
      )}
    </header>
  )
}