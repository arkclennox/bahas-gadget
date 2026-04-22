import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

export default async function RankingsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams

  const categoryGroups = await prisma.gadget.groupBy({
    by: ['category'],
    where: { published: true },
  })

  const categories = [
    'Semua',
    ...categoryGroups.map(g => g.category).filter(Boolean) as string[],
  ]

  const activeCategory = params.category ?? 'Semua'

  const where: Record<string, unknown> = { published: true }
  if (activeCategory !== 'Semua') where.category = activeCategory

  const gadgets = await prisma.gadget.findMany({
    where,
    orderBy: { rating: 'desc' },
  })

  const categoryLabel =
    activeCategory === 'Semua'
      ? 'Semua Gadget'
      : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)

  return (
    <>
      <TopRail />
      <Navbar />

      <div className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>
        <div className="section-bar">
          <h2>Ranking · April 2026</h2>
          <span className="meta">diperbarui bulanan</span>
        </div>

        <div className="grid-12" style={{ marginTop: 28, alignItems: 'start' }}>
          {/* Sidebar kategori */}
          <aside style={{ gridColumn: 'span 3', borderRight: '1px solid var(--rule)', paddingRight: 20 }}>
            <div className="mono xsmall uppercase mute" style={{ marginBottom: 12 }}>Kategori</div>
            {categories.map(cat => {
              const isActive = cat === activeCategory
              return (
                <Link
                  key={cat}
                  href={cat === 'Semua' ? '/rankings' : `/rankings?category=${encodeURIComponent(cat)}`}
                  style={{
                    display: 'block',
                    padding: '10px 12px',
                    marginBottom: 2,
                    border: `1px solid ${isActive ? 'var(--ink)' : 'transparent'}`,
                    background: isActive ? 'var(--paper-2)' : 'transparent',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 15,
                    color: isActive ? 'var(--ink)' : 'var(--ink-dim)',
                    textDecoration: 'none',
                  }}
                >
                  {cat === 'Semua' ? 'Semua' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Link>
              )
            })}
          </aside>

          {/* Daftar ranking */}
          <div style={{ gridColumn: 'span 9' }}>
            <span className="card-kicker">Kategori</span>
            <h1 className="headline" style={{ fontSize: 52, margin: '14px 0 40px' }}>{categoryLabel}</h1>

            {gadgets.length === 0 ? (
              <p className="dek">Belum ada gadget di kategori ini.</p>
            ) : (
              gadgets.map((gadget, i) => {
                // extract up to 4 chip values from flat or grouped specs
                const rawSpecs = gadget.specs as Record<string, unknown> | null
                const chips: string[] = []
                if (rawSpecs) {
                  for (const val of Object.values(rawSpecs)) {
                    if (chips.length >= 4) break
                    if (typeof val === 'string') {
                      chips.push(val)
                    } else if (val && typeof val === 'object') {
                      for (const v of Object.values(val as Record<string, string>)) {
                        if (chips.length >= 4) break
                        if (typeof v === 'string') chips.push(v)
                      }
                    }
                  }
                }

                return (
                  <div
                    key={gadget.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '160px 1fr auto',
                      gap: 28,
                      alignItems: 'start',
                      padding: '30px 0',
                      borderTop: '1px solid var(--rule)',
                    }}
                  >
                    <div>
                      <span className={`rank-num${i === 0 ? ' accent' : ''}`} style={{ fontSize: 48 }}>№&nbsp;{i + 1}</span>
                      {gadget.coverImage ? (
                        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--paper-3)', marginTop: 12 }}>
                          <Image src={gadget.coverImage} alt={gadget.name} fill style={{ objectFit: 'cover' }} sizes="160px" />
                        </div>
                      ) : (
                        <div className="ph ph-phone" style={{ aspectRatio: '3/4', marginTop: 12 }}>
                          <div style={{ color: 'var(--ink-mute)' }}>
                            <svg viewBox="0 0 80 140" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '42%' }}>
                              <rect x="6" y="4" width="68" height="132" rx="10" />
                              <rect x="11" y="13" width="58" height="106" rx="2" />
                              <circle cx="40" cy="128" r="2.5" />
                            </svg>
                          </div>
                          <div className="ph-label">{gadget.brand.toUpperCase()} {gadget.name.toUpperCase()}</div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="mono xsmall uppercase mute">{gadget.brand}</div>
                      <h3 className="headline" style={{ fontSize: 30, margin: '4px 0 8px' }}>
                        <Link href={`/gadgets/${gadget.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {gadget.name}
                        </Link>
                      </h3>
                      {gadget.description && (
                        <p className="dek" style={{ fontSize: 17, margin: 0 }}>{gadget.description}</p>
                      )}
                      {chips.length > 0 && (
                        <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                          {chips.map((c, idx) => (
                            <span key={idx} className="chip">{c}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={{ textAlign: 'right', minWidth: 120 }}>
                      {gadget.rating != null && (
                        <>
                          <div className="score-big">
                            <span>{gadget.rating.toFixed(1)}</span>
                            <span className="of">/ 10</span>
                          </div>
                          <div className="score-bar" style={{ marginTop: 12 }}>
                            <span style={{ width: `${gadget.rating * 10}%` }} />
                          </div>
                        </>
                      )}
                      <Link href={`/gadgets/${gadget.slug}`} className="btn btn-ghost" style={{ marginTop: 14, display: 'inline-block' }}>
                        Lihat detail →
                      </Link>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
