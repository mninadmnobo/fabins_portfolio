import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans relative cyber-grid">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  )
}
