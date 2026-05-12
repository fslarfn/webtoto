import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Blog — Tips & Panduan Kusen Aluminium Lengkung',
  description:
    'Artikel informatif seputar kusen aluminium lengkung: tips memilih, jenis profil, perawatan, dan inspirasi desain dari CV Toto Aluminium Manufacture.',
  alternates: { canonical: `${SITE.url}/blog` },
}

const articles = [
  {
    slug: 'tips-memilih-kusen-aluminium-lengkung',
    title: 'Tips Memilih Kusen Aluminium Lengkung yang Tepat untuk Rumah Anda',
    excerpt:
      'Kusen aluminium lengkung memberikan nilai estetika tinggi pada hunian. Namun, memilih yang tepat perlu mempertimbangkan kualitas profil, ukuran, dan kesesuaian dengan desain rumah.',
    image: '/images/product-arch-1.jpg',
    date: '2024-11-15',
    readTime: '5 menit',
    category: 'Tips & Panduan',
  },
  {
    slug: 'jenis-profil-aluminium-untuk-kusen-lengkung',
    title: 'Mengenal Jenis-Jenis Profil Aluminium untuk Kusen Lengkung: 3", 4", YKK, MF',
    excerpt:
      'Tidak semua profil aluminium sama. Pelajari perbedaan antara profil 3 inch dan 4 inch, serta merek YKK dan MF untuk menentukan mana yang paling sesuai untuk kebutuhan Anda.',
    image: '/images/product-circle-1.jpg',
    date: '2024-11-20',
    readTime: '7 menit',
    category: 'Edukasi Produk',
  },
  {
    slug: 'keunggulan-jendela-bulat-aluminium',
    title: 'Keunggulan Jendela Bulat Aluminium Custom untuk Estetika Hunian Modern',
    excerpt:
      'Jendela bulat atau circular window kini semakin populer. Ketahui mengapa banyak arsitek dan pemilik rumah memilih jendela bulat aluminium custom dari CV Toto Aluminium Manufacture.',
    image: '/images/product-circle-2.jpg',
    date: '2024-11-25',
    readTime: '6 menit',
    category: 'Inspirasi Desain',
  },
]

export default function BlogPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <Link href={`/blog/${article.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
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
                    {new Date(article.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {article.readTime}
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
