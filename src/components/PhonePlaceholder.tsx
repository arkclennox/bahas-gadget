interface Props {
  label?: string
  corner?: string
  aspect?: string
  kind?: 'generic' | 'phone'
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 80 140" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="6" y="4" width="68" height="132" rx="10" />
      <rect x="11" y="13" width="58" height="106" rx="2" />
      <circle cx="40" cy="128" r="2.5" />
      <rect x="49" y="16" width="15" height="9" rx="3" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export default function PhonePlaceholder({ label, corner, aspect = '3/2', kind = 'generic' }: Props) {
  if (kind === 'phone') {
    return (
      <div className="ph ph-phone" style={{ aspectRatio: aspect }}>
        <div style={{ color: 'var(--ink-mute)' }}><PhoneGlyph /></div>
        {corner && <div className="ph-corner">{corner}</div>}
        {label && <div className="ph-label">{label}</div>}
      </div>
    )
  }
  return (
    <div className="ph" style={{ aspectRatio: aspect }}>
      {corner && <div className="ph-corner">{corner}</div>}
      {label && <div className="ph-label">{label}</div>}
    </div>
  )
}
