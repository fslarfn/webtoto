import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { getSupabase } from '@/lib/supabase'
import { readDB } from '@/lib/db'
import type { Post } from '@/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog — Tips & Panduan Kusen Aluminium Lengkung',
  description:
    'Artikel informatif seputar kusen aluminium lengkung: tips memilih, jenis profil, perawatan, dan inspirasi desain dari CV Toto Aluminium Manufacture.',
  alternates: { canonical: `${SITE.url}/blog` },
}

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

async function getPublishedPosts(): Promise<Post[]> {
  const sb = getSupabase()
  if (!sb) {
    return readDB<Post>('posts.json').filter((p) => p.status === 'published')
  }
  const { data, error } = await sb
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
  if (error) return []
  return (data || []).map(rowToPost)
}

export default async function BlogPage() {
  const articles = await getPublishedPosts()

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <div className="bg-[#7B3F00] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Blog & Artikel</h1>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto">
            Tips, panduan, dan inspirasi seputar kusen aluminium lengkung dari para ahli kami.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {articles.length === 0 && (
          <p className="text-center text-gray-500">Belum ada artikel yang dipublikasikan.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <Link href={`/blog/${article.slug}`}>
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {article.thumbnail && (
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-[#E6A817] text-[#7B3F00] text-xs font-bold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(article.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <Link href={`/blog/${article.slug}`}>
                  <h2 className="font-bold text-gray-900 text-base leading-tight mb-2 hover:text-[#7B3F00] transition-colors">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{article.excerpt}</p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="mt-4 flex items-center gap-1 text-[#7B3F00] font-semibold text-sm hover:gap-2 transition-all"
                >
                  Baca Selengkapnya
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
