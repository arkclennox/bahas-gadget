import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdminSession } from '@/lib/adminauth'

type Params = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  if (!await validateAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const gadget = await prisma.gadget.findUnique({ where: { id } })
  if (!gadget) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  return NextResponse.json(gadget)
}

export async function PUT(request: NextRequest, { params }: Params) {
  if (!await validateAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  const data: Record<string, unknown> = {}
  const allowed = ['name', 'brand', 'slug', 'description', 'specs', 'rating', 'coverImage', 'category', 'published', 'ctaLinks']
  for (const key of allowed) {
    if (key in body) data[key] = body[key]
  }

  const gadget = await prisma.gadget.update({ where: { id }, data })
  return NextResponse.json(gadget)
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!await validateAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  await prisma.gadget.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
