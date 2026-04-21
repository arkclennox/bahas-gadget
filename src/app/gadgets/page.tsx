import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'
import GadgetCard from '@/components/GadgetCard'

export const dynamic = 'force-dynamic'

const CATEGORIES = ['Semua', 'smartphone', 'laptop', 'tablet', 'wearable', 'audio']

export default async function GadgetsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string; page?: string }>
}) {
  const params = await searchParams
  const category = params.category
  const brand = params.brand
  const page = Math.max(parseInt(params.page ?? '1'), 1)
  const limit = 12
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = { published: true }
  if (category && category !== 'Semua') where.category = category
  if (brand) where.brand = { equals: brand, mode: 'insensitive' }

  const [gadgets, total] = await Promise.all([
    prisma.gadget.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.gadget.count({ where }),
  ])

  const totalPages = Math.ceil(total / limit)

  return (
    <>
      <TopRail />
      <Navbar />

      <div className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>
        <div className="section-bar">
          <h2>Katalog Gadget</h2>
          <span className="meta">{total} gadget</span>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '16px 0', borderBottom: '1px solid var(--rule)' }}>
          {CATEGORIES.map(cat => {
            const isActive = cat === 'Semua' ? !category || category === 'Semua' : category === cat
            return (
              <Link
                key={cat}
                href={cat === 'Semua' ? '/gadgets' : `/gadgets?category=${cat}`}
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

        {gadgets.length === 0 ? (
          <p className="dek" style={{ paddingTop: 40, textAlign: 'center' }}>Belum ada gadget di kategori ini.</p>
        ) : (
          <div className="grid-3" style={{ marginTop: 28 }}>
            {gadgets.map(g => (
              <GadgetCard key={g.id} gadget={g} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 48 }}>
            {page > 1 && (
              <Link href={`/gadgets?${category ? `category=${category}&` : ''}page=${page - 1}`} className="btn btn-ghost">← Sebelumnya</Link>
            )}
            <span className="btn btn-ghost" style={{ pointerEvents: 'none' }}>{page} / {totalPages}</span>
            {page < totalPages && (
              <Link href={`/gadgets?${category ? `category=${category}&` : ''}page=${page + 1}`} className="btn btn-ghost">Berikutnya →</Link>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
