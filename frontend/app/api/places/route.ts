import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ROUTE
  const url = new URL(request.url)
  const text = url.searchParams.get('text')
  const response = await fetch(`${apiBaseUrl}/places?text=${text}`, {
    next: {
      revalidate: 60,
    },
  })
  return NextResponse.json(await response.json())
}
