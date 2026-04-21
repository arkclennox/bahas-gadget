const CATEGORY_COLORS: Record<string, string> = {
  smartphone: 'var(--accent)',
  laptop: 'var(--ok)',
  tablet: 'var(--warn)',
  wearable: 'oklch(0.70 0.22 340)',
  audio: 'var(--ink-dim)',
}

export default function CategoryBadge({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category.toLowerCase()] ?? 'var(--ink-dim)'
  return (
    <span className="chip" style={{ color, borderColor: color }}>
      {category}
    </span>
  )
}
