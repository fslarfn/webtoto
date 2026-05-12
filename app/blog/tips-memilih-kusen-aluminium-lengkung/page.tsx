import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, MessageCircle } from 'lucide-react'
import { SITE, WA_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Tips Memilih Kusen Aluminium Lengkung yang Tepat',
  description:
    'Panduan lengkap memilih kusen aluminium lengkung yang tepat: pertimbangan kualitas profil, ukuran, merek, warna, dan garansi. Dari pabrik CV Toto Aluminium Manufacture Bekasi.',
  alternates: { canonical: `${SITE.url}/blog/tips-memilih-kusen-aluminium-lengkung` },
}

export default function ArticlePage() {
  return (
    <div className="pt-20 lg:pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#7B3F00]">Beranda</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#7B3F00]">Blog</Link>
          <span>/</span>
          <span className="text-gray-900">Tips Memilih Kusen</span>
        </nav>

        {/* Category */}
        <span className="px-3 py-1 bg-[#F9F6F2] text-[#7B3F00] text-xs font-bold rounded-full">
          Tips & Panduan
        </span>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-4 leading-tight">
          Tips Memilih Kusen Aluminium Lengkung yang Tepat untuk Rumah Anda
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            15 November 2024
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            5 menit baca
          </span>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
          <Image
            src="/images/product-arch-1.jpg"
            alt="Kusen jendela aluminium lengkung merah putih dua daun custom"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-lg leading-relaxed">
            Kusen aluminium lengkung semakin populer sebagai elemen arsitektur yang memberikan nilai
            estetika tinggi pada hunian modern, klasik, maupun mediterania. Namun, dengan banyaknya
            pilihan di pasaran, bagaimana cara memilih yang tepat?
          </p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">
            1. Pilih Ketebalan Profil yang Sesuai
          </h2>
          <p>
            Profil aluminium untuk kusen lengkung tersedia dalam berbagai ukuran, yang paling umum
            adalah <strong>3 inch (3&quot;)</strong> dan <strong>4 inch (4&quot;)</strong>. Profil 4&quot;
            lebih kokoh dan ideal untuk jendela/pintu besar atau area yang terkena angin kencang.
            Profil 3&quot; cukup untuk jendela berukuran sedang dan lebih hemat biaya.
          </p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">
            2. Perhatikan Merek Aluminium
          </h2>
          <p>
            Di Indonesia, terdapat beberapa merek profil aluminium yang umum digunakan:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Warna Umum (Standar):</strong> Harga paling terjangkau, cocok untuk proyek dengan budget terbatas namun tetap fungsional.</li>
            <li><strong>YKK:</strong> Merek Jepang dengan kualitas premium, ketahanan cat lebih lama, dan toleransi ukuran lebih presisi.</li>
            <li><strong>MF:</strong> Pilihan menengah dengan kualitas baik di harga yang lebih kompetitif dari YKK.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">
            3. Pertimbangkan Jenis Finishing dan Warna
          </h2>
          <p>
            Kusen aluminium tersedia dalam berbagai warna: putih, coklat, abu-abu, hitam, champagne,
            hingga finishing serat kayu. Pilih warna yang selaras dengan eksterior dan interior rumah
            Anda. Untuk hunian klasik, warna coklat dan champagne sangat cocok. Untuk modern minimalis,
            pilih hitam atau putih.
          </p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">
            4. Ukur dengan Tepat dan Konsultasikan Desain
          </h2>
          <p>
            Sebelum memesan, ukur bukaan dinding dengan teliti. Untuk kusen lengkung, Anda perlu
            menentukan radius lengkung, lebar total, dan tinggi. Jangan ragu untuk berkonsultasi
            dengan produsen karena kesalahan ukuran bisa berakibat fatal.
          </p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">
            5. Pastikan Ada Garansi Produk
          </h2>
          <p>
            Pilih produsen yang memberikan garansi terhadap cacat produksi. CV Toto Aluminium
            Manufacture memberikan garansi untuk setiap produk yang kami hasilkan dan siap
            membantu jika ada kendala.
          </p>

          <div className="mt-10 p-6 bg-[#F9F6F2] rounded-2xl border border-[#E6A817]/30">
            <h3 className="font-bold text-[#7B3F00] mb-2">Butuh Konsultasi Gratis?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Tim kami siap membantu Anda memilih kusen aluminium lengkung yang tepat untuk proyek Anda.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#7B3F00] text-white font-semibold rounded-xl hover:bg-[#6A3500] transition-colors text-sm"
            >
              <MessageCircle size={16} />
              Konsultasi via WhatsApp
            </a>
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#7B3F00] font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft size={18} />
            Kembali ke Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
