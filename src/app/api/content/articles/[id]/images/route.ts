import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateApiKey } from '@/lib/apikey'

type Params = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  const apiKey = request.headers.get('x-api-key')
  if (!await validateApiKey(apiKey)) {
    return NextResponse.json({ error: 'Invalid or inactive API key.' }, { status: 401 })
  }

  const { id } = await params
  const images = await prisma.image.findMany({
    where: { articleId: id },
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(images)
}

export async function POST(request: NextRequest, { params }: Params) {
  const apiKey = request.headers.get('x-api-key')
  if (!await validateApiKey(apiKey)) {
    return NextResponse.json({ error: 'Invalid or inactive API key.' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const { url, alt, order } = body

  if (!url) {
    return NextResponse.json({ error: 'url is required.' }, { status: 400 })
  }

  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) {
    return NextResponse.json({ error: 'Article not found.' }, { status: 404 })
  }

  const image = await prisma.image.create({
    data: { url, alt: alt ?? null, order: order ?? 0, articleId: id },
  })

  // Set as coverImage if article has none
  if (!article.coverImage) {
    await prisma.article.update({ where: { id }, data: { coverImage: url } })
  }

  return NextResponse.json(image, { status: 201 })
}
