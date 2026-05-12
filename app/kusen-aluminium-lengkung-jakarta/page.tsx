import type { Metadata } from 'next'
import CityPage from '@/components/CityPage'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kusen Aluminium Lengkung Jakarta — Pengiriman Cepat dari Bekasi',
  description:
    'Kusen aluminium lengkung custom untuk Jakarta. CV Toto Aluminium Manufacture Bekasi melayani pengiriman ke seluruh Jakarta. Jendela bulat, kusen arch, pintu lengkung. WA: 0813-1191-2002.',
  alternates: { canonical: `${SITE.url}/kusen-aluminium-lengkung-jakarta` },
}

const faqs = [
  {
    q: 'Apakah kusen aluminium lengkung bisa dikirim ke Jakarta?',
    a: 'Ya, kami rutin mengirim produk ke Jakarta Utara, Jakarta Selatan, Jakarta Barat, Jakarta Timur, dan Jakarta Pusat. Pengiriman menggunakan ekspedisi terpercaya atau jasa angkutan khusus untuk barang besar.',
  },
  {
    q: 'Berapa lama pengiriman kusen aluminium dari Bekasi ke Jakarta?',
    a: 'Dari pabrik kami di Bekasi ke Jakarta biasanya 1-2 hari kerja setelah produk selesai. Untuk proyek mendesak, bisa diatur pengiriman ekspres.',
  },
  {
    q: 'Apakah bisa custom ukuran untuk proyek gedung di Jakarta?',
    a: 'Tentu. Kami berpengalaman mengerjakan proyek komersial dan gedung bertingkat di Jakarta. Kami siap mengerjakan ukuran dan desain custom termasuk curtainwall dan transome skala besar.',
  },
  {
    q: 'Berapa harga kusen aluminium lengkung dengan pengiriman ke Jakarta?',
    a: 'Harga produk mulai Rp 190.000/meter. Ongkos kirim ke Jakarta bergantung pada berat dan dimensi produk. Hubungi kami untuk estimasi biaya total.',
  },
  {
    q: 'Apakah ada teknisi yang bisa membantu pemasangan di Jakarta?',
    a: 'Kami menyediakan produk jadi siap pasang. Untuk pemasangan, kami bisa merekomendasikan teknisi terpercaya di area Jakarta atas permintaan.',
  },
]

export default function Page() {
  return (
    <CityPage
      city="Jakarta"
      province="DKI Jakarta"
      slug="kusen-aluminium-lengkung-jakarta"
      h1="Kusen Aluminium Lengkung Jakarta — Kirim dari Pabrik Bekasi"
      description="Produsen kusen aluminium lengkung di Bekasi, melayani pengiriman ke seluruh Jakarta. Jendela bulat custom, kusen arch, pintu lengkung berkualitas tinggi dengan harga langsung pabrik."
      faqs={faqs}
    />
  )
}
