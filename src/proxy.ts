import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Protect all /api/content/* routes — require x-api-key header
  if (request.nextUrl.pathname.startsWith('/api/content')) {
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key required. Provide via x-api-key header.' },
        { status: 401 }
      )
    }
    // Full API key validation happens in each route handler
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/content/:path*'],
}
