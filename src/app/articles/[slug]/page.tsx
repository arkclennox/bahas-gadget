import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'
import ArticleBody from './ArticleBody'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return articles.map(a => ({ slug: a.slug }))
  } catch {
    return []
  }
}

export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const article = await prisma.article.findFirst({ where: { slug, published: true } })
    if (!article) return { title: 'Artikel tidak ditemukan' }
    return {
      title: `${article.title} — Bahas/Gadget`,
      description: article.excerpt ?? undefined,
    }
  } catch {
    return { title: 'Bahas/Gadget' }
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await prisma.article.findFirst({ where: { slug, published: true } })
  if (!article) notFound()

  const related = await prisma.article.findMany({
    where: { published: true, id: { not: article.id } },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  })

  const publishedDate = article.publishedAt ?? article.createdAt

  return (
    <>
      <TopRail />
      <Navbar />

      {/* Breadcrumb */}
      <div className="container" style={{ padding: '20px 28px' }}>
        <div className="mono xsmall uppercase mute">
          <Link href="/">Front page</Link>
          &nbsp;/&nbsp;
          <Link href="/articles">Artikel</Link>
          {article.category && <> &nbsp;/&nbsp; {article.category}</>}
        </div>
      </div>

      {/* Article Hero */}
      <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div className="container" style={{ padding: '40px 28px' }}>
          <div className="grid-12" style={{ alignItems: 'center' }}>
            <div style={{ gridColumn: 'span 7' }}>
              {article.category && <span className="card-kicker">{article.category}</span>}
              <h1 className="headline" style={{ fontSize: 60, letterSpacing: '-0.03em', margin: '16px 0 14px', lineHeight: 0.98 }}>
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="dek" style={{ fontSize: 22, maxWidth: 620 }}>{article.excerpt}</p>
              )}
              <div className="byline" style={{ marginTop: 20, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <span>{format(new Date(publishedDate), 'd MMMM yyyy', { locale: id })}</span>
                {article.tags.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>
            <div style={{ gridColumn: 'span 5' }}>
              {article.coverImage ? (
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 2 }}>
                  <Image src={article.coverImage} alt={article.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 40vw" priority />
                </div>
              ) : (
                <div className="ph" style={{ aspectRatio: '4/3' }}>
                  <div className="ph-corner">HERO</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Body — client component for reader mode */}
      <ArticleBody content={article.content} ctaLinks={article.ctaLinks} />

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="container" style={{ paddingTop: 20, paddingBottom: 40 }}>
          <div className="section-bar"><h2>Baca Juga</h2></div>
          <div className="grid-3" style={{ marginTop: 20 }}>
            {related.map(a => (
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
                <h3 className="headline" style={{ fontSize: 22, margin: '8px 0 6px' }}>{a.title}</h3>
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
