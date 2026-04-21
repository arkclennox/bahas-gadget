'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/compare', label: 'Compare' },
  { href: '/gadgets', label: 'Gadget' },
  { href: '/articles', label: 'News' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link href="/" className="wordmark" style={{ textDecoration: 'none' }}>
          <span>Bahas<span className="slash">/</span>Gadget</span>
          <span className="sub">Vol.&nbsp;I&nbsp;·&nbsp;№&nbsp;001</span>
        </Link>

        <nav className="nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mast-right">
          <button className="search-btn" onClick={() => router.push('/cari')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" />
            </svg>
            Cari gadget, review
            <span className="kbd">⌘K</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
