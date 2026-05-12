import type { Metadata } from 'next'
import CityPage from '@/components/CityPage'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kusen Aluminium Lengkung Surabaya — Kirim Se-Indonesia dari Bekasi',
  description:
    'Kusen aluminium lengkung custom untuk Surabaya dan Jawa Timur. CV Toto Aluminium Manufacture Bekasi melayani pengiriman ke Surabaya. Jendela bulat, kusen arch. WA: 0813-1191-2002.',
  alternates: { canonical: `${SITE.url}/kusen-aluminium-lengkung-surabaya` },
}

const faqs = [
  {
    q: 'Apakah bisa kirim kusen aluminium lengkung ke Surabaya?',
    a: 'Ya, kami berpengalaman mengirimkan produk ke Surabaya dan seluruh Jawa Timur. Pengiriman menggunakan jasa ekspedisi terpercaya dengan pengemasan khusus untuk memastikan produk tiba dalam kondisi sempurna.',
  },
  {
    q: 'Berapa lama pengiriman ke Surabaya?',
    a: 'Pengiriman dari Bekasi ke Surabaya biasanya 3-5 hari kerja via jalur darat/laut. Bisa lebih cepat dengan jalur udara sesuai kebutuhan dan budget Anda.',
  },
  {
    q: 'Apakah ada agen atau reseller di Surabaya?',
    a: 'Saat ini pemesanan dilakukan langsung ke pabrik kami di Bekasi. Untuk volume besar atau program kemitraan di Surabaya, silakan hubungi kami untuk diskusi lebih lanjut.',
  },
  {
    q: 'Bagaimana cara memastikan ukuran kusen tepat sebelum dikirim ke Surabaya?',
    a: 'Kami akan meminta detail ukuran lengkap, foto bukaan, dan gambar teknis sebelum produksi. Setelah produk jadi, kami akan kirimkan foto/video untuk konfirmasi sebelum pengiriman ke Surabaya.',
  },
  {
    q: 'Berapa harga kusen aluminium lengkung untuk dikirim ke Surabaya?',
    a: 'Harga produk mulai Rp 190.000/meter ditambah ongkos kirim ke Surabaya. Untuk volume besar, ada diskon khusus. Hubungi kami untuk penawaran komprehensif.',
  },
]

export default function Page() {
  return (
    <CityPage
      city="Surabaya"
      province="Jawa Timur"
      slug="kusen-aluminium-lengkung-surabaya"
      h1="Kusen Aluminium Lengkung Surabaya — Kirim dari Pabrik Bekasi"
      description="Produsen kusen aluminium lengkung custom melayani Surabaya dan Jawa Timur. Jendela bulat, kusen arch, pintu lengkung. Dikirim dari pabrik Bekasi dengan pengemasan aman."
      faqs={faqs}
    />
  )
}
