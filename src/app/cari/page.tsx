import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'
import SearchInput from './SearchInput'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

type Props = { searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  return { title: q ? `"${q}" — Cari — Bahas/Gadget` : 'Cari — Bahas/Gadget' }
}

export default async function CariPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''

  let articles: Awaited<ReturnType<typeof prisma.article.findMany>> = []
  let gadgets: Awaited<ReturnType<typeof prisma.gadget.findMany>> = []

  if (query.length >= 2) {
    const filter = { contains: query, mode: 'insensitive' as const }
    ;[articles, gadgets] = await Promise.all([
      prisma.article.findMany({
        where: {
          published: true,
          OR: [{ title: filter }, { excerpt: filter }, { category: filter }],
        },
        orderBy: { publishedAt: 'desc' },
        take: 12,
      }),
      prisma.gadget.findMany({
        where: {
          published: true,
          OR: [{ name: filter }, { brand: filter }, { description: filter }, { category: filter }],
        },
        orderBy: { createdAt: 'desc' },
        take: 12,
      }),
    ])
  }

  const total = articles.length + gadgets.length

  return (
    <>
      <TopRail />
      <Navbar />

      {/* Search bar */}
      <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div className="container" style={{ padding: '32px 28px' }}>
          <SearchInput initialValue={query} />
        </div>
      </div>

      <div className="container" style={{ padding: '40px 28px' }}>
        {/* Status line */}
        {query.length >= 2 && (
          <div className="mono xsmall mute" style={{ marginBottom: 32 }}>
            {total === 0
              ? `Tidak ada hasil untuk "${query}"`
              : `${total} hasil untuk "${query}"`}
          </div>
        )}

        {query.length < 2 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-mute)', fontFamily: 'var(--font-mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Ketik minimal 2 karakter untuk mulai mencari
          </div>
        )}

        {/* Gadgets results */}
        {gadgets.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div className="section-bar"><h2>Gadget</h2></div>
            <div className="grid-4" style={{ marginTop: 20 }}>
              {gadgets.map(g => (
                <Link key={g.id} href={`/gadgets/${g.slug}`} style={{ display: 'block' }}>
                  <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--paper-3)', border: '1px solid var(--rule)' }}>
                    {g.coverImage ? (
                      <Image src={g.coverImage} alt={g.name} fill style={{ objectFit: 'cover' }} sizes="25vw" />
                    ) : (
                      <div className="ph-label">{g.brand.toUpperCase()}</div>
                    )}
                  </div>
                  {g.category && <span className="card-kicker" style={{ marginTop: 10, display: 'inline-block' }}>{g.category}</span>}
                  <h3 className="headline" style={{ fontSize: 16, margin: '6px 0 4px' }}>{g.brand} {g.name}</h3>
                  {g.rating && <div className="byline">{g.rating}/10</div>}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles results */}
        {articles.length > 0 && (
          <div>
            <div className="section-bar"><h2>Artikel</h2></div>
            <div className="grid-3" style={{ marginTop: 20 }}>
              {articles.map(a => (
                <Link key={a.id} href={`/articles/${a.slug}`} style={{ display: 'block' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: 'var(--paper-2)', border: '1px solid var(--rule)' }}>
                    {a.coverImage ? (
                      <Image src={a.coverImage} alt={a.title} fill style={{ objectFit: 'cover' }} sizes="33vw" />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0 }}>
                        {a.category && <div className="ph-label">{a.category.toUpperCase()}</div>}
                      </div>
                    )}
                  </div>
                  {a.category && <span className="card-kicker" style={{ marginTop: 12, display: 'inline-block' }}>{a.category}</span>}
                  <h3 className="headline" style={{ fontSize: 18, margin: '8px 0 6px' }}>{a.title}</h3>
                  <div className="byline">
                    {a.publishedAt ? format(new Date(a.publishedAt), 'd MMM yyyy', { locale: id }) : ''}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
