import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin-session')
  if (!session || session.value !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 24, height: 52 }}>
          <Link href="/admin/articles" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, letterSpacing: '-0.03em' }}>
            Bahas<span style={{ color: 'var(--accent)' }}>/</span>Admin
          </Link>
          <div style={{ width: 1, height: 20, background: 'var(--rule)' }} />
          <nav style={{ display: 'flex', gap: 4 }}>
            <Link href="/admin/articles" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '6px 10px', color: 'var(--ink-dim)' }}>
              Artikel
            </Link>
            <Link href="/admin/gadgets" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '6px 10px', color: 'var(--ink-dim)' }}>
              Gadget
            </Link>
          </nav>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/" target="_blank" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-mute)' }}>
              Lihat Situs ↗
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, maxWidth: 1200, margin: '0 auto', padding: '32px 24px', width: '100%' }}>
        {children}
      </div>
    </div>
  )
}
