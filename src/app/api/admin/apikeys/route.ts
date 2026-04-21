import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

function checkAdminSecret(request: NextRequest): boolean {
  const secret = request.headers.get('x-admin-secret')
  return secret === process.env.ADMIN_SECRET
}

export async function GET(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  const keys = await prisma.apiKey.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const masked = keys.map(k => ({
    ...k,
    key: k.key.slice(0, 8) + '****',
  }))

  return NextResponse.json(masked)
}

export async function POST(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  const { label } = await request.json()
  if (!label) {
    return NextResponse.json({ error: 'label is required.' }, { status: 400 })
  }

  const key = `bgk_${nanoid(32)}`

  const apiKey = await prisma.apiKey.create({
    data: { key, label },
  })

  // Return full key only once
  return NextResponse.json({ ...apiKey, key }, { status: 201 })
}
