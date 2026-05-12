import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, MessageCircle } from 'lucide-react'
import { SITE, WA_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Keunggulan Jendela Bulat Aluminium Custom untuk Hunian Modern',
  description:
    'Kenapa jendela bulat aluminium custom semakin populer? Pelajari keunggulan estetika, fungsional, dan nilai properti dari jendela circular aluminium. CV Toto Aluminium Manufacture Bekasi.',
  alternates: { canonical: `${SITE.url}/blog/keunggulan-jendela-bulat-aluminium` },
}

export default function ArticlePage() {
  return (
    <div className="pt-20 lg:pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#7B3F00]">Beranda</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#7B3F00]">Blog</Link>
          <span>/</span>
          <span className="text-gray-900">Jendela Bulat Aluminium</span>
        </nav>

        <span className="px-3 py-1 bg-[#F9F6F2] text-[#7B3F00] text-xs font-bold rounded-full">
          Inspirasi Desain
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-4 leading-tight">
          Keunggulan Jendela Bulat Aluminium Custom untuk Estetika Hunian Modern
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-1.5"><Calendar size={14} /> 25 November 2024</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> 6 menit baca</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <Image src="/images/product-circle-1.jpg" alt="Jendela bulat custom aluminium teal sudut kiri" fill className="object-cover" priority />
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <Image src="/images/product-circle-2.jpg" alt="Jendela bulat custom aluminium tampak depan" fill className="object-cover" />
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-lg leading-relaxed">
            Jendela bulat atau <em>circular window</em> adalah elemen arsitektur yang telah digunakan
            sejak zaman Romawi kuno. Kini, dengan teknologi aluminium modern, jendela bulat custom
            kembali hadir dengan tampilan lebih elegan dan perawatan yang lebih mudah.
          </p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">1. Nilai Estetika yang Tinggi</h2>
          <p>
            Jendela bulat memberikan focal point visual yang kuat pada fasad bangunan. Bentuk lingkaran
            yang sempurna menciptakan kesan mewah dan artistik yang sulit dicapai dengan jendela
            persegi biasa. Cocok untuk gaya arsitektur mediterania, klasik Eropa, hingga modern kontemporer.
          </p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">2. Masuknya Cahaya Alami Optimal</h2>
          <p>
            Bentuk bulat memaksimalkan masuknya cahaya dari berbagai sudut. Jendela bulat di posisi
            atas dinding atau di area tangga memberikan pencahayaan alami yang dramatis dan mengurangi
            ketergantungan pada lampu di siang hari.
          </p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">3. Dapat Dikustomisasi Sepenuhnya</h2>
          <p>
            Salah satu keunggulan utama jendela bulat aluminium dari CV Toto adalah kemampuan
            kustomisasi penuh. Diameter bisa disesuaikan dari yang kecil (50cm) hingga besar (200cm+),
            dengan berbagai pilihan warna dan finishing.
          </p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">4. Tahan Cuaca dan Mudah Dirawat</h2>
          <p>
            Aluminium tidak berkarat, tidak lapuk, dan tahan terhadap perubahan cuaca ekstrem.
            Berbeda dengan jendela kayu yang perlu pengecatan ulang, jendela bulat aluminium cukup
            dilap dengan kain lembab untuk tetap bersih dan berkilau.
          </p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">5. Meningkatkan Nilai Properti</h2>
          <p>
            Rumah dengan detail arsitektur unik seperti jendela bulat cenderung memiliki nilai jual
            lebih tinggi. Investasi pada kusen aluminium berkualitas adalah investasi jangka panjang
            yang meningkatkan nilai aset properti Anda.
          </p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">Tips Memilih Jendela Bulat Aluminium</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sesuaikan diameter dengan proporsi dinding agar tidak terkesan terlalu dominan atau terlalu kecil</li>
            <li>Pilih warna frame yang kontras dengan warna dinding untuk efek visual maksimal</li>
            <li>Pastikan posisi jendela tidak terhalang atap atau struktur lain agar cahaya masuk optimal</li>
            <li>Untuk privasi, pilih kaca frosted atau one-way mirror</li>
          </ul>

          <div className="mt-10 p-6 bg-[#F9F6F2] rounded-2xl border border-[#E6A817]/30">
            <h3 className="font-bold text-[#7B3F00] mb-2">Tertarik Pasang Jendela Bulat?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Konsultasikan desain dan ukuran jendela bulat custom Anda dengan tim kami. Gratis!
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#7B3F00] text-white font-semibold rounded-xl hover:bg-[#6A3500] transition-colors text-sm">
              <MessageCircle size={16} />
              Konsultasi Sekarang
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#7B3F00] font-semibold hover:gap-3 transition-all">
            <ArrowLeft size={18} />
            Kembali ke Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
