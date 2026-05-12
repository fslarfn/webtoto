'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SITE } from '@/lib/constants'

const faqs = [
  {
    q: 'Berapa harga kusen aluminium lengkung per meter?',
    a: 'Harga kusen aluminium lengkung mulai dari Rp 190.000/meter untuk profil 3 inch warna umum hingga Rp 370.000/meter untuk transome. Harga tergantung jenis profil, ukuran, merek (standar/YKK/MF), dan warna. Silakan cek halaman Harga kami atau hubungi WhatsApp untuk penawaran terbaik.',
  },
  {
    q: 'Apakah bisa memesan dengan ukuran custom?',
    a: 'Ya, kami menerima pesanan custom sesuai ukuran dan desain Anda. Kami mampu mengerjakan berbagai radius lengkung, ukuran non-standar, dan bentuk khusus. Konsultasikan desain Anda via WhatsApp dan kami siapkan penawaran sesuai kebutuhan.',
  },
  {
    q: 'Apakah bisa dikirim ke luar Bekasi/Jabodetabek?',
    a: 'Tentu bisa! Kami melayani pengiriman ke seluruh Indonesia menggunakan jasa ekspedisi terpercaya. Produk dikemas dengan aman menggunakan bahan pelindung khusus agar tiba dalam kondisi sempurna. Ongkos kirim dihitung berdasarkan berat, dimensi, dan tujuan.',
  },
  {
    q: 'Berapa lama waktu produksi kusen aluminium lengkung?',
    a: 'Waktu produksi standar adalah 7–14 hari kerja tergantung kompleksitas desain dan volume pesanan. Untuk pesanan dalam jumlah besar atau desain kompleks bisa membutuhkan waktu lebih. Kami selalu memberikan estimasi waktu yang jelas di awal sebelum Anda konfirmasi order.',
  },
  {
    q: 'Apakah produk dilengkapi garansi?',
    a: 'Ya, setiap produk kami bergaransi terhadap cacat produksi. Kami berkomitmen untuk memberikan produk berkualitas dan siap membantu jika ada masalah setelah penerimaan barang. Hubungi kami via WhatsApp untuk klaim garansi.',
  },
]

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="py-16 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <hr className="section-divider" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-10">
          <h2 className="section-title">Pertanyaan yang Sering Ditanyakan</h2>
          <p className="mt-3 text-center" style={{ color: '#6B5B4E' }}>
            Tidak menemukan jawaban? Hubungi kami di WhatsApp{' '}
            <span className="font-semibold" style={{ color: '#7B3F00' }}>{SITE.phone}</span>
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden transition-colors"
              style={{ border: `1px solid ${openIdx === idx ? '#7B3F00' : '#E8D5B7'}` }}
            >
              <button
                className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left transition-colors"
                style={{ backgroundColor: openIdx === idx ? '#F5EFE6' : 'white' }}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="font-semibold text-sm sm:text-base" style={{ color: '#1A1A1A' }}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className="flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: '#7B3F00',
                    transform: openIdx === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              {openIdx === idx && (
                <div
                  className="px-5 pb-4 text-sm leading-relaxed pt-3"
                  style={{ color: '#6B5B4E', borderTop: '1px solid #E8D5B7' }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
