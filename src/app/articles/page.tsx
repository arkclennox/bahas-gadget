import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

const CATEGORIES = ['Semua', 'smartphone', 'laptop', 'tablet', 'wearable', 'audio']

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const params = await searchParams
  const category = params.category
  const page = Math.max(parseInt(params.page ?? '1'), 1)
  const limit = 12
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = { published: true }
  if (category && category !== 'Semua') where.category = category

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      skip,
      take: limit,
      orderBy: { publishedAt: 'desc' },
    }),
    prisma.article.count({ where }),
  ])

  const totalPages = Math.ceil(total / limit)

  return (
    <>
      <TopRail />
      <Navbar />

      <div className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>
        <div className="section-bar">
          <h2>Berita & Artikel</h2>
          <span className="meta">{total} artikel</span>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '16px 0', borderBottom: '1px solid var(--rule)' }}>
          {CATEGORIES.map(cat => {
            const isActive = cat === 'Semua' ? !category || category === 'Semua' : category === cat
            return (
              <Link
                key={cat}
                href={cat === 'Semua' ? '/articles' : `/articles?category=${cat}`}
                className="btn btn-ghost"
                style={{
                  borderColor: isActive ? 'var(--ink)' : 'var(--rule)',
                  color: isActive ? 'var(--ink)' : 'var(--ink-dim)',
                }}
              >
                {cat}
              </Link>
            )
          })}
        </div>

        {articles.length === 0 ? (
          <p className="dek" style={{ paddingTop: 40, textAlign: 'center' }}>Belum ada artikel di kategori ini.</p>
        ) : (
          <div className="grid-3" style={{ marginTop: 28 }}>
            {articles.map(a => (
              <Link key={a.id} href={`/articles/${a.slug}`} style={{ display: 'block' }}>
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: 'var(--paper-2)', border: '1px solid var(--rule)' }}>
                  {a.coverImage ? (
                    <Image src={a.coverImage} alt={a.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 33vw" />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0 9px, rgba(255,255,255,0.03) 9px 10px)' }}>
                      {a.category && <div className="ph-label">{a.category.toUpperCase()}</div>}
                    </div>
                  )}
                </div>
                <div style={{ marginTop: 14 }}>
                  {a.category && <span className="card-kicker">{a.category}</span>}
                  <h2 className="headline" style={{ fontSize: 22, margin: '10px 0 8px' }}>{a.title}</h2>
                  {a.excerpt && <p className="dek" style={{ fontSize: 14, margin: '0 0 8px' }}>{a.excerpt}</p>}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    <div className="byline">
                      {a.publishedAt ? format(new Date(a.publishedAt), 'd MMMM yyyy', { locale: id }) : ''}
                    </div>
                    {a.tags.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 48 }}>
            {page > 1 && (
              <Link href={`/articles?${category ? `category=${category}&` : ''}page=${page - 1}`} className="btn btn-ghost">← Sebelumnya</Link>
            )}
            <span className="btn btn-ghost" style={{ pointerEvents: 'none' }}>
              {page} / {totalPages}
            </span>
            {page < totalPages && (
              <Link href={`/articles?${category ? `category=${category}&` : ''}page=${page + 1}`} className="btn btn-ghost">Berikutnya →</Link>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
