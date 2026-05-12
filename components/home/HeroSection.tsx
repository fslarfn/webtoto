import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Award, MapPin, Shield, Truck } from 'lucide-react'
import { WA_URL } from '@/lib/constants'

const badges = [
  { icon: Award, text: '500+ Proyek' },
  { icon: Shield, text: '10+ Tahun' },
  { icon: MapPin, text: 'Garansi Produk' },
  { icon: Truck, text: 'Se-Indonesia' },
]

function WaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function HeroSection() {
  return (
    <section className="relative flex items-center pt-16 lg:pt-20 overflow-hidden min-h-[600px] lg:min-h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-all-products.jpg"
          alt="Produk kusen aluminium lengkung custom CV Toto Aluminium Manufacture Bekasi"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-16 sm:py-20 w-full">
        <div className="max-w-xl lg:max-w-2xl">

          {/* Badge */}
          <span className="inline-block mb-5 px-3 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider bg-[#D4A853] text-[#2C1810]">
            Harga Langsung Pabrik
          </span>

          {/* H1 */}
          <h1 className="text-[2rem] sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-5">
            Produsen Kusen Aluminium{' '}
            <span className="text-[#D4A853]">Lengkung</span>{' '}
            Terpercaya Se-Indonesia
          </h1>

          <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed">
            Menyediakan berbagai kebutuhan kusen dan pintu aluminium lengkung custom.{' '}
            <strong className="text-white">Bekasi</strong> · Melayani seluruh Indonesia
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#7B3F00] hover:bg-[#6A3500] text-white font-bold text-base rounded-xl shadow-lg transition-colors"
            >
              <WaIcon />
              Konsultasi GRATIS via WhatsApp
            </a>
            <Link
              href="/produk"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-gray-100 text-[#7B3F00] font-bold text-base rounded-xl shadow-lg transition-colors border-2 border-white"
            >
              Lihat Produk Kami
              <ChevronRight size={20} />
            </Link>
          </div>

          {/* Trust Badges — 2x2 grid on mobile, 1 row desktop */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
            {badges.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-3 py-2"
              >
                <Icon size={15} className="text-[#D4A853]" />
                <span className="text-white text-xs sm:text-sm font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
