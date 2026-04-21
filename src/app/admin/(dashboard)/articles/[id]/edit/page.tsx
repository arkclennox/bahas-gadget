import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ArticleForm from '../../ArticleForm'

type Props = { params: Promise<{ id: string }> }

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) notFound()

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Link href="/admin/articles" className="mono xsmall mute" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ← Kembali
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', margin: 0 }}>
          Edit Artikel
        </h1>
        <div className="mono xsmall mute" style={{ marginTop: 4 }}>{article.slug}</div>
      </div>
      <ArticleForm initialData={{
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        category: article.category,
        tags: article.tags,
        content: article.content,
        coverImage: article.coverImage,
        published: article.published,
        ctaLinks: article.ctaLinks,
      }} />
    </div>
  )
}
