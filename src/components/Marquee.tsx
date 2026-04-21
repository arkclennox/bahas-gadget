const ITEMS = [
  'Review terbaru',
  'Gadget pilihan minggu ini',
  'Spesifikasi lengkap',
  'Harga terbaik',
  'Panduan pembeli',
  'Perbandingan flagship',
  'AI agent content API aktif',
]

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-inner">
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i}><span className="tick">●</span>{t}</span>
        ))}
      </div>
    </div>
  )
}
