import Link from 'next/link'
import Image from 'next/image'
import RatingStars from './RatingStars'

interface Gadget {
  id: string
  name: string
  brand: string
  slug: string
  description?: string | null
  coverImage?: string | null
  category?: string | null
  rating?: number | null
}

export default function GadgetCard({ gadget }: { gadget: Gadget }) {
  return (
    <Link href={`/gadgets/${gadget.slug}`} style={{ display: 'block', border: '1px solid var(--rule)', padding: 20, background: 'var(--paper-2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="mono xsmall uppercase" style={{ color: 'var(--accent)' }}>{gadget.brand}</div>
        {gadget.rating && (
          <span className="mono" style={{ fontSize: 14, fontWeight: 700 }}>
            {gadget.rating.toFixed(1)}<span style={{ color: 'var(--ink-mute)', fontSize: 10, fontWeight: 400 }}>/10</span>
          </span>
        )}
      </div>

      <h3 className="headline" style={{ fontSize: 28, margin: '6px 0 14px' }}>{gadget.name}</h3>

      {gadget.coverImage ? (
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--paper-3)' }}>
          <Image src={gadget.coverImage} alt={gadget.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 900px) 100vw, 25vw" />
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

      {gadget.description && (
        <p className="dek" style={{ fontSize: 14, margin: '14px 0 0' }}>"{gadget.description.slice(0, 100)}..."</p>
      )}

      <div className="byline" style={{ marginTop: 10 }}>
        {gadget.category && <span>{gadget.category}</span>}
        {gadget.rating && <> · <RatingStars rating={gadget.rating} /></>}
      </div>
    </Link>
  )
}
