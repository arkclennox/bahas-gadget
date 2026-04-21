import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tentang Kami — Bahas/Gadget',
  description: 'Bahas/Gadget adalah publikasi independen yang fokus pada ulasan smartphone dan gadget secara jujur dan mendalam.',
}

export default function TentangKamiPage() {
  return (
    <>
      <TopRail />
      <Navbar />

      <div className="container" style={{ padding: '20px 28px' }}>
        <div className="mono xsmall uppercase mute">Tentang Kami</div>
      </div>

      <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div className="container" style={{ padding: '60px 28px' }}>
          <h1 className="headline" style={{ fontSize: 56, letterSpacing: '-0.03em', maxWidth: 720, lineHeight: 0.98 }}>
            Jurnalisme gadget yang tidak dijual
          </h1>
          <p className="dek" style={{ fontSize: 20, maxWidth: 580, marginTop: 20 }}>
            Kami menulis tentang gadget karena kami peduli — bukan karena ada yang membayar kami untuk bilang bagus.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 28px', maxWidth: 800 }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, lineHeight: 1.7, color: 'var(--ink)' }}>

          <div className="section-bar" style={{ marginBottom: 32 }}>
            <h2>Siapa kami</h2>
          </div>
          <p style={{ marginBottom: 24 }}>
            Bahas/Gadget adalah publikasi independen yang berfokus pada ulasan smartphone dan gadget secara mendalam dan jujur. Kami percaya bahwa pembaca berhak mendapatkan informasi yang tidak dipengaruhi oleh kepentingan komersial.
          </p>
          <p style={{ marginBottom: 48 }}>
            Setiap perangkat yang kami ulas digunakan dalam kondisi nyata — bukan sekadar unboxing singkat. Unit review dikembalikan ke produsen setelah proses pengujian selesai.
          </p>

          <div className="section-bar" style={{ marginBottom: 32 }}>
            <h2>Prinsip kami</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 48 }}>
            {[
              ['Independen', 'Kami tidak menerima bayaran dari produsen untuk menulis ulasan positif. Tidak ada iklan native yang tersamar sebagai konten editorial.'],
              ['Transparan', 'Cara kami memberikan skor, metodologi pengujian, dan potensi konflik kepentingan selalu kami ungkapkan secara terbuka.'],
              ['Mendalam', 'Kami menguji perangkat selama berminggu-minggu dalam pemakaian nyata — bukan hanya sesi hands-on singkat di acara peluncuran.'],
              ['Bertanggung jawab', 'Jika kami salah, kami koreksi. Setiap koreksi dicatat di artikel terkait.'],
            ].map(([judul, isi]) => (
              <div key={judul} style={{ padding: '20px', border: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{judul}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-dim)' }}>{isi}</div>
              </div>
            ))}
          </div>

          <div className="section-bar" style={{ marginBottom: 32 }}>
            <h2>Kontak</h2>
          </div>
          <p style={{ marginBottom: 16 }}>
            Punya pertanyaan, koreksi, atau ingin mengirimkan perangkat untuk diulas? Hubungi kami di halaman <a href="/kontak" style={{ color: 'var(--accent)' }}>Kontak</a>.
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}
