'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'

const inputStyle: React.CSSProperties = {
  display: 'block', width: '100%',
  background: 'var(--paper-2)', border: '1px solid var(--rule)',
  color: 'var(--ink)', padding: '10px 14px',
  fontFamily: 'var(--font-body)', fontSize: 15, outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11,
  textTransform: 'uppercase', letterSpacing: '0.1em',
  color: 'var(--ink-dim)', marginBottom: 8,
}

export default function KontakPage() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <TopRail />
      <Navbar />

      <div className="container" style={{ padding: '20px 28px' }}>
        <div className="mono xsmall uppercase mute">Kontak</div>
      </div>

      <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div className="container" style={{ padding: '40px 28px' }}>
          <h1 className="headline" style={{ fontSize: 48, letterSpacing: '-0.03em', margin: 0 }}>Hubungi Kami</h1>
          <p className="dek" style={{ fontSize: 18, maxWidth: 520, marginTop: 12 }}>
            Pertanyaan, koreksi, atau ingin mengirimkan unit untuk direview? Kami baca setiap pesan.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ padding: '32px', border: '1px solid var(--ok)', background: 'var(--paper-2)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, marginBottom: 10, color: 'var(--ok)' }}>
                  Pesan Terkirim
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-dim)', lineHeight: 1.6 }}>
                  Terima kasih sudah menghubungi kami. Kami akan membalas dalam 1–3 hari kerja.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Nama</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} placeholder="Nama lengkap kamu" />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} placeholder="email@kamu.com" />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Subjek</label>
                  <select value={subject} onChange={e => setSubject(e.target.value)} required style={inputStyle}>
                    <option value="">Pilih subjek</option>
                    <option value="koreksi">Koreksi artikel</option>
                    <option value="review">Pengiriman unit review</option>
                    <option value="kerjasama">Kerjasama & iklan</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Pesan</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={6} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} placeholder="Tulis pesanmu di sini..." />
                </div>
                <button type="submit" className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }}>
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7, color: 'var(--ink-dim)' }}>
            <div className="section-bar" style={{ marginBottom: 24 }}><h2 style={{ fontSize: 18 }}>Info Kontak</h2></div>
            {[
              ['Redaksi & Koreksi', 'redaksi@bahasgadget.id'],
              ['Review Unit', 'review@bahasgadget.id'],
              ['Kerjasama & Iklan', 'iklan@bahasgadget.id'],
            ].map(([label, val]) => (
              <div key={label} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--rule)' }}>
                <div className="mono xsmall uppercase mute" style={{ marginBottom: 4 }}>{label}</div>
                <div style={{ color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{val}</div>
              </div>
            ))}
            <div style={{ marginTop: 32, padding: '16px', border: '1px solid var(--rule)', background: 'var(--paper-2)', fontSize: 13, lineHeight: 1.6 }}>
              <span className="mono xsmall uppercase mute">Waktu respons</span><br />
              Kami membalas dalam 1–3 hari kerja. Untuk pertanyaan mendesak terkait koreksi, respons biasanya lebih cepat.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
