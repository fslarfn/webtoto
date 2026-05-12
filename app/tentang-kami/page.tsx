import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, Users, Target, Heart } from 'lucide-react'
import { SITE, WA_URL } from '@/lib/constants'
import { MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tentang Kami — CV Toto Aluminium Manufacture',
  description:
    'Kenali lebih jauh CV Toto Aluminium Manufacture, produsen kusen aluminium lengkung terpercaya di Bekasi dengan pengalaman lebih dari 10 tahun melayani seluruh Indonesia.',
  alternates: { canonical: `${SITE.url}/tentang-kami` },
}

const values = [
  {
    icon: Award,
    title: 'Kualitas Terjamin',
    desc: 'Setiap produk melalui quality control ketat sebelum keluar dari pabrik kami.',
  },
  {
    icon: Users,
    title: 'Pelayanan Prima',
    desc: 'Tim kami siap membantu dari konsultasi desain hingga pengiriman ke lokasi Anda.',
  },
  {
    icon: Target,
    title: 'Presisi Tinggi',
    desc: 'Proses produksi menggunakan mesin modern untuk hasil yang akurat dan konsisten.',
  },
  {
    icon: Heart,
    title: 'Kepuasan Pelanggan',
    desc: 'Lebih dari 500 proyek berhasil kami selesaikan dengan tingkat kepuasan 4.9/5.',
  },
]

export default function TentangKamiPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <div className="bg-[#7B3F00] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Tentang Kami</h1>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto">
            Lebih dari 10 tahun menjadi produsen kusen aluminium lengkung terpercaya di Indonesia.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#E6A817] font-semibold text-sm uppercase tracking-wider">
                Sejarah Kami
              </span>
              <h2 className="text-3xl font-bold text-[#7B3F00] mt-2 mb-5">
                Dari Bengkel Kecil Hingga Pabrik Aluminium Terpercaya
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  CV Toto Aluminium Manufacture lahir dari semangat untuk menghadirkan kusen
                  aluminium berkualitas tinggi dengan harga yang terjangkau. Berawal dari bengkel
                  kecil di Bekasi lebih dari satu dekade lalu, kini kami telah berkembang menjadi
                  salah satu produsen kusen aluminium lengkung terpercaya di Indonesia.
                </p>
                <p>
                  Keunggulan kami terletak pada spesialisasi produk kusen aluminium berbentuk
                  lengkung (arch) dan bulat (circle) yang tidak banyak dikerjakan produsen lain.
                  Dengan mesin modern dan tenaga ahli berpengalaman, kami mampu mengerjakan berbagai
                  bentuk custom sesuai kebutuhan arsitek, kontraktor, maupun pemilik rumah.
                </p>
                <p>
                  Lokasi pabrik kami di Jl. Rawa Mulya No.15, Mustika Jaya, Bekasi, memungkinkan
                  kami untuk melayani pengiriman ke seluruh wilayah Indonesia dengan efisien.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/logo-full.png"
                alt="CV Toto Aluminium Manufacture logo resmi"
                width={400}
                height={200}
                className="w-full max-w-sm object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#F9F6F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#7B3F00]">Nilai-Nilai Kami</h2>
            <p className="text-gray-600 mt-3">
              Prinsip yang menjadi fondasi setiap produk dan layanan kami.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl shadow-md text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F9F6F2] mb-4">
                  <Icon size={28} className="text-[#7B3F00]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#7B3F00]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '10+', label: 'Tahun Pengalaman' },
              { number: '500+', label: 'Proyek Selesai' },
              { number: '34', label: 'Provinsi Dilayani' },
              { number: '4.9/5', label: 'Rating Pelanggan' },
            ].map(({ number, label }) => (
              <div key={label}>
                <div className="text-4xl font-black text-[#E6A817] mb-2">{number}</div>
                <div className="text-white text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#7B3F00] mb-4">
            Ingin Bermitra dengan Kami?
          </h2>
          <p className="text-gray-600 mb-6">
            Hubungi kami untuk konsultasi gratis. Kami melayani kontraktor, developer, arsitek, dan
            pemilik rumah di seluruh Indonesia.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#7B3F00] text-white font-bold rounded-xl hover:bg-[#6A3500] transition-colors"
          >
            <MessageCircle size={20} />
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
