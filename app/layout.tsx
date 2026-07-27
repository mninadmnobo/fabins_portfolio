import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'FABINS — Fabric Inspection Automation',
  description:
    'AI-powered fabric defect detection: line-scan capture, millimetre measurement and automatic Four-Point inspection reports — a retrofit for the inspection frames mills already own.',
  icons: {
    icon: [
      { url: '/fabins-logo-light-mode.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/fabins-logo-light-mode.png',
    apple: '/fabins-logo-light-mode.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f6fa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
