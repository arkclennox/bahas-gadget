import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: string | null
  category?: string | null
  tags: string[]
  publishedAt?: Date | string | null
  createdAt: Date | string
}

interface Props {
  article: Article
  size?: 'large' | 'medium' | 'small'
}

export default function ArticleCard({ article, size = 'medium' }: Props) {
  const date = article.publishedAt ?? article.createdAt
  const formattedDate = date
    ? format(new Date(date), 'd MMMM yyyy', { locale: id })
    : ''

  const titleSize = size === 'large' ? 36 : size === 'medium' ? 24 : 18

  return (
    <Link href={`/articles/${article.slug}`} style={{ display: 'block' }}>
      <div style={{ position: 'relative', aspectRatio: '16/10', background: 'var(--paper-2)', border: '1px solid var(--rule)', overflow: 'hidden' }}>
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 900px) 100vw, 33vw"
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0 9px, rgba(255,255,255,0.03) 9px 10px)' }}>
            <div style={{ position: 'absolute', right: 10, top: 10, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.1em' }}>
              {article.category?.toUpperCase() ?? 'ARTIKEL'}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 14 }}>
        {article.category && (
          <span className="card-kicker">{article.category}</span>
        )}
        <h2 className="headline" style={{ fontSize: titleSize, margin: '10px 0 8px' }}>{article.title}</h2>
        {article.excerpt && (
          <p className="dek" style={{ fontSize: 15, margin: '0 0 8px' }}>{article.excerpt}</p>
        )}
        <div className="byline">{formattedDate}</div>
      </div>
    </Link>
  )
}
