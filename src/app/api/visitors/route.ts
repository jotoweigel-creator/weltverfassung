import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Upsert: count each IP only once
    await db.visitor.upsert({
      where: { ip },
      create: { ip },
      update: {},
    })

    const count = await db.visitor.count()
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Visitor error:', error)
    return NextResponse.json({ count: 0 })
  }
}
