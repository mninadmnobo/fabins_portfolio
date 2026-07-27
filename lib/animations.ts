import type { Transition, Variants } from 'framer-motion'

const EASE_OUT: Transition['ease'] = 'easeOut'

/** Standard viewport trigger: reveal once, then stay put. */
export const defaultViewport = { once: true, amount: 0.15 } as const

export function staggerContainer(staggerChildren = 0.1, delayChildren = 0.2): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren, delayChildren },
    },
  }
}

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

export function fadeUpProps(delay = 0, duration = 0.5) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: defaultViewport,
    transition: { duration, delay, ease: EASE_OUT },
  }
}

export function fadeLeftProps(delay = 0, duration = 0.5) {
  return {
    initial: { opacity: 0, x: -24 },
    whileInView: { opacity: 1, x: 0 },
    viewport: defaultViewport,
    transition: { duration, delay, ease: EASE_OUT },
  }
}
