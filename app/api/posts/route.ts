import { NextRequest, NextResponse } from 'next/server'
import { readDB, writeDB } from '@/lib/db'
import type { Post } from '@/types'
import { getToken } from 'next-auth/jwt'

export async function GET() {
  const posts = readDB<Post>('posts.json')
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const posts = readDB<Post>('posts.json')

  const newPost: Post = {
    id: Date.now().toString(),
    title: body.title || '',
    slug: body.slug || '',
    category: body.category || 'Tips',
    excerpt: body.excerpt || '',
    content: body.content || '',
    thumbnail: body.thumbnail || '',
    metaDescription: body.metaDescription || '',
    status: body.status || 'draft',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  }

  posts.push(newPost)
  writeDB('posts.json', posts)
  return NextResponse.json(newPost, { status: 201 })
}
