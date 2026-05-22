import { NextRequest, NextResponse } from 'next/server'
import { readDB, writeDB } from '@/lib/db'
import type { GalleryItem } from '@/types'
import { getToken } from 'next-auth/jwt'

export async function GET() {
  const items = readDB<GalleryItem>('gallery.json')
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const items = readDB<GalleryItem>('gallery.json')
  const newItem: GalleryItem = { id: Date.now().toString(), ...body }
  items.unshift(newItem)
  writeDB('gallery.json', items)
  return NextResponse.json(newItem, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const items = readDB<GalleryItem>('gallery.json')
  writeDB('gallery.json', items.filter((i) => i.id !== id))
  return NextResponse.json({ ok: true })
}
