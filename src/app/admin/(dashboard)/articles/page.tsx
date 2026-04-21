import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import DeleteButton from '../DeleteButton'

export const dynamic = 'force-dynamic'

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, category: true, published: true, publishedAt: true, createdAt: true },
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
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', margin: 0 }}>Artikel</h1>
          <div className="mono xsmall mute" style={{ marginTop: 4 }}>{articles.length} total</div>
        </div>
        <Link href="/admin/articles/new" className="btn btn-accent">+ Artikel Baru</Link>
      </div>

      {articles.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--ink-mute)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          Belum ada artikel.
        </div>
      ) : (
        <div style={{ border: '1px solid var(--rule)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--paper-2)' }}>
              <tr>
                <th style={th}>Judul</th>
                <th style={th}>Kategori</th>
                <th style={th}>Status</th>
                <th style={th}>Tanggal</th>
                <th style={{ ...th, textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(a => (
                <tr key={a.id} style={{ background: 'var(--paper)' }}>
                  <td style={td}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{a.title}</div>
                    <div className="mono xsmall mute" style={{ marginTop: 2 }}>{a.slug}</div>
                  </td>
                  <td style={td}>
                    {a.category ? (
                      <span className="chip">{a.category}</span>
                    ) : (
                      <span style={{ color: 'var(--ink-mute)' }}>—</span>
                    )}
                  </td>
                  <td style={td}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em',
                      padding: '3px 7px', border: `1px solid ${a.published ? 'var(--ok)' : 'var(--rule)'}`,
                      color: a.published ? 'var(--ok)' : 'var(--ink-mute)',
                    }}>
                      {a.published ? 'Tayang' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}>
                    {format(new Date(a.createdAt), 'd MMM yyyy', { locale: id })}
                  </td>
                  <td style={{ ...td, textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Link
                        href={`/articles/${a.slug}`}
                        target="_blank"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-dim)' }}
                      >
                        Lihat ↗
                      </Link>
                      <Link
                        href={`/admin/articles/${a.id}/edit`}
                        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)' }}
                      >
                        Edit
                      </Link>
                      <DeleteButton url={`/api/admin/articles/${a.id}`} />
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
