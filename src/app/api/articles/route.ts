import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const tag = searchParams.get('tag')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100)
  const page = Math.max(parseInt(searchParams.get('page') ?? '1'), 1)
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = { published: true }
  if (category) where.category = category
  if (tag) where.tags = { has: tag }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({ where, skip, take: limit, orderBy: { publishedAt: 'desc' } }),
    prisma.article.count({ where }),
  ])

  return NextResponse.json({ articles, total, page, limit })
}
