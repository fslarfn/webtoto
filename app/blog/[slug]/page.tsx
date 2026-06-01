import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSupabase } from '@/lib/supabase'
import { readDB } from '@/lib/db'
import type { Post } from '@/types'
import { SITE } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar } from 'lucide-react'
import BlogContent from '../components/BlogContent'

export const revalidate = 60

type Props = { params: { slug: string } }

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

async function getPost(slug: string): Promise<Post | null> {
  const sb = getSupabase()
  if (!sb) {
    return readDB<Post>('posts.json').find((p) => p.slug === slug && p.status === 'published') ?? null
  }
  const { data, error } = await sb
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (error || !data) return null
  return rowToPost(data)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <div className="pt-20 lg:pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog" className="flex items-center gap-2 text-[#7B3F00] text-sm font-medium mb-8 hover:underline">
          <ArrowLeft size={16} /> Kembali ke Blog
        </Link>

        {post.thumbnail && (
          <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
            <Image src={post.thumbnail} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <div className="mb-2">
          <span className="px-2 py-1 bg-[#E6A817] text-[#7B3F00] text-xs font-bold rounded-full">
            {post.category}
          </span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mt-3 mb-4 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Calendar size={14} />
          {new Date(post.createdAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>

        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-[#7B3F00]">
          <BlogContent content={post.content} />
        </div>

        <div className="mt-12 p-6 bg-[#F5EFE6] rounded-2xl text-center">
          <p className="font-semibold text-gray-900 mb-3">Tertarik dengan produk kami?</p>
          <a
            href={`https://wa.me/6281311912002?text=Halo, saya ingin konsultasi setelah membaca artikel: ${post.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#7B3F00] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#5a2e00] transition-colors"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
