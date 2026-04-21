import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = await params

  const article = await prisma.article.findFirst({
    where: { slug, published: true },
  })

  if (!article) {
    return NextResponse.json({ error: 'Article not found.' }, { status: 404 })
  }

  return NextResponse.json(article)
}
