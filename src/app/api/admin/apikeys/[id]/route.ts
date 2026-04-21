import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

function checkAdminSecret(request: NextRequest): boolean {
  const secret = request.headers.get('x-admin-secret')
  return secret === process.env.ADMIN_SECRET
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  const { id } = await params

  await prisma.apiKey.update({
    where: { id },
    data: { isActive: false },
  })

  return NextResponse.json({ success: true })
}
