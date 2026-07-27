import { FabinsLogo } from '@/components/ui/FabinsLogo'
import { cn } from '@/lib/utils'

/**
 * WORDMARK — the logo, the FABINS name, and the tagline as one lockup.
 *
 * Used by the navbar and the footer, which previously each wrote out the same
 * fifteen lines of nested spans at slightly different sizes. The brand is now
 * assembled in one place, so the accent split (FAB + INS) and the tagline can
 * never drift apart between the top and bottom of the page.
 *
 * ─── USAGE ──────────────────────────────────────────────────────────────────
 *   <Wordmark size="sm" />   // navbar
 *   <Wordmark size="md" />   // footer
 *
 * The two sizes exist because the navbar sits in a compact pill and the footer
 * has room to breathe. Add a third only if a third placement appears.
 *
 * This renders no link or button — the caller wraps it in whatever `<a>` it
 * needs, which is why the navbar's version scrolls to the top and the footer's
 * does too but with different padding and hover treatment.
 */

/** Per-size classes. Keeping both variants adjacent makes them easy to compare. */
const SIZES = {
  sm: {
    logo: 'h-11 w-11 shrink-0 sm:h-12 sm:w-12',
    name: 'text-[17px]',
  },
  md: {
    logo: 'h-12 w-12',
    name: 'text-xl',
  },
} as const

interface WordmarkProps {
  /** `sm` for the navbar pill, `md` for the footer. Defaults to `sm`. */
  size?: keyof typeof SIZES
  /** Extra classes for the wrapper. */
  className?: string
}

export function Wordmark({ size = 'sm', className }: WordmarkProps) {
  const sizing = SIZES[size]

  return (
    <span className={cn('flex items-center gap-2', className)}>
      <FabinsLogo className={sizing.logo} />

      {/* `leading-none` keeps the name and tagline tight against each other. */}
      <span className="flex flex-col justify-center leading-none">
        <span className={cn('block font-extrabold tracking-[-0.02em]', sizing.name)}>
          {/* The accent split is the brand's signature — always FAB + INS. */}
          FAB<span className="text-accent">INS</span>
        </span>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          Fabric Inspection Automation
        </span>
      </span>
    </span>
  )
}
