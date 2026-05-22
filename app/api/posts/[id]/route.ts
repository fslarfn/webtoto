import { NextRequest, NextResponse } from 'next/server'
import { readDB, writeDB } from '@/lib/db'
import type { Post } from '@/types'
import { getToken } from 'next-auth/jwt'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const posts = readDB<Post>('posts.json')
  const post = posts.find((p) => p.id === params.id)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const posts = readDB<Post>('posts.json')
  const idx = posts.findIndex((p) => p.id === params.id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  posts[idx] = { ...posts[idx], ...body, updatedAt: new Date().toISOString().split('T')[0] }
  writeDB('posts.json', posts)
  return NextResponse.json(posts[idx])
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const posts = readDB<Post>('posts.json')
  const filtered = posts.filter((p) => p.id !== params.id)
  writeDB('posts.json', filtered)
  return NextResponse.json({ ok: true })
}
