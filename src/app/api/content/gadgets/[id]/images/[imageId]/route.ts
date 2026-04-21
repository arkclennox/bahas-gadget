import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateApiKey } from '@/lib/apikey'

type Params = { params: Promise<{ id: string; imageId: string }> }

export async function DELETE(request: NextRequest, { params }: Params) {
  const apiKey = request.headers.get('x-api-key')
  if (!await validateApiKey(apiKey)) {
    return NextResponse.json({ error: 'Invalid or inactive API key.' }, { status: 401 })
  }

  const { imageId } = await params
  await prisma.image.delete({ where: { id: imageId } })
  return NextResponse.json({ success: true })
}
