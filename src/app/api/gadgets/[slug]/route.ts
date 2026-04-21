import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = await params

  const gadget = await prisma.gadget.findFirst({
    where: { slug, published: true },
  })

  if (!gadget) {
    return NextResponse.json({ error: 'Gadget not found.' }, { status: 404 })
  }

  return NextResponse.json(gadget)
}
