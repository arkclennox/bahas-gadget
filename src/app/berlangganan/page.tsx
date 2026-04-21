'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'

export default function BerlanggananPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    // Simulasi submit — integrasikan dengan layanan email pilihan (Mailchimp, Resend, dll.)
    await new Promise(r => setTimeout(r, 800))
    setStatus('success')
  }

  return (
    <>
      <TopRail />
      <Navbar />

      <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div className="container" style={{ padding: '60px 28px', textAlign: 'center' }}>
          <span className="card-kicker" style={{ display: 'inline-flex', marginBottom: 20 }}>Newsletter</span>
          <h1 className="headline" style={{ fontSize: 52, letterSpacing: '-0.03em', maxWidth: 600, margin: '0 auto 16px', lineHeight: 0.98 }}>
            Tetap di depan kurva gadget
          </h1>
          <p className="dek" style={{ fontSize: 18, maxWidth: 480, margin: '0 auto' }}>
            Review mendalam, berita, dan analisis langsung ke inbox kamu. Tidak ada spam. Bisa berhenti kapan saja.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 28px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', color: 'var(--ok)', marginBottom: 12 }}>
                Kamu sudah terdaftar!
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink-dim)', lineHeight: 1.6, marginBottom: 28 }}>
                Terima kasih telah berlangganan. Edisi pertama akan segera hadir di inbox kamu. Cek folder spam jika tidak muncul dalam beberapa menit.
              </p>
              <Link href="/" className="btn">Kembali ke Beranda</Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
                <div style={{ marginBottom: 12 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="email@kamu.com"
                    style={{
                      display: 'block', width: '100%',
                      background: 'var(--paper-2)', border: '1px solid var(--ink)',
                      color: 'var(--ink)', padding: '14px 16px',
                      fontFamily: 'var(--font-body)', fontSize: 17, outline: 'none',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-accent"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 13 }}
                >
                  {status === 'loading' ? 'Mendaftarkan...' : 'Berlangganan Gratis'}
                </button>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-mute)', textAlign: 'center', marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Gratis · Tidak ada spam · Berhenti kapan saja
                </p>
              </form>

              {/* What you get */}
              <div>
                <div className="mono xsmall uppercase mute" style={{ marginBottom: 16 }}>Yang kamu dapatkan</div>
                {[
                  ['Review mendalam', 'Ulasan gadget terbaru dari tim kami — ditulis setelah pengujian berminggu-minggu.'],
                  ['Berita terkurasi', 'Berita penting dari dunia smartphone dan gadget, tanpa noise.'],
                  ['Panduan pembeli', 'Rekomendasi gadget berdasarkan kebutuhan dan budget kamu.'],
                ].map(([judul, deskripsi]) => (
                  <div key={judul} style={{ display: 'flex', gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--rule)' }}>
                    <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 18, lineHeight: 1 }}>→</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{judul}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5 }}>{deskripsi}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
