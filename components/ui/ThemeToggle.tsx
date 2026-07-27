'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === 'dark' : true

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line
                 bg-panel text-ink-muted transition-colors hover:border-line-strong hover:text-accent
                 cursor-pointer"
    >
      <Sun
        className={`h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? 'absolute scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
      />
      <Moon
        className={`h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? 'scale-100 rotate-0 opacity-100' : 'absolute scale-50 -rotate-90 opacity-0'
        }`}
      />
    </button>
  )
}
