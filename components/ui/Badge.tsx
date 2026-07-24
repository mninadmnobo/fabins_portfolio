import React from 'react'
import { cn } from '@/lib/utils'

export type BadgeTone = 'cyan' | 'blue' | 'emerald' | 'warning' | 'purple' | 'neutral'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  capitalize?: boolean
  children: React.ReactNode
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_12px_rgba(37,99,235,0.15)]',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.15)]',
  neutral: 'bg-slate-800/60 text-slate-300 border-slate-700/60',
}

export const Badge: React.FC<BadgeProps> = ({
  tone = 'cyan',
  capitalize = false,
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono border transition-all',
        TONE_CLASSES[tone],
        capitalize && 'capitalize',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
