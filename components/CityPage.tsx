import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ChevronDown, MapPin } from 'lucide-react'
import { WA_URL, SITE } from '@/lib/constants'

interface FAQ {
  q: string
  a: string
}

interface CityPageProps {
  city: string
  province: string
  slug: string
  h1: string
  description: string
  faqs: FAQ[]
}

export default function CityPage({ city, province, slug, h1, description, faqs }: CityPageProps) {
  const waMsg = `Halo, saya dari ${city}. Ingin konsultasi tentang kusen aluminium lengkung.`
  const waUrl = `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(waMsg)}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: `Kusen Aluminium Lengkung ${city}`, item: `${SITE.url}/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="pt-20 lg:pt-24">
        {/* Hero */}
        <div className="relative min-h-[50vh] flex items-center">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-all-products.jpg"
              alt={`Kusen aluminium lengkung custom ${city} ${province}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-[#E6A817]" />
              <span className="text-[#E6A817] text-sm font-semibold">Melayani {city} & Sekitarnya</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
              {h1}
            </h1>
            <p className="text-gray-200 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#7B3F00] text-white font-bold rounded-xl hover:bg-[#6A3500] transition-colors"
              >
                <MessageCircle size={20} />
                Konsultasi Gratis dari {city}
              </a>
              <Link
                href="/harga"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#7B3F00] font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Lihat Daftar Harga
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-[#7B3F00] mb-4">
              Kusen Aluminium Lengkung Custom untuk {city}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              CV Toto Aluminium Manufacture melayani pemesanan kusen aluminium lengkung untuk wilayah{' '}
              <strong>{city}</strong> dan sekitarnya. Dengan pabrik berlokasi di Bekasi, kami mampu
              mengirimkan produk ke {city} dalam waktu yang efisien menggunakan ekspedisi terpercaya.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kami menyediakan berbagai jenis kusen aluminium lengkung custom, mulai dari jendela
              bulat, kusen jendela arch, kusen pintu lengkung, openback, hingga transome/curtainwall.
              Semua produk bisa disesuaikan dengan desain, ukuran, warna, dan merek aluminium yang
              Anda inginkan.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Harga kami sangat kompetitif karena langsung dari produsen tanpa perantara. Mulai dari
              Rp 190.000/meter untuk profil standar. Konsultasi gratis via WhatsApp untuk mendapatkan
              penawaran terbaik sesuai kebutuhan proyek Anda di {city}.
            </p>
          </div>

          {/* Product Images */}
          <div className="grid grid-cols-2 gap-4 my-10">
            <div className="relative h-48 rounded-xl overflow-hidden">
              <Image
                src="/images/product-circle-1.jpg"
                alt={`Jendela bulat custom aluminium untuk ${city}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-xl overflow-hidden">
              <Image
                src="/images/product-arch-1.jpg"
                alt={`Kusen jendela lengkung aluminium untuk ${city}`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* FAQs */}
          <h2 className="text-2xl font-bold text-[#7B3F00] mb-6">FAQ — Layanan di {city}</h2>
          <div className="space-y-3 mb-10">
            {faqs.map((faq, idx) => (
              <details key={idx} className="border border-gray-200 rounded-xl overflow-hidden group">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer hover:bg-[#F9F6F2] transition-colors list-none">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown size={20} className="flex-shrink-0 text-[#7B3F00] group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-4 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#7B3F00] rounded-2xl p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">
              Pesan Kusen Aluminium Lengkung dari {city}?
            </h3>
            <p className="text-amber-100 mb-5 text-sm">
              Konsultasi gratis, respon cepat via WhatsApp. Kami siap membantu proyek Anda.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#7B3F00] text-white font-bold rounded-xl hover:bg-[#6A3500] transition-colors"
            >
              <MessageCircle size={18} />
              Chat WhatsApp Sekarang
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
