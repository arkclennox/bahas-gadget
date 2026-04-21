import Link from 'next/link'
import GadgetForm from '../GadgetForm'

export default function NewGadgetPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Link href="/admin/gadgets" className="mono xsmall mute" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ← Kembali
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', margin: 0 }}>
          Gadget Baru
        </h1>
      </div>
      <GadgetForm />
    </div>
  )
}
