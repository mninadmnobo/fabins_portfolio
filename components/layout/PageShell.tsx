import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-canvas text-ink">
      {/* Ambient backdrop: engineering grid + soft brand glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 grid-bg opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-[150px]"
        style={{ background: 'var(--glow-a)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 -z-10 h-[380px] w-[520px] rounded-full blur-[150px]"
        style={{ background: 'var(--glow-b)' }}
      />

      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  )
}
