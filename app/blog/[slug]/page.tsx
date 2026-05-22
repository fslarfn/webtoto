import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { readDB } from '@/lib/db'
import type { Post } from '@/types'
import { SITE } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar } from 'lucide-react'

export const revalidate = 60

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const posts = readDB<Post>('posts.json')
  const post = posts.find((p) => p.slug === params.slug && p.status === 'published')
  if (!post) return {}
  return {
    title: post.title,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
  }
}

export default function BlogDetailPage({ params }: Props) {
  const posts = readDB<Post>('posts.json')
  const post = posts.find((p) => p.slug === params.slug && p.status === 'published')
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
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mt-6 mb-3">{line.slice(2)}</h1>
            if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-5 mb-2">{line.slice(3)}</h2>
            if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold mt-4 mb-2">{line.slice(4)}</h3>
            if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-4 text-gray-700">{line.slice(2)}</li>
            if (line.match(/^\d+\. /)) return <li key={i} className="ml-4 text-gray-700 list-decimal">{line.replace(/^\d+\. /, '')}</li>
            if (line === '') return <br key={i} />
            return (
              <p
                key={i}
                className="text-gray-700 leading-relaxed mb-3"
                dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>'),
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
