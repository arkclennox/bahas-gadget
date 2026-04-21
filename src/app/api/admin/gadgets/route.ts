import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdminSession } from '@/lib/adminauth'

function generateSlug(name: string, brand: string): string {
  return `${brand}-${name}`
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

  const gadgets = await prisma.gadget.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, name: true, brand: true, slug: true,
      category: true, rating: true, published: true, createdAt: true,
    },
  })

  return NextResponse.json(gadgets)
}

export async function POST(request: NextRequest) {
  if (!await validateAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, brand, slug, description, specs, rating, coverImage, category, published, ctaLinks } = body

  if (!name || !brand) {
    return NextResponse.json({ error: 'name and brand are required.' }, { status: 400 })
  }

  const gadget = await prisma.gadget.create({
    data: {
      name,
      brand,
      slug: slug || generateSlug(name, brand),
      description: description ?? null,
      specs: specs ?? null,
      rating: rating ?? null,
      coverImage: coverImage ?? null,
      category: category ?? null,
      published: published ?? false,
      ctaLinks: ctaLinks ?? null,
    },
  })

  return NextResponse.json(gadget, { status: 201 })
}
