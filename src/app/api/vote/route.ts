import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

async function getVoteStats() {
  const [yes, no, abstain, grouped] = await Promise.all([
    db.vote.count({ where: { type: 'yes' } }),
    db.vote.count({ where: { type: 'no' } }),
    db.vote.count({ where: { type: 'abstain' } }),
    db.vote.groupBy({
      by: ['country', 'type'],
      _count: { id: true },
    })
  ])

  const votesByCountry: Record<string, { yes: number; no: number; abstain: number }> = {}
  for (const row of grouped) {
    const country = row.country || 'Unknown'
    if (!votesByCountry[country]) {
      votesByCountry[country] = { yes: 0, no: 0, abstain: 0 }
    }
    votesByCountry[country][row.type as 'yes' | 'no' | 'abstain'] = row._count.id
  }

  return { yes, no, abstain, votesByCountry }
}

export async function GET() {
  try {
    const stats = await getVoteStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Vote GET error:', error)
    return NextResponse.json({ yes: 0, no: 0, abstain: 0, votesByCountry: {} })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { vote, country } = body

    if (!['yes', 'no', 'abstain'].includes(vote)) {
      return NextResponse.json({ error: 'Invalid vote' }, { status: 400 })
    }

    // --- 1. Cookie check (survives DB resets) ---
    const voteCookie = request.cookies.get('wv_voted')
    if (voteCookie?.value === '1') {
      const stats = await getVoteStats()
      return NextResponse.json({ error: 'Already voted', alreadyVoted: true, ...stats }, { status: 400 })
    }

    // --- 2. IP check (secondary layer) ---
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      null

    if (ip && ip !== 'unknown') {
      const existing = await db.vote.findFirst({ where: { ip } })
      if (existing) {
        const stats = await getVoteStats()
        // Set cookie so future checks are faster
        const response = NextResponse.json({ error: 'Already voted', alreadyVoted: true, ...stats }, { status: 400 })
        response.cookies.set('wv_voted', '1', {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 365 * 2, // 2 years
          sameSite: 'lax',
          path: '/',
        })
        return response
      }
    }

    // --- 3. Save the vote ---
    await db.vote.create({
      data: {
        type: vote,
        country: country || 'Unknown',
        ip: ip || 'unknown',
      },
    })

    const stats = await getVoteStats()

    // Set the voted cookie (HttpOnly, 2 years)
    const response = NextResponse.json({ ...stats, alreadyVoted: false })
    response.cookies.set('wv_voted', '1', {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365 * 2, // 2 years
      sameSite: 'lax',
      path: '/',
    })
    return response
  } catch (error) {
    console.error('Vote POST error:', error)
    return NextResponse.json({ yes: 0, no: 0, abstain: 0, votesByCountry: {} }, { status: 500 })
  }
}

// New: check-vote endpoint via GET with ?check=1
export async function HEAD(request: NextRequest) {
  const voteCookie = request.cookies.get('wv_voted')
  if (voteCookie?.value === '1') {
    return new NextResponse(null, { status: 200, headers: { 'x-voted': '1' } })
  }
  return new NextResponse(null, { status: 200, headers: { 'x-voted': '0' } })
}
