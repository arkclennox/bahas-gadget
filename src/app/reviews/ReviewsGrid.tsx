'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Gadget } from '@prisma/client'

export default function ReviewsGrid({ gadgets }: { gadgets: Gadget[] }) {
  const [sort, setSort] = useState<'rating' | 'name'>('rating')

  const sorted = [...gadgets].sort((a, b) => {
    if (sort === 'rating') return (b.rating ?? 0) - (a.rating ?? 0)
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <div className="section-bar">
        <h2>Reviews</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="meta">Urutkan</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as 'rating' | 'name')}
            style={{ background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--rule)', padding: '4px 8px', fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            <option value="rating">Rating</option>
            <option value="name">Nama A–Z</option>
          </select>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="dek" style={{ paddingTop: 40, textAlign: 'center' }}>Belum ada gadget yang di-review.</p>
      ) : (
        <div className="grid-3" style={{ marginTop: 28 }}>
          {sorted.map(p => (
            <Link
              key={p.id}
              href={`/gadgets/${p.slug}`}
              style={{ display: 'block', border: '1px solid var(--rule)', padding: 20, background: 'var(--paper-2)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="mono xsmall uppercase" style={{ color: 'var(--accent)' }}>{p.brand}</div>
                {p.rating != null && (
                  <span className="mono" style={{ fontSize: 14, fontWeight: 700 }}>
                    {p.rating.toFixed(1)}<span style={{ color: 'var(--ink-mute)', fontSize: 10, fontWeight: 400 }}>/10</span>
                  </span>
                )}
              </div>
              <h3 className="headline" style={{ fontSize: 28, margin: '6px 0 14px' }}>{p.name}</h3>
              {p.coverImage ? (
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--paper-3)' }}>
                  <Image src={p.coverImage} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 33vw" />
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
                </div>
              )}
              {p.description && (
                <p className="dek" style={{ fontSize: 14, margin: '14px 0 0' }}>
                  &ldquo;{p.description.slice(0, 80)}{p.description.length > 80 ? '...' : ''}&rdquo;
                </p>
              )}
              {p.category && (
                <div className="byline" style={{ marginTop: 10 }}>{p.category}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
