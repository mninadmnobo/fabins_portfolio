'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { fadeUpProps } from '@/lib/animations'

export const HeroSection = () => (
  <section id="home" className="relative overflow-hidden pb-20 pt-10 sm:pt-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-6">
          <motion.h1
            {...fadeUpProps(0.12)}
            className="display mt-6 text-[clamp(2.6rem,6.2vw,4.6rem)]"
          >
            FAB<span className="text-accent">INS</span>
            <span className="mt-2 block text-[clamp(1.5rem,3.4vw,2.5rem)] font-bold tracking-normal text-ink-muted">
              Fabric Inspection Automation
            </span>
          </motion.h1>

          <motion.p
            {...fadeUpProps(0.18)}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            Every defect caught. Every millimetre measured. Every roll graded.
          </motion.p>

          <motion.div {...fadeUpProps(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#system" className="btn btn-primary">
              See how it works
            </a>
            <a href="#contact" className="btn btn-primary">
              Deploy FABINS
            </a>
          </motion.div>

          <motion.p
            {...fadeUpProps(0.3)}
            className="mt-7 flex items-start gap-2 text-sm text-ink-soft"
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Automate Fabric Inspection with FABINS.
          </motion.p>
        </div>

        {/* Machine */}
        <motion.div {...fadeUpProps(0.2)} className="relative lg:col-span-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel-2 shadow-[var(--shadow-lift)]">
            <img
              src="/fabins-machine.png"
              alt="FABINS line-scan inspection rig running fabric with a live operator dashboard"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)
