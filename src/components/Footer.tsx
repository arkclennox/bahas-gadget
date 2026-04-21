import Link from 'next/link'

const COLS = [
  { title: 'Seksi', items: [['Reviews', '/reviews'], ['Berita', '/articles'], ['Gadget', '/gadgets']] },
  { title: 'Tentang', items: [['Redaksi', '#'], ['Metodologi', '#'], ['Cara kami memberi skor', '#'], ['Kontak', '#']] },
  { title: 'Ikuti', items: [['Newsletter', '#'], ['RSS', '#']] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 36 }}>
          <div>
            <div className="wordmark" style={{ fontSize: 28 }}>
              <span>Bahas<span className="slash">/</span>Gadget</span>
            </div>
            <p className="mono xsmall dim" style={{ marginTop: 12, maxWidth: 280, textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.5 }}>
              Publikasi independen tentang smartphone dan gadget. Tanpa bias afiliasi. Unit review dikembalikan.
            </p>
          </div>
          {COLS.map(c => (
            <div key={c.title}>
              <div className="col-title">{c.title}</div>
              {c.items.map(([label, href]) => (
                <Link key={label} href={href}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <hr className="hr" />
        <div className="mono xsmall" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-mute)' }}>
          <span>© {new Date().getFullYear()} Bahas/Gadget</span>
          <span>Dibuat dengan deadline</span>
        </div>
      </div>
    </footer>
  )
}
