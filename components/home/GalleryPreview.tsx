'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { ZoomIn } from 'lucide-react'

const photos = [
  {
    src: '/images/hero-all-products.jpg',
    alt: 'Koleksi produk kusen aluminium lengkung CV Toto Aluminium Manufacture',
    caption: 'Koleksi Produk Unggulan',
  },
  {
    src: '/images/product-circle-1.jpg',
    alt: 'Jendela bulat custom aluminium teal frame hitam',
    caption: 'Jendela Bulat Custom',
  },
  {
    src: '/images/product-circle-2.jpg',
    alt: 'Jendela bulat aluminium tampak depan',
    caption: 'Jendela Bulat — Tampak Depan',
  },
  {
    src: '/images/product-arch-1.jpg',
    alt: 'Kusen jendela lengkung merah putih dua daun aluminium',
    caption: 'Kusen Jendela Lengkung 2 Daun',
  },
  {
    src: '/images/product-arch-2.jpg',
    alt: 'Kusen jendela lengkung aluminium tampak depan',
    caption: 'Kusen Jendela Lengkung — Tampak Depan',
  },
]

export default function GalleryPreview() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <section className="py-16" style={{ backgroundColor: '#F5EFE6' }}>
      <hr className="section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-10">
          <h2 className="section-title">Hasil Karya Kami</h2>
          <p className="section-subtitle">
            Setiap produk dikerjakan dengan presisi dan dedikasi. Klik foto untuk tampilan penuh.
          </p>
        </div>

        {/* Gallery Grid
            Mobile: 1 kolom
            Tablet: 2 kolom
            Desktop: 3 kolom (foto pertama span lebih tinggi) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Foto pertama — full width di mobile, span baris di lg */}
          <div
            className="relative h-56 sm:h-64 lg:row-span-2 lg:h-auto cursor-pointer group rounded-2xl overflow-hidden"
            onClick={() => { setIndex(0); setOpen(true) }}
            style={{ minHeight: '224px' }}
          >
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(0,0,0,0.32)' }}>
              <ZoomIn size={32} className="text-white" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
              <span className="text-white text-sm font-medium">{photos[0].caption}</span>
            </div>
          </div>

          {/* Foto 2-5 */}
          {photos.slice(1).map((photo, i) => (
            <div
              key={photo.src}
              className="relative h-48 sm:h-52 cursor-pointer group rounded-2xl overflow-hidden"
              onClick={() => { setIndex(i + 1); setOpen(true) }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(0,0,0,0.32)' }}>
                <ZoomIn size={24} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }}>
                <span className="text-white text-xs font-medium">{photo.caption}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: '#7B3F00' }}
          >
            Lihat Semua Galeri
          </Link>
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={photos.map((p) => ({ src: p.src, alt: p.alt }))}
      />
    </section>
  )
}
