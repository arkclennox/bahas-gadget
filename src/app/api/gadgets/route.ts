import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const brand = searchParams.get('brand')
  const category = searchParams.get('category')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100)
  const page = Math.max(parseInt(searchParams.get('page') ?? '1'), 1)
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = { published: true }
  if (brand) where.brand = { equals: brand, mode: 'insensitive' }
  if (category) where.category = category

  const [gadgets, total] = await Promise.all([
    prisma.gadget.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.gadget.count({ where }),
  ])

  return NextResponse.json({ gadgets, total, page, limit })
}
