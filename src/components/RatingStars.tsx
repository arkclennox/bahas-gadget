export default function RatingStars({ rating, max = 10 }: { rating: number; max?: number }) {
  // Normalize to 5-star scale
  const normalized = (rating / max) * 5
  const full = Math.min(Math.floor(normalized), 5)
  const half = normalized % 1 >= 0.5 && full < 5
  const empty = Math.max(0, 5 - full - (half ? 1 : 0))

  return (
    <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: 2 }}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
      <span style={{ color: 'var(--ink-mute)', fontSize: 11, marginLeft: 4 }}>
        {rating.toFixed(1)}
      </span>
    </span>
  )
}
