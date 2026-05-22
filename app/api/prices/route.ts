import { NextRequest, NextResponse } from 'next/server'
import { readDB, writeDB } from '@/lib/db'
import type { Price } from '@/types'
import { getToken } from 'next-auth/jwt'

export async function GET() {
  const prices = readDB<Price>('prices.json')
  return NextResponse.json(prices)
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  writeDB('prices.json', body)
  return NextResponse.json({ ok: true })
}
