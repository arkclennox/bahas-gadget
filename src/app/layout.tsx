import type { Metadata } from 'next'
import { Inter_Tight, JetBrains_Mono, Newsreader } from 'next/font/google'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bahas Gadget — Independent smartphone journalism',
  description: 'Independent reviews, news, and rankings for smartphones and gadgets. No affiliate bias. Review units returned.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      data-theme="amber"
      suppressHydrationWarning
      className={`${interTight.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}
      style={{
        '--font-display': 'var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif',
        '--font-body': 'var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif',
        '--font-serif': 'var(--font-newsreader), Georgia, serif',
        '--font-mono': 'var(--font-jetbrains-mono), ui-monospace, monospace',
      } as React.CSSProperties}
    >
      <head>
        {/* Prevent flash of wrong theme on load */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('bg-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'amber');}catch(e){}})()` }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
