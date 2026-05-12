import type { Metadata } from 'next'
import CityPage from '@/components/CityPage'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kusen Aluminium Lengkung Bekasi — Harga Langsung Pabrik',
  description:
    'Produsen kusen aluminium lengkung di Bekasi. CV Toto Aluminium Manufacture — jendela bulat, kusen arch, pintu lengkung custom. Harga terbaik langsung pabrik. WA: 0813-1191-2002.',
  alternates: { canonical: `${SITE.url}/kusen-aluminium-lengkung-bekasi` },
}

const faqs = [
  {
    q: 'Dimana pabrik kusen aluminium lengkung di Bekasi?',
    a: 'Pabrik CV Toto Aluminium Manufacture berlokasi di Jl. Rawa Mulya No.15 RT 002/001, Mustika Jaya, Kec. Mustika Jaya, Kota Bekasi, Jawa Barat 17158. Anda bisa langsung datang untuk melihat produk dan berkonsultasi.',
  },
  {
    q: 'Apakah bisa survey ke lokasi proyek di Bekasi?',
    a: 'Ya, kami bisa membantu survey untuk proyek di sekitar Bekasi dan Jabodetabek. Hubungi kami via WhatsApp untuk penjadwalan survey.',
  },
  {
    q: 'Berapa lama pengiriman ke lokasi di Bekasi?',
    a: 'Untuk lokasi di Bekasi, pengiriman bisa dilakukan dalam 1-2 hari kerja setelah produk selesai. Untuk Bekasi yang lebih dekat dengan pabrik, bisa di-pickup langsung.',
  },
  {
    q: 'Apakah ada showroom di Bekasi untuk melihat contoh produk?',
    a: 'Anda bisa mengunjungi langsung pabrik kami di Mustika Jaya, Bekasi untuk melihat contoh produk dan berdiskusi dengan tim ahli kami. Sebaiknya hubungi terlebih dahulu via WhatsApp sebelum berkunjung.',
  },
  {
    q: 'Berapa harga kusen aluminium lengkung di Bekasi?',
    a: 'Harga kusen aluminium lengkung mulai Rp 190.000/meter untuk profil 3" warna umum. Karena pabrik kami ada di Bekasi, tidak ada ongkir tambahan untuk area Bekasi. Hubungi kami untuk penawaran detail.',
  },
]

export default function Page() {
  return (
    <CityPage
      city="Bekasi"
      province="Jawa Barat"
      slug="kusen-aluminium-lengkung-bekasi"
      h1="Kusen Aluminium Lengkung di Bekasi — Harga Langsung Pabrik"
      description="Pabrik kusen aluminium lengkung berlokasi di Bekasi. Jendela bulat, kusen arch, pintu lengkung custom. Harga terbaik, tidak perlu ongkos kirim untuk area Bekasi."
      faqs={faqs}
    />
  )
}
