'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { ZoomIn } from 'lucide-react'

const photos = [
  {
    src: '/images/hero-all-products.jpg',
    alt: 'Koleksi produk kusen aluminium lengkung CV Toto Aluminium Manufacture Bekasi',
    caption: 'Koleksi Produk Unggulan',
    category: 'Semua Produk',
  },
  {
    src: '/images/product-circle-1.jpg',
    alt: 'Jendela bulat custom aluminium teal frame hitam sudut kiri',
    caption: 'Jendela Bulat Custom — Sudut Kiri',
    category: 'Jendela Bulat',
  },
  {
    src: '/images/product-circle-2.jpg',
    alt: 'Jendela bulat custom aluminium tampak depan',
    caption: 'Jendela Bulat Custom — Tampak Depan',
    category: 'Jendela Bulat',
  },
  {
    src: '/images/product-arch-1.jpg',
    alt: 'Kusen jendela lengkung merah putih dua daun sudut perspektif',
    caption: 'Kusen Jendela Lengkung 2 Daun',
    category: 'Jendela Lengkung',
  },
  {
    src: '/images/product-arch-2.jpg',
    alt: 'Kusen jendela lengkung aluminium merah putih tampak depan',
    caption: 'Kusen Jendela Lengkung — Tampak Depan',
    category: 'Jendela Lengkung',
  },
]

export default function GaleriPage() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <div className="bg-[#7B3F00] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Galeri Hasil Karya</h1>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto">
            Setiap produk dikerjakan dengan presisi dan dedikasi tinggi di pabrik kami.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="relative cursor-pointer group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => {
                setIndex(i)
                setOpen(true)
              }}
            >
              <div className="relative h-64">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <ZoomIn
                    size={36}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-xs font-semibold text-[#E6A817] uppercase tracking-wider">
                    {photo.category}
                  </span>
                  <p className="text-white font-semibold text-sm mt-0.5">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={photos.map((p) => ({ src: p.src, alt: p.alt }))}
      />
    </div>
  )
}
