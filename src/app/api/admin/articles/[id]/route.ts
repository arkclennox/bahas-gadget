import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdminSession } from '@/lib/adminauth'

type Params = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  if (!await validateAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  return NextResponse.json(article)
}

export async function PUT(request: NextRequest, { params }: Params) {
  if (!await validateAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  const data: Record<string, unknown> = {}
  const allowed = ['title', 'content', 'slug', 'excerpt', 'category', 'tags', 'coverImage', 'published', 'ctaLinks']
  for (const key of allowed) {
    if (key in body) data[key] = body[key]
  }

  if (data.published === true) {
    const existing = await prisma.article.findUnique({ where: { id }, select: { publishedAt: true } })
    if (!existing?.publishedAt) data.publishedAt = new Date()
  }

  const article = await prisma.article.update({ where: { id }, data })
  return NextResponse.json(article)
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!await validateAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  await prisma.article.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
