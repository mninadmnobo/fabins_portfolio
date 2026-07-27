'use client'

import { motion } from 'framer-motion'
import { UserX, Clock, BarChart2, Database, Zap, Globe, ShieldAlert, Cpu } from 'lucide-react'
import { FABINS_POC_DATA } from '@/lib/data/fabins-poc'
import { fadeUpProps } from '@/lib/animations'

const ICON_MAP: Record<string, React.ElementType> = {
  UserX,
  Clock,
  BarChart2,
  Database,
  Zap,
  Globe,
  ShieldAlert,
  Cpu,
}

export const ProblemSection = () => (
  <section className="py-24 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-14 max-w-3xl">
        <motion.span {...fadeUpProps(0.05)} className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          The problem
        </motion.span>
        <motion.h2 {...fadeUpProps(0.1)} className="display mt-5 text-[clamp(2rem,4.4vw,3.25rem)]">
          THE HUMAN LIMIT AT
          <br />
          THE INSPECTION FRAME
        </motion.h2>
        <motion.p {...fadeUpProps(0.16)} className="mt-6 leading-relaxed text-ink-muted">
          Bangladesh RMG is a national export pillar, yet quality control at the frame is still one
          inspector, one pair of eyes, one tally sheet — while competing manufacturing hubs have
          already automated it.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FABINS_POC_DATA.industryProblems.slice(0, 4).map((item, idx) => {
          const Icon = ICON_MAP[item.iconName] || Cpu
          return (
            <motion.div key={item.id} {...fadeUpProps(idx * 0.07)} className="card card-hover">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-panel-2 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  </section>
)
