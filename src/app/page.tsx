import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'
import Marquee from '@/components/Marquee'
import GadgetCard from '@/components/GadgetCard'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [latestArticles, latestGadgets] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 7,
    }),
    prisma.gadget.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
  ])

  const [lead, ...rest] = latestArticles
  const secondary = rest.slice(0, 2)
  const newsFeed = rest.slice(0, 7)

  return (
    <>
      <TopRail />
      <Navbar />
      <Marquee />

      {/* ── Hero Section ── */}
      {lead ? (
        <div className="container" style={{ paddingTop: 36, paddingBottom: 40 }}>
          <div className="grid-12" style={{ alignItems: 'start' }}>
            <div style={{ gridColumn: 'span 8' }}>
              <Link href={`/articles/${lead.slug}`}>
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--paper-2)', border: '1px solid var(--rule)' }}>
                  {lead.coverImage ? (
                    <Image src={lead.coverImage} alt={lead.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 66vw" priority />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0 9px, rgba(255,255,255,0.03) 9px 10px)' }}>
                      <div className="ph-corner">LEAD 01</div>
                      <div className="ph-label">ARTIKEL UNGGULAN</div>
                    </div>
                  )}
                </div>
              </Link>
              <div style={{ marginTop: 22 }}>
                {lead.category && (
                  <span className="card-kicker">{lead.category}</span>
                )}
                <h1 className="headline" style={{ fontSize: 68, margin: '14px 0 14px', lineHeight: 0.98 }}>
                  <Link href={`/articles/${lead.slug}`}>{lead.title}</Link>
                </h1>
                {lead.excerpt && (
                  <p className="dek" style={{ fontSize: 22, margin: 0, maxWidth: 720 }}>{lead.excerpt}</p>
                )}
                <div className="byline" style={{ marginTop: 18 }}>
                  {lead.publishedAt
                    ? format(new Date(lead.publishedAt), 'd MMMM yyyy', { locale: id })
                    : format(new Date(lead.createdAt), 'd MMMM yyyy', { locale: id })}
                </div>
              </div>
            </div>

            <aside style={{ gridColumn: 'span 4', borderLeft: '1px solid var(--rule)', paddingLeft: 28 }}>
              <div className="mono xsmall uppercase mute" style={{ marginBottom: 10 }}>Paling Banyak Dibaca</div>
              <div>
                {rest.slice(0, 4).map((a, i) => (
                  <Link key={a.id} href={`/articles/${a.slug}`} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--rule)' }}>
                    <span className="rank-num accent" style={{ fontSize: 34 }}>{i + 1}</span>
                    <div>
                      <h4 className="headline" style={{ fontSize: 16, margin: 0, lineHeight: 1.2 }}>{a.title}</h4>
                      {a.category && <div className="byline" style={{ marginTop: 6 }}>{a.category}</div>}
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ border: '2px solid var(--ink)', padding: 20, marginTop: 28, background: 'var(--paper-2)' }}>
                <div className="mono xsmall uppercase" style={{ color: 'var(--accent)', marginBottom: 8 }}>Newsletter</div>
                <h3 className="headline" style={{ fontSize: 22, margin: '0 0 8px' }}>The Weekly Signal</h3>
                <p className="small dim" style={{ margin: '0 0 14px' }}>Satu gadget, satu opini, sekali seminggu. Tanpa link afiliasi.</p>
                <div style={{ display: 'flex', border: '1px solid var(--ink)' }}>
                  <input
                    placeholder="kamu@email.com"
                    style={{ flex: 1, background: 'transparent', border: 0, padding: '10px 12px', color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: 12 }}
                  />
                  <button className="btn btn-accent" style={{ border: 0 }}>Daftar →</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      ) : (
        <div className="container" style={{ paddingTop: 60, paddingBottom: 60, textAlign: 'center' }}>
          <p className="dek" style={{ fontSize: 20 }}>Belum ada artikel. Gunakan Content API untuk mengisi konten.</p>
          <Link href="/articles" className="btn btn-accent" style={{ display: 'inline-flex', marginTop: 20 }}>Lihat semua artikel →</Link>
        </div>
      )}

      {/* ── Secondary Cards ── */}
      {secondary.length > 0 && (
        <div className="container" style={{ paddingBottom: 40 }}>
          <div className="grid-2">
            {secondary.map((a, i) => (
              <Link key={a.id} href={`/articles/${a.slug}`} style={{ display: 'block' }}>
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: 'var(--paper-2)', border: '1px solid var(--rule)' }}>
                  {a.coverImage ? (
                    <Image src={a.coverImage} alt={a.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 50vw" />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0 9px, rgba(255,255,255,0.03) 9px 10px)' }}>
                      <div className="ph-corner">LEAD 0{i + 2}</div>
                      {a.category && <div className="ph-label">{a.category.toUpperCase()}</div>}
                    </div>
                  )}
                </div>
                <div style={{ marginTop: 14 }}>
                  {a.category && <span className="card-kicker">{a.category}</span>}
                  <h2 className="headline" style={{ fontSize: 30, margin: '10px 0 8px' }}>{a.title}</h2>
                  {a.excerpt && <p className="dek" style={{ fontSize: 16 }}>{a.excerpt}</p>}
                  <div className="byline" style={{ marginTop: 10 }}>
                    {a.publishedAt ? format(new Date(a.publishedAt), 'd MMMM yyyy', { locale: id }) : ''}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── News Feed ── */}
      {newsFeed.length > 0 && (
        <div className="container" style={{ paddingBottom: 40 }}>
          <div className="section-bar">
            <h2>Terbaru</h2>
            <span className="meta">diperbarui terus-menerus</span>
          </div>
          <div>
            {newsFeed.map((a, i) => (
              <Link key={a.id} href={`/articles/${a.slug}`} className="listitem">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  {a.category && (
                    <div className="mono xsmall uppercase" style={{ color: 'var(--accent)', marginBottom: 6 }}>{a.category}</div>
                  )}
                  <h3>{a.title}</h3>
                  <div className="byline" style={{ marginTop: 6 }}>
                    {a.publishedAt ? format(new Date(a.publishedAt), 'd MMMM yyyy', { locale: id }) : ''}
                  </div>
                </div>
                <span className="meta">
                  {a.tags.slice(0, 1).map(t => <span key={t} className="chip">{t}</span>)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Latest Gadgets ── */}
      {latestGadgets.length > 0 && (
        <div className="container" style={{ paddingBottom: 40 }}>
          <div className="section-bar">
            <h2>Gadget Terbaru</h2>
            <Link href="/gadgets" className="meta">Lihat semua →</Link>
          </div>
          <div className="grid-4" style={{ marginTop: 24 }}>
            {latestGadgets.map(g => (
              <GadgetCard key={g.id} gadget={g} />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
