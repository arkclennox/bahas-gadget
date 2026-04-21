import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import DeleteButton from '../DeleteButton'

export const dynamic = 'force-dynamic'

export default async function AdminGadgetsPage() {
  const gadgets = await prisma.gadget.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, brand: true, slug: true, category: true, rating: true, published: true, createdAt: true },
  })

  const th: React.CSSProperties = {
    fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em',
    color: 'var(--ink-mute)', padding: '10px 12px', textAlign: 'left', borderBottom: '1px solid var(--rule)',
    fontWeight: 500,
  }
  const td: React.CSSProperties = {
    padding: '12px 12px', borderBottom: '1px solid var(--rule)', fontSize: 14, verticalAlign: 'middle',
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', margin: 0 }}>Gadget</h1>
          <div className="mono xsmall mute" style={{ marginTop: 4 }}>{gadgets.length} total</div>
        </div>
        <Link href="/admin/gadgets/new" className="btn btn-accent">+ Gadget Baru</Link>
      </div>

      {gadgets.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--ink-mute)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          Belum ada gadget.
        </div>
      ) : (
        <div style={{ border: '1px solid var(--rule)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--paper-2)' }}>
              <tr>
                <th style={th}>Nama</th>
                <th style={th}>Brand</th>
                <th style={th}>Kategori</th>
                <th style={th}>Rating</th>
                <th style={th}>Status</th>
                <th style={th}>Tanggal</th>
                <th style={{ ...th, textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {gadgets.map(g => (
                <tr key={g.id} style={{ background: 'var(--paper)' }}>
                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{g.name}</div>
                    <div className="mono xsmall mute" style={{ marginTop: 2 }}>{g.slug}</div>
                  </td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12 }}>{g.brand}</td>
                  <td style={td}>
                    {g.category ? (
                      <span className="chip">{g.category}</span>
                    ) : (
                      <span style={{ color: 'var(--ink-mute)' }}>—</span>
                    )}
                  </td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                    {g.rating != null ? (
                      <span style={{ color: 'var(--accent)' }}>{g.rating}<span style={{ color: 'var(--ink-mute)', fontSize: 10 }}>/10</span></span>
                    ) : '—'}
                  </td>
                  <td style={td}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em',
                      padding: '3px 7px', border: `1px solid ${g.published ? 'var(--ok)' : 'var(--rule)'}`,
                      color: g.published ? 'var(--ok)' : 'var(--ink-mute)',
                    }}>
                      {g.published ? 'Tayang' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}>
                    {format(new Date(g.createdAt), 'd MMM yyyy', { locale: id })}
                  </td>
                  <td style={{ ...td, textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Link
                        href={`/gadgets/${g.slug}`}
                        target="_blank"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-dim)' }}
                      >
                        Lihat ↗
                      </Link>
                      <Link
                        href={`/admin/gadgets/${g.id}/edit`}
                        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)' }}
                      >
                        Edit
                      </Link>
                      <DeleteButton url={`/api/admin/gadgets/${g.id}`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
