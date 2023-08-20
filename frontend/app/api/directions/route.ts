import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ROUTE
  const url = new URL(request.url)
  const originId = url.searchParams.get('originId')
  const destinationId = url.searchParams.get('destinationId')
  const response = await fetch(
    `${apiBaseUrl}/directions?originId=${originId}&destinationId=${destinationId}`,
    {
      next: {
        revalidate: 60,
      },
    },
  )
  return NextResponse.json(await response.json())
}
