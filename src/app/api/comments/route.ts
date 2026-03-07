import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const comments = await db.comment.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(comments)
  } catch (error) {
    console.error('Comments GET error:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, country, content } = body

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'Comment is required' }, { status: 400 })
    }
    if (content.length > 1000) {
      return NextResponse.json({ error: 'Comment too long (max 1000 characters)' }, { status: 400 })
    }

    const comment = await db.comment.create({
      data: {
        name: name.trim(),
        content: content.trim(),
        country: country || 'Unknown',
      },
    })

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Comment POST error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
