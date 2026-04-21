'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Gadget } from '@prisma/client'

export default function CompareClient({ gadgets }: { gadgets: Gadget[] }) {
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null])
  const [pickerOpen, setPickerOpen] = useState<number | null>(null)

  const setSlot = (i: number, id: string | null) => {
    setSlots(prev => prev.map((x, j) => (j === i ? id : x)))
    setPickerOpen(null)
  }

  const filledGadgets = slots
    .filter(Boolean)
    .map(id => gadgets.find(g => g.id === id)!)
    .filter(Boolean)

  const cols = Math.max(2, filledGadgets.length)

  const allSpecKeys = Array.from(
    new Set(filledGadgets.flatMap(g => Object.keys((g.specs as Record<string, string>) ?? {})))
  )

  const maxRating = Math.max(...filledGadgets.map(g => g.rating ?? 0))

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <div className="section-bar">
        <h2>Compare</h2>
        <span className="meta">pilih hingga 3 gadget</span>
      </div>

      {/* Slots */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 28 }}>
        {slots.map((id, i) => {
          const gadget = id ? gadgets.find(g => g.id === id) : null
          return (
            <div key={i} className={`cmp-slot${gadget ? ' filled' : ''}`}>
              {gadget ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div className="mono xsmall uppercase mute">Slot {i + 1}</div>
                      <div className="headline" style={{ fontSize: 22, marginTop: 4 }}>
                        {gadget.brand} {gadget.name}
                      </div>
                    </div>
                    <button
                      onClick={() => setSlot(i, null)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-dim)', fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', padding: 4 }}
                    >
                      Hapus ✕
                    </button>
                  </div>

                  <div style={{ margin: '16px 0' }}>
                    {gadget.coverImage ? (
                      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--paper-3)' }}>
                        <Image src={gadget.coverImage} alt={gadget.name} fill style={{ objectFit: 'cover' }} sizes="33vw" />
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
                </>
              ) : (
                <>
                  <div className="mono xsmall uppercase mute">Slot {i + 1}</div>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <button
                      className="btn"
                      style={{ width: '100%' }}
                      onClick={() => setPickerOpen(pickerOpen === i ? null : i)}
                    >
                      + Tambah gadget
                    </button>
                    {pickerOpen === i && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, background: 'var(--paper)', border: '1px solid var(--rule)', marginTop: 4 }}>
                        {gadgets.filter(g => !slots.includes(g.id)).length === 0 ? (
                          <div style={{ padding: '10px 14px', color: 'var(--ink-mute)', fontSize: 13 }}>Semua gadget sudah dipilih.</div>
                        ) : (
                          gadgets.filter(g => !slots.includes(g.id)).map(g => (
                            <button
                              key={g.id}
                              onClick={() => setSlot(i, g.id)}
                              style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                width: '100%', padding: '10px 14px', background: 'none', border: 'none',
                                borderBottom: '1px solid var(--rule)', cursor: 'pointer', color: 'var(--ink)',
                                fontFamily: 'var(--font-body)', fontSize: 14, textAlign: 'left',
                              }}
                            >
                              <span>{g.brand} {g.name}</span>
                              {g.rating != null && (
                                <span className="mono" style={{ fontSize: 12, color: 'var(--ink-mute)' }}>
                                  {g.rating.toFixed(1)}/10
                                </span>
                              )}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  <p className="mono xsmall uppercase mute" style={{ maxWidth: 180, textAlign: 'center' }}>
                    Pilih gadget untuk membandingkan spesifikasi dan skor.
                  </p>
                </>
              )}
            </div>
          )
        })}
      </div>

      {filledGadgets.length >= 2 ? (
        <>
          {/* Tabel skor */}
          <div className="section-bar" style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 22 }}>Skor</h2>
          </div>
          <div>
            <div className="cmp-row" style={{ '--cols': cols, borderTop: '2px solid var(--ink)' } as React.CSSProperties}>
              <div className="k">Kategori</div>
              {filledGadgets.map(g => (
                <div key={g.id} className="v mono xsmall uppercase" style={{ color: 'var(--accent)' }}>
                  {g.brand} {g.name}
                </div>
              ))}
            </div>
            <div className="cmp-row highlight" style={{ '--cols': cols } as React.CSSProperties}>
              <div className="k">Rating</div>
              {filledGadgets.map(g => (
                <div
                  key={g.id}
                  className={`v${g.rating === maxRating ? ' best' : ''}`}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: g.rating === maxRating ? 700 : 400 }}
                >
                  {g.rating?.toFixed(1) ?? '—'}
                  <span className="score-bar" style={{ display: 'block', marginTop: 6, width: '80%' }}>
                    <span style={{ width: `${(g.rating ?? 0) * 10}%` }} />
                  </span>
                </div>
              ))}
            </div>
            <div className="cmp-row" style={{ '--cols': cols, borderBottom: '2px solid var(--ink)' } as React.CSSProperties}>
              <div className="k" style={{ background: 'var(--paper-2)' }}>Overall</div>
              {filledGadgets.map(g => (
                <div key={g.id} className="v" style={{ background: 'var(--paper-2)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>
                  {g.rating?.toFixed(1) ?? '—'}
                  <span style={{ fontSize: 13, color: 'var(--ink-mute)', fontWeight: 400 }}>/10</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabel spesifikasi */}
          {allSpecKeys.length > 0 && (
            <>
              <div className="section-bar" style={{ marginTop: 40 }}>
                <h2 style={{ fontSize: 22 }}>Spesifikasi</h2>
              </div>
              <div>
                <div className="cmp-row" style={{ '--cols': cols, borderTop: '2px solid var(--ink)' } as React.CSSProperties}>
                  <div className="k">Spek</div>
                  {filledGadgets.map(g => (
                    <div key={g.id} className="v mono xsmall uppercase" style={{ color: 'var(--accent)' }}>
                      {g.brand} {g.name}
                    </div>
                  ))}
                </div>
                {allSpecKeys.map(key => (
                  <div key={key} className="cmp-row" style={{ '--cols': cols } as React.CSSProperties}>
                    <div className="k">{key}</div>
                    {filledGadgets.map(g => {
                      const specs = g.specs as Record<string, string> | null
                      return (
                        <div key={g.id} className="v" style={{ fontSize: 13 }}>
                          {specs?.[key] ?? '—'}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <p className="dek" style={{ marginTop: 40, fontSize: 18 }}>
          Tambahkan minimal dua gadget untuk melihat perbandingan.
        </p>
      )}
    </div>
  )
}
