import type { Transition, Variants } from 'framer-motion'

const SMOOTH_POP: Transition['ease'] = [0.21, 0.47, 0.32, 0.98]

/** Standard viewport trigger: re-trigger animations on scroll up/down. */
export const defaultViewport = { once: false, amount: 0.05 } as const

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
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: SMOOTH_POP },
  },
}

export function fadeUpProps(delay = 0, duration = 0.55) {
  return {
    initial: { opacity: 0, y: 36, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: defaultViewport,
    transition: { duration, delay, ease: SMOOTH_POP },
  }
}

export function fadeLeftProps(delay = 0, duration = 0.55) {
  return {
    initial: { opacity: 0, x: -36, scale: 0.97 },
    whileInView: { opacity: 1, x: 0, scale: 1 },
    viewport: defaultViewport,
    transition: { duration, delay, ease: SMOOTH_POP },
  }
}
