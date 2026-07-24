import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FABINS Automation',
  description: 'Official Product Portfolio for FABINS Automation — a working machine-vision system that detects, measures, classifies and grades fabric defects to the Four-Point Scoring System.',
  keywords: [
    'FABINS Automation',
    'FABINS',
    'Fabric Inspection Automation',
    'AI Defect Detection',
    'Four-Point System',
    'Textile Machine Vision',
    'Saturn Textiles Limited R&D',
    'Hikrobot Line-Scan Camera',
    'Bangladesh RMG Automation'
  ],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/fabins-icon.png', type: 'image/png' }
    ],
    shortcut: '/fabins-icon.png',
    apple: '/fabins-icon.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  )
}
