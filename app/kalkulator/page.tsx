import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import { WA_URL, SITE } from '@/lib/constants'
import { readDB } from '@/lib/db'
import type { Price } from '@/types'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import BendingCalculator, { type CalcProduct } from '@/components/kalkulator/BendingCalculator'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Kalkulator Kusen Aluminium Lengkung — Hitung Kebutuhan Material',
  description:
    'Hitung sendiri kebutuhan material kusen aluminium lengkung Anda. Masukkan ukuran lebar & tinggi, dapatkan hasil langsung, lalu tanyakan harga via WhatsApp. Gratis, tanpa perlu daftar.',
  alternates: { canonical: `${SITE.url}/kalkulator` },
}

/** Daftar nama produk untuk dropdown — dari data admin, tanpa harga. */
function buildProducts(): CalcProduct[] {
  const prices = readDB<Price>('prices.json')
  return prices.map((p) => ({ id: p.id, produk: p.produk }))
}

export default function KalkulatorPage() {
  const products = buildProducts()
  const crumbs = breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Kalkulator', url: `${SITE.url}/kalkulator` },
  ])

  return (
    <div className="pt-20 lg:pt-24">
      <JsonLd schema={crumbs} />

      {/* Header */}
      <div className="bg-[#7B3F00] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Kalkulator Kusen Aluminium Lengkung
          </h1>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto">
            Hitung kebutuhan material bending Anda secara instan — pakai rumus yang sama dengan
            yang kami gunakan di pabrik. Untuk harga, tinggal tanya via WhatsApp.
          </p>
        </div>
      </div>

      {/* Kalkulator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <BendingCalculator products={products} />
      </div>

      {/* Penjelasan metode */}
      <div className="bg-[#F9F6F2] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Cara Kerja Perhitungannya</h2>
          <p className="section-subtitle">
            Kebutuhan material bending dihitung dari bentuk lengkungan yang Anda inginkan.
            Ada tiga metode sesuai bentuknya:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="card p-6">
              <div className="text-xs font-mono text-[#A89680] mb-2">METODE 1</div>
              <h3 className="font-bold text-[#1A1A1A] mb-2">Kurang dari ½ lingkaran</h3>
              <p className="text-sm text-[#6B5B4E] leading-relaxed">
                Lengkungan dangkal di bagian atas kusen — tinggi lengkungan kurang dari setengah
                lebar. Material dihitung: lebar + tinggi + 30 cm sambungan.
              </p>
            </div>
            <div className="card p-6">
              <div className="text-xs font-mono text-[#A89680] mb-2">METODE 2</div>
              <h3 className="font-bold text-[#1A1A1A] mb-2">Setengah lingkaran pas</h3>
              <p className="text-sm text-[#6B5B4E] leading-relaxed">
                Lengkungan setengah lingkaran sempurna — tinggi tepat setengah lebar. Material
                dihitung dari keliling busur: (lebar ÷ 2) × 3,14 + 30 cm sambungan.
              </p>
            </div>
            <div className="card p-6">
              <div className="text-xs font-mono text-[#A89680] mb-2">METODE 3</div>
              <h3 className="font-bold text-[#1A1A1A] mb-2">Lebih dari ½ lingkaran</h3>
              <p className="text-sm text-[#6B5B4E] leading-relaxed">
                Bentuk pintu/jendela arch dengan sisi tegak — tinggi melebihi setengah lebar.
                Busur ditambah dua sisi lurus, plus 30 cm sambungan. Di atas 6 m otomatis
                ditambah 30 cm lagi.
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-[#6B5B4E] mt-8 max-w-2xl mx-auto">
            Bingung pilih metode yang mana? Kirim saja foto atau sketsa desain Anda ke WhatsApp
            kami — tim kami bantu hitungkan gratis.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#7B3F00] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Sudah Tahu Ukurannya?</h2>
          <p className="text-amber-100 mb-6">
            Kirim hasil perhitungan Anda via WhatsApp — tim kami balas dengan penawaran harga,
            pilihan warna, dan estimasi waktu pengerjaan.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7B3F00] font-bold rounded-xl hover:bg-[#F5EFE6] transition-colors"
          >
            <MessageCircle size={20} />
            Konsultasi GRATIS via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
