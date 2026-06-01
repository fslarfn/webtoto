import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { readDB, writeDB } from '@/lib/db'
import type { Post } from '@/types'
import { getToken } from 'next-auth/jwt'

function rowToPost(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt || '',
    content: row.content || '',
    thumbnail: row.thumbnail || '',
    metaDescription: row.meta_description || '',
    status: row.status,
    createdAt: (row.created_at || '').split('T')[0],
    updatedAt: (row.updated_at || '').split('T')[0],
  }
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const sb = getSupabase()
  if (!sb) {
    const post = readDB<Post>('posts.json').find((p) => p.id === params.id || p.slug === params.id)
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  }
  try {
    const { data, error } = await sb
      .from('posts')
      .select('*')
      .or(`id.eq.${params.id},slug.eq.${params.id}`)
      .single()
    if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(rowToPost(data))
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sb = getSupabase()
  const body = await req.json()

  if (!sb) {
    const posts = readDB<Post>('posts.json')
    const idx = posts.findIndex((p) => p.id === params.id)
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    posts[idx] = { ...posts[idx], ...body, updatedAt: new Date().toISOString().split('T')[0] }
    writeDB('posts.json', posts)
    return NextResponse.json(posts[idx])
  }

  try {
    const { data, error } = await sb
      .from('posts')
      .update({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        meta_description: body.metaDescription,
        status: body.status,
        thumbnail: body.thumbnail,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(rowToPost(data))
  } catch (error: any) {
    console.error('PUT /api/posts/[id] error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sb = getSupabase()

  if (!sb) {
    const posts = readDB<Post>('posts.json').filter((p) => p.id !== params.id)
    writeDB('posts.json', posts)
    return NextResponse.json({ ok: true })
  }

  try {
    const { error } = await sb.from('posts').delete().eq('id', params.id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('DELETE /api/posts/[id] error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
