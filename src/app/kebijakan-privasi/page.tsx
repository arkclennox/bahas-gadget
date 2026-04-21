import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import TopRail from '@/components/TopRail'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi — Bahas/Gadget',
}

const sections = [
  {
    title: 'Informasi yang Kami Kumpulkan',
    content: `Kami mengumpulkan informasi yang kamu berikan secara langsung, seperti alamat email saat berlangganan newsletter atau mengisi formulir kontak. Kami juga mengumpulkan data penggunaan secara anonim melalui analitik web untuk memahami bagaimana situs kami digunakan.`,
  },
  {
    title: 'Cara Kami Menggunakan Informasi',
    content: `Informasi yang kami kumpulkan digunakan untuk mengirimkan newsletter (jika kamu berlangganan), merespons pertanyaan dan pesan kamu, serta meningkatkan kualitas konten dan pengalaman pengguna di situs kami. Kami tidak menjual atau membagikan data pribadi kamu kepada pihak ketiga untuk keperluan pemasaran.`,
  },
  {
    title: 'Cookie',
    content: `Situs kami menggunakan cookie yang diperlukan untuk fungsi dasar situs. Kami tidak menggunakan cookie untuk pelacakan pemasaran lintas situs. Kamu dapat menonaktifkan cookie di pengaturan browser, namun beberapa fitur situs mungkin tidak berfungsi dengan baik.`,
  },
  {
    title: 'Keamanan Data',
    content: `Kami menggunakan langkah-langkah keamanan yang wajar untuk melindungi informasi pribadi kamu dari akses yang tidak sah. Namun, tidak ada metode transmisi data melalui internet yang 100% aman, dan kami tidak dapat menjamin keamanan absolut.`,
  },
  {
    title: 'Link Pihak Ketiga',
    content: `Situs kami mungkin berisi tautan ke situs web pihak ketiga, termasuk tautan afiliasi ke toko online. Kami tidak bertanggung jawab atas praktik privasi situs-situs tersebut. Kami sarankan kamu membaca kebijakan privasi setiap situs yang kamu kunjungi.`,
  },
  {
    title: 'Hak Kamu',
    content: `Kamu berhak untuk mengakses, mengoreksi, atau menghapus data pribadi yang kami miliki tentangmu. Untuk mengajukan permintaan, hubungi kami di redaksi@bahasgadget.id.`,
  },
  {
    title: 'Perubahan Kebijakan',
    content: `Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan akan kami informasikan melalui halaman ini. Tanggal pembaruan terakhir tertera di bagian bawah halaman ini.`,
  },
]

export default function KebijakanPrivasiPage() {
  return (
    <>
      <TopRail />
      <Navbar />

      <div className="container" style={{ padding: '20px 28px' }}>
        <div className="mono xsmall uppercase mute">Kebijakan Privasi</div>
      </div>

      <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div className="container" style={{ padding: '40px 28px' }}>
          <h1 className="headline" style={{ fontSize: 48, letterSpacing: '-0.03em', margin: 0 }}>Kebijakan Privasi</h1>
          <div className="byline" style={{ marginTop: 14 }}>Berlaku sejak: 1 Januari 2025 · Diperbarui: April 2025</div>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 28px', maxWidth: 800 }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.75, color: 'var(--ink)' }}>
          <p style={{ marginBottom: 40, color: 'var(--ink-dim)', fontFamily: 'var(--font-body)', fontSize: 15 }}>
            Bahas/Gadget berkomitmen untuk melindungi privasi para pembaca dan pengguna situs kami. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi kamu.
          </p>

          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em', marginBottom: 12 }}>
                {i + 1}. {s.title}
              </h2>
              <p style={{ margin: 0, color: 'var(--ink-dim)', fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7 }}>
                {s.content}
              </p>
            </div>
          ))}

          <div style={{ marginTop: 48, padding: '20px', border: '1px solid var(--rule)', background: 'var(--paper-2)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
            <span className="mono xsmall uppercase mute">Pertanyaan?</span>
            <p style={{ margin: '8px 0 0', color: 'var(--ink-dim)', lineHeight: 1.6 }}>
              Jika ada pertanyaan terkait kebijakan privasi ini, hubungi kami di{' '}
              <a href="mailto:redaksi@bahasgadget.id" style={{ color: 'var(--accent)' }}>redaksi@bahasgadget.id</a>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
