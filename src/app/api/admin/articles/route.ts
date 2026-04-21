import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdminSession } from '@/lib/adminauth'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function GET() {
  if (!await validateAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, title: true, slug: true, category: true,
      published: true, publishedAt: true, createdAt: true,
    },
  })

  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  if (!await validateAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { title, content, slug, excerpt, category, tags, coverImage, published, ctaLinks } = body

  if (!title || !content) {
    return NextResponse.json({ error: 'title and content are required.' }, { status: 400 })
  }

  const article = await prisma.article.create({
    data: {
      title,
      content,
      slug: slug || generateSlug(title),
      excerpt: excerpt ?? null,
      category: category ?? null,
      tags: Array.isArray(tags) ? tags : [],
      coverImage: coverImage ?? null,
      published: published ?? false,
      publishedAt: published ? new Date() : null,
      ctaLinks: ctaLinks ?? null,
    },
  })

  return NextResponse.json(article, { status: 201 })
}
