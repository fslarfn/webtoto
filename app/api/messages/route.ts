import { NextRequest, NextResponse } from 'next/server'
import { readDB, writeDB } from '@/lib/db'
import type { Message } from '@/types'
import { getToken } from 'next-auth/jwt'

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const messages = readDB<Message>('messages.json')
  return NextResponse.json(messages)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const messages = readDB<Message>('messages.json')

  const newMsg: Message = {
    id: Date.now().toString(),
    nama: body.nama || '',
    telepon: body.telepon || '',
    pesan: body.pesan || '',
    createdAt: new Date().toISOString(),
    status: 'baru',
  }

  messages.unshift(newMsg)
  writeDB('messages.json', messages)
  return NextResponse.json(newMsg, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const messages = readDB<Message>('messages.json')
  const idx = messages.findIndex((m) => m.id === body.id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (body.status) messages[idx].status = body.status
  if (body.delete) {
    messages.splice(idx, 1)
  }
  writeDB('messages.json', messages)
  return NextResponse.json({ ok: true })
}
