import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, MessageCircle } from 'lucide-react'
import { SITE, WA_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Jenis Profil Aluminium untuk Kusen Lengkung: 3", 4", YKK, MF',
  description:
    'Panduan lengkap mengenal jenis profil aluminium untuk kusen lengkung — perbandingan ukuran 3" vs 4" dan merek YKK vs MF vs standar. CV Toto Aluminium Manufacture Bekasi.',
  alternates: { canonical: `${SITE.url}/blog/jenis-profil-aluminium-untuk-kusen-lengkung` },
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
          <span className="text-gray-900">Jenis Profil Aluminium</span>
        </nav>

        <span className="px-3 py-1 bg-[#F9F6F2] text-[#7B3F00] text-xs font-bold rounded-full">
          Edukasi Produk
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-4 leading-tight">
          Mengenal Jenis-Jenis Profil Aluminium untuk Kusen Lengkung: 3&quot;, 4&quot;, YKK, MF
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-1.5"><Calendar size={14} /> 20 November 2024</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> 7 menit baca</span>
        </div>

        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
          <Image
            src="/images/product-circle-1.jpg"
            alt="Jendela bulat aluminium custom dengan profil berkualitas"
            fill className="object-cover" priority
          />
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-lg leading-relaxed">
            Memilih profil aluminium yang tepat adalah kunci keberhasilan sebuah proyek kusen lengkung.
            Ada dua aspek utama yang perlu dipahami: <strong>ukuran profil</strong> dan <strong>merek aluminium</strong>.
          </p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">Ukuran Profil: 3 Inch vs 4 Inch</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-[#7B3F00] text-white">
                  <th className="border border-gray-200 px-4 py-2 text-left">Aspek</th>
                  <th className="border border-gray-200 px-4 py-2">Profil 3&quot;</th>
                  <th className="border border-gray-200 px-4 py-2">Profil 4&quot;</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Lebar profil', '~75mm', '~100mm'],
                  ['Kekuatan', 'Standar', 'Lebih kuat'],
                  ['Cocok untuk', 'Jendela kecil-sedang', 'Jendela/pintu besar'],
                  ['Harga', 'Lebih hemat', 'Sedikit lebih mahal'],
                  ['Berat', 'Lebih ringan', 'Lebih berat'],
                ].map(([a, b, c]) => (
                  <tr key={a} className="odd:bg-white even:bg-[#F9F6F2]">
                    <td className="border border-gray-200 px-4 py-2 font-medium">{a}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{b}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">Perbandingan Merek: Standar vs YKK vs MF</h2>
          <h3 className="font-semibold text-gray-900 mt-4 mb-2">Warna Umum (Standar)</h3>
          <p>Profil aluminium standar dengan harga paling ekonomis. Cocok untuk proyek perumahan dengan budget terbatas. Kualitas memadai untuk penggunaan residensial normal.</p>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">YKK</h3>
          <p>Merek Jepang yang sudah terkenal kualitasnya. Toleransi produksi sangat presisi, lapisan anodize lebih tebal sehingga lebih tahan korosi dan perubahan warna. Pilihan terbaik untuk proyek premium dan komersial.</p>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">MF</h3>
          <p>Pilihan menengah yang menawarkan kualitas baik dengan harga lebih terjangkau dari YKK. Populer untuk proyek perumahan menengah atas yang ingin kualitas lebih baik dari standar tanpa harga premium YKK.</p>

          <h2 className="text-xl font-bold text-[#7B3F00] mt-8 mb-3">Rekomendasi Kami</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Rumah pribadi, budget terbatas:</strong> Standar 3&quot; atau 4&quot;</li>
            <li><strong>Rumah premium/villa:</strong> YKK 4&quot; dengan finishing warna pilihan</li>
            <li><strong>Ruko/komersial kecil:</strong> MF 4&quot; untuk keseimbangan kualitas-harga</li>
            <li><strong>Gedung/hotel:</strong> YKK 4&quot; dengan curtainwall system</li>
          </ul>

          <div className="mt-10 p-6 bg-[#F9F6F2] rounded-2xl border border-[#E6A817]/30">
            <h3 className="font-bold text-[#7B3F00] mb-2">Masih Bingung Pilih yang Mana?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Konsultasikan kebutuhan Anda dengan tim kami. Gratis dan tanpa komitmen.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#7B3F00] text-white font-semibold rounded-xl hover:bg-[#6A3500] transition-colors text-sm">
              <MessageCircle size={16} />
              Konsultasi via WhatsApp
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
