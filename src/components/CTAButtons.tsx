type CTALink = { label: string; url: string }

const DEFAULTS: CTALink[] = [
  { label: 'Shopee', url: '' },
  { label: 'Tiktok', url: '' },
  { label: 'Blibli', url: '' },
]

export default function CTAButtons({ ctaLinks }: { ctaLinks: unknown }) {
  let links: CTALink[] = DEFAULTS
  if (Array.isArray(ctaLinks) && ctaLinks.length > 0) {
    links = ctaLinks as CTALink[]
  }

  const active = links.filter(l => l.url)
  if (active.length === 0) return null

  return (
    <div style={{ padding: '24px 0', borderTop: '1px solid var(--rule)' }}>
      <div className="mono xsmall uppercase mute" style={{ marginBottom: 12 }}>Beli di</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {active.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn btn-accent"
            style={{ paddingLeft: 20, paddingRight: 20 }}
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </div>
  )
}
