import type { Metadata } from 'next'
import CityPage from '@/components/CityPage'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kusen Aluminium Lengkung Bandung — Produsen Bekasi, Kirim ke Bandung',
  description:
    'Kusen aluminium lengkung custom untuk Bandung. Jendela bulat, kusen arch, pintu lengkung. Harga langsung pabrik Bekasi, pengiriman ke Bandung. CV Toto Aluminium. WA: 0813-1191-2002.',
  alternates: { canonical: `${SITE.url}/kusen-aluminium-lengkung-bandung` },
}

const faqs = [
  {
    q: 'Apakah bisa pesan kusen aluminium lengkung dari Bandung?',
    a: 'Tentu! Kami melayani pemesanan dari Bandung via WhatsApp. Konsultasikan desain, ukuran, dan warna yang Anda inginkan, lalu kami siapkan penawaran harga beserta estimasi ongkos kirim ke Bandung.',
  },
  {
    q: 'Berapa lama pengiriman dari Bekasi ke Bandung?',
    a: 'Pengiriman dari Bekasi ke Bandung biasanya memakan waktu 2-3 hari kerja menggunakan jasa ekspedisi. Produk dikemas dengan aman menggunakan bubble wrap dan kayu pelindung.',
  },
  {
    q: 'Apakah harga sudah termasuk ongkir ke Bandung?',
    a: 'Harga produk belum termasuk ongkos kirim. Ongkir ke Bandung dihitung berdasarkan berat volumetrik. Hubungi kami via WhatsApp untuk estimasi biaya pengiriman ke lokasi Anda di Bandung.',
  },
  {
    q: 'Apakah tersedia jendela bulat aluminium untuk rumah di Bandung?',
    a: 'Ya, jendela bulat custom aluminium adalah salah satu produk unggulan kami yang banyak diminati untuk hunian bergaya Eropa dan mediterania yang populer di Bandung. Kami bisa buat berbagai diameter sesuai kebutuhan.',
  },
  {
    q: 'Bagaimana cara memesan dari Bandung?',
    a: 'Pemesanan bisa dilakukan via WhatsApp ke 0813-1191-2002. Kirimkan denah atau foto referensi desain Anda, lalu tim kami akan memberikan konsultasi dan penawaran harga secara gratis.',
  },
]

export default function Page() {
  return (
    <CityPage
      city="Bandung"
      province="Jawa Barat"
      slug="kusen-aluminium-lengkung-bandung"
      h1="Kusen Aluminium Lengkung Bandung — Custom dari Pabrik Bekasi"
      description="Pesan kusen aluminium lengkung custom untuk hunian dan komersial di Bandung. Jendela bulat, kusen arch, pintu lengkung berkualitas. Dikirim dari pabrik Bekasi ke Bandung."
      faqs={faqs}
    />
  )
}
