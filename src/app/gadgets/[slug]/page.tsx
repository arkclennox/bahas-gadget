import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'
import RatingStars from '@/components/RatingStars'
import CTAButtons from '@/components/CTAButtons'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const gadgets = await prisma.gadget.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return gadgets.map(g => ({ slug: g.slug }))
  } catch {
    return []
  }
}

export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const gadget = await prisma.gadget.findFirst({ where: { slug, published: true } })
    if (!gadget) return { title: 'Gadget tidak ditemukan' }
    return {
      title: `${gadget.brand} ${gadget.name} — Bahas/Gadget`,
      description: gadget.description ?? undefined,
    }
  } catch {
    return { title: 'Bahas/Gadget' }
  }
}

export default async function GadgetDetailPage({ params }: Props) {
  const { slug } = await params
  const gadget = await prisma.gadget.findFirst({
    where: { slug, published: true },
    include: { images: { orderBy: { order: 'asc' } } },
  })
  if (!gadget) notFound()

  const relatedArticles = await prisma.article.findMany({
    where: { published: true, category: gadget.category ?? undefined },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  })

  type FlatSpecs = Record<string, string>
  type GroupedSpecs = Record<string, Record<string, string>>
  const rawSpecs = gadget.specs as FlatSpecs | GroupedSpecs | null
  const isGrouped = rawSpecs && typeof Object.values(rawSpecs)[0] === 'object'

  return (
    <>
      <TopRail />
      <Navbar />

      {/* Breadcrumb */}
      <div className="container" style={{ padding: '20px 28px' }}>
        <div className="mono xsmall uppercase mute">
          <Link href="/">Front page</Link>
          &nbsp;/&nbsp;
          <Link href="/gadgets">Gadget</Link>
          &nbsp;/&nbsp;
          {gadget.brand} {gadget.name}
        </div>
      </div>

      {/* Hero */}
      <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div className="container" style={{ padding: '40px 28px' }}>
          <div className="grid-12" style={{ alignItems: 'center' }}>
            <div style={{ gridColumn: 'span 7' }}>
              {gadget.category && <span className="card-kicker">{gadget.category}</span>}
              <div className="mono xsmall uppercase mute" style={{ marginTop: 14 }}>{gadget.brand}</div>
              <h1 className="headline" style={{ fontSize: 60, letterSpacing: '-0.03em', margin: '8px 0 14px', lineHeight: 0.98 }}>
                {gadget.name}
              </h1>
              {gadget.description && (
                <p className="dek" style={{ fontSize: 20, maxWidth: 620 }}>{gadget.description}</p>
              )}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20, alignItems: 'center' }}>
                {gadget.rating && <RatingStars rating={gadget.rating} />}
                <div className="byline">
                  {format(new Date(gadget.createdAt), 'd MMMM yyyy', { locale: id })}
                </div>
              </div>
            </div>

            <div style={{ gridColumn: 'span 5' }}>
              {gadget.coverImage ? (
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--paper-3)' }}>
                  <Image src={gadget.coverImage} alt={gadget.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 40vw" priority />
                </div>
              ) : (
                <div className="ph ph-phone" style={{ aspectRatio: '3/4' }}>
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
          </div>
        </div>
      </div>

      {/* Specs */}
      {rawSpecs && Object.keys(rawSpecs).length > 0 && (
        <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="section-bar"><h2>Spesifikasi Lengkap</h2></div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, marginTop: 20 }}>
            {isGrouped
              ? Object.entries(rawSpecs as GroupedSpecs).map(([group, rows]) => (
                  <div key={group} style={{ marginBottom: 32 }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
                      letterSpacing: '0.12em', color: 'var(--accent)', fontWeight: 600,
                      padding: '8px 0', borderBottom: '2px solid var(--accent)', marginBottom: 4,
                    }}>
                      {group}
                    </div>
                    {Object.entries(rows).map(([k, v]) => (
                      <div key={k} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', padding: '10px 0', borderBottom: '1px solid var(--rule)' }}>
                        <span className="mono xsmall mute" style={{ paddingRight: 16 }}>{k}</span>
                        <span style={{ lineHeight: 1.5 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                ))
              : Object.entries(rawSpecs as FlatSpecs).map(([k, v]) => (
                  <div key={k} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', padding: '10px 0', borderBottom: '1px solid var(--rule)' }}>
                    <span className="mono xsmall mute" style={{ paddingRight: 16 }}>{k}</span>
                    <span style={{ lineHeight: 1.5 }}>{v}</span>
                  </div>
                ))
            }
          </div>
        </div>
      )}

      {/* CTA Affiliate Buttons */}
      <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <CTAButtons ctaLinks={gadget.ctaLinks} />
      </div>

      {/* Image Gallery */}
      {gadget.images.length > 0 && (
        <div className="container" style={{ paddingTop: 40, paddingBottom: 0 }}>
          <div className="section-bar"><h2>Galeri Foto</h2></div>
          <div className="grid-3" style={{ marginTop: 20 }}>
            {gadget.images.map(img => (
              <div key={img.id} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--paper-3)' }}>
                <Image src={img.url} alt={img.alt ?? gadget.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="container" style={{ paddingBottom: 40 }}>
          <div className="section-bar"><h2>Review & Berita Terkait</h2></div>
          <div className="grid-3" style={{ marginTop: 20 }}>
            {relatedArticles.map(a => (
              <Link key={a.id} href={`/articles/${a.slug}`} style={{ display: 'block' }}>
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: 'var(--paper-2)', border: '1px solid var(--rule)' }}>
                  {a.coverImage ? (
                    <Image src={a.coverImage} alt={a.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 33vw" />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0 }}>
                      {a.category && <div className="ph-label">{a.category.toUpperCase()}</div>}
                    </div>
                  )}
                </div>
                {a.category && <span className="card-kicker" style={{ marginTop: 12, display: 'inline-block' }}>{a.category}</span>}
                <h3 className="headline" style={{ fontSize: 20, margin: '8px 0 6px' }}>{a.title}</h3>
                <div className="byline">
                  {a.publishedAt ? format(new Date(a.publishedAt), 'd MMMM yyyy', { locale: id }) : ''}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
