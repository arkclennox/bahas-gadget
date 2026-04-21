import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Ketentuan Layanan — Bahas/Gadget',
}

const sections = [
  {
    title: 'Penerimaan Ketentuan',
    content: `Dengan mengakses dan menggunakan situs Bahas/Gadget, kamu menyetujui untuk terikat dengan ketentuan layanan ini. Jika kamu tidak menyetujui ketentuan ini, harap tidak menggunakan situs kami.`,
  },
  {
    title: 'Penggunaan Konten',
    content: `Seluruh konten di Bahas/Gadget — termasuk artikel, ulasan, foto, dan grafis — dilindungi hak cipta. Kamu boleh membagikan tautan ke konten kami, namun dilarang menyalin, mempublikasi ulang, atau mendistribusikan konten kami secara penuh tanpa izin tertulis dari kami.`,
  },
  {
    title: 'Akurasi Informasi',
    content: `Kami berusaha menyajikan informasi yang akurat dan terkini, namun tidak memberikan jaminan terhadap keakuratan, kelengkapan, atau keandalan konten kami. Harga, spesifikasi, dan ketersediaan produk dapat berubah sewaktu-waktu. Kami menyarankan kamu untuk memverifikasi informasi penting sebelum membuat keputusan pembelian.`,
  },
  {
    title: 'Tautan Afiliasi',
    content: `Bahas/Gadget dapat menggunakan tautan afiliasi ke toko online. Jika kamu melakukan pembelian melalui tautan tersebut, kami mungkin mendapatkan komisi kecil tanpa biaya tambahan bagimu. Ini membantu mendanai operasional redaksi kami. Keberadaan tautan afiliasi tidak mempengaruhi independensi ulasan kami.`,
  },
  {
    title: 'Batasan Tanggung Jawab',
    content: `Bahas/Gadget tidak bertanggung jawab atas kerugian atau kerusakan yang timbul dari penggunaan situs atau konten kami, termasuk keputusan pembelian yang didasarkan pada informasi di situs ini. Penggunaan situs ini sepenuhnya atas risiko kamu sendiri.`,
  },
  {
    title: 'Komentar dan Interaksi',
    content: `Kamu bertanggung jawab penuh atas konten yang kamu kirimkan melalui formulir kontak atau saluran komunikasi lainnya. Dilarang mengirimkan konten yang bersifat ilegal, melecehkan, atau menyesatkan.`,
  },
  {
    title: 'Perubahan Ketentuan',
    content: `Kami berhak mengubah ketentuan layanan ini kapan saja. Perubahan akan berlaku segera setelah dipublikasikan di halaman ini. Penggunaan situs yang berkelanjutan setelah perubahan dianggap sebagai penerimaan terhadap ketentuan yang diperbarui.`,
  },
  {
    title: 'Hukum yang Berlaku',
    content: `Ketentuan layanan ini diatur dan ditafsirkan berdasarkan hukum Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan di bawah yurisdiksi pengadilan yang berwenang di Indonesia.`,
  },
]

export default function KetentuanLayananPage() {
  return (
    <>
      <TopRail />
      <Navbar />

      <div className="container" style={{ padding: '20px 28px' }}>
        <div className="mono xsmall uppercase mute">Ketentuan Layanan</div>
      </div>

      <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div className="container" style={{ padding: '40px 28px' }}>
          <h1 className="headline" style={{ fontSize: 48, letterSpacing: '-0.03em', margin: 0 }}>Ketentuan Layanan</h1>
          <div className="byline" style={{ marginTop: 14 }}>Berlaku sejak: 1 Januari 2025 · Diperbarui: April 2025</div>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 28px', maxWidth: 800 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: 'var(--ink)' }}>
          <p style={{ marginBottom: 40, color: 'var(--ink-dim)' }}>
            Harap baca ketentuan layanan ini dengan seksama sebelum menggunakan situs Bahas/Gadget.
          </p>

          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 36, paddingBottom: 36, borderBottom: '1px solid var(--rule)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em', marginBottom: 10 }}>
                {i + 1}. {s.title}
              </h2>
              <p style={{ margin: 0, color: 'var(--ink-dim)', lineHeight: 1.7 }}>
                {s.content}
              </p>
            </div>
          ))}

          <div style={{ padding: '20px', border: '1px solid var(--rule)', background: 'var(--paper-2)', fontSize: 14 }}>
            <span className="mono xsmall uppercase mute">Pertanyaan?</span>
            <p style={{ margin: '8px 0 0', color: 'var(--ink-dim)', lineHeight: 1.6 }}>
              Untuk pertanyaan terkait ketentuan layanan ini, hubungi kami di{' '}
              <a href="mailto:redaksi@bahasgadget.id" style={{ color: 'var(--accent)' }}>redaksi@bahasgadget.id</a>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
