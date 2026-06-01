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

export async function GET() {
  try {
    const sb = getSupabase()
    if (!sb) {
      return NextResponse.json(readDB<Post>('posts.json'))
    }
    const { data, error } = await sb
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json((data || []).map(rowToPost))
  } catch (error) {
    console.error('GET /api/posts error:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sb = getSupabase()
  const body = await req.json()

  if (!sb) {
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
    posts.unshift(newPost)
    writeDB('posts.json', posts)
    return NextResponse.json(newPost, { status: 201 })
  }

  try {
    const { data, error } = await sb
      .from('posts')
      .insert([{
        title: body.title || '',
        slug: body.slug || '',
        excerpt: body.excerpt || '',
        content: body.content || '',
        category: body.category || 'Tips',
        meta_description: body.metaDescription || '',
        status: body.status || 'draft',
        thumbnail: body.thumbnail || '',
      }])
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(rowToPost(data), { status: 201 })
  } catch (error: any) {
    console.error('POST /api/posts error:', error)
    return NextResponse.json({ error: error.message || 'Gagal menyimpan artikel' }, { status: 500 })
  }
}
