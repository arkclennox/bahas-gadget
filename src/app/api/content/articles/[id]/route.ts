import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateApiKey } from '@/lib/apikey'

type Params = { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, { params }: Params) {
  const apiKey = request.headers.get('x-api-key')
  if (!await validateApiKey(apiKey)) {
    return NextResponse.json({ error: 'Invalid or inactive API key.' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  const article = await prisma.article.update({
    where: { id },
    data: body,
  })

  return NextResponse.json(article)
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const apiKey = request.headers.get('x-api-key')
  if (!await validateApiKey(apiKey)) {
    return NextResponse.json({ error: 'Invalid or inactive API key.' }, { status: 401 })
  }

  const { id } = await params

  await prisma.article.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
