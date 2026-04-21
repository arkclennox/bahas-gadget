import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateApiKey } from '@/lib/apikey'

function generateSlug(name: string, brand: string): string {
  return `${brand}-${name}`
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
  const { name, brand, slug, description, specs, price, rating, coverImage, category, published } = body

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
      price: price ?? null,
      rating: rating ?? null,
      coverImage: coverImage ?? null,
      category: category ?? null,
      published: published ?? false,
    },
  })

  return NextResponse.json(gadget, { status: 201 })
}

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  if (!await validateApiKey(apiKey)) {
    return NextResponse.json({ error: 'Invalid or inactive API key.' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const brand = searchParams.get('brand')
  const category = searchParams.get('category')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100)
  const page = Math.max(parseInt(searchParams.get('page') ?? '1'), 1)
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = {}
  if (brand) where.brand = { equals: brand, mode: 'insensitive' }
  if (category) where.category = category

  const [gadgets, total] = await Promise.all([
    prisma.gadget.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.gadget.count({ where }),
  ])

  return NextResponse.json({ gadgets, total, page, limit })
}
