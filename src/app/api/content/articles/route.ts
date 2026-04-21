import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateApiKey } from '@/lib/apikey'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  if (!await validateApiKey(apiKey)) {
    return NextResponse.json({ error: 'Invalid or inactive API key.' }, { status: 401 })
  }

  const body = await request.json()
  const { title, slug, content, excerpt, coverImage, category, tags, published, publishedAt } = body

  if (!title || !content) {
    return NextResponse.json({ error: 'title and content are required.' }, { status: 400 })
  }

  const finalSlug = slug || generateSlug(title)

  const article = await prisma.article.create({
    data: {
      title,
      slug: finalSlug,
      content,
      excerpt: excerpt ?? null,
      coverImage: coverImage ?? null,
      category: category ?? null,
      tags: tags ?? [],
      published: published ?? false,
      publishedAt: published && !publishedAt ? new Date() : publishedAt ? new Date(publishedAt) : null,
    },
  })

  return NextResponse.json(article, { status: 201 })
}

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  if (!await validateApiKey(apiKey)) {
    return NextResponse.json({ error: 'Invalid or inactive API key.' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const published = searchParams.get('published')
  const category = searchParams.get('category')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100)
  const page = Math.max(parseInt(searchParams.get('page') ?? '1'), 1)
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = {}
  if (published !== null) where.published = published === 'true'
  if (category) where.category = category

  const [articles, total] = await Promise.all([
    prisma.article.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.article.count({ where }),
  ])

  return NextResponse.json({ articles, total, page, limit })
}
