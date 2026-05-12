import type { Metadata } from 'next'
import CityPage from '@/components/CityPage'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kusen Aluminium Lengkung Bogor — Dekat Bekasi, Pengiriman Cepat',
  description:
    'Kusen aluminium lengkung custom untuk Bogor dan sekitarnya. Dekat dari pabrik kami di Bekasi, pengiriman cepat. Jendela bulat, kusen arch, pintu lengkung. WA: 0813-1191-2002.',
  alternates: { canonical: `${SITE.url}/kusen-aluminium-lengkung-bogor` },
}

const faqs = [
  {
    q: 'Berapa lama pengiriman kusen aluminium dari Bekasi ke Bogor?',
    a: 'Bogor sangat dekat dari Bekasi, pengiriman biasanya bisa dilakukan dalam 1 hari kerja menggunakan ekspedisi lokal atau kendaraan operasional kami untuk pesanan dalam jumlah tertentu.',
  },
  {
    q: 'Apakah bisa survey proyek di Bogor?',
    a: 'Untuk proyek besar di Bogor, kami bisa melakukan kunjungan survey. Hubungi kami untuk penjadwalan. Survey membantu memastikan ukuran dan desain yang tepat sebelum produksi.',
  },
  {
    q: 'Apakah ada minumum order untuk pengiriman ke Bogor?',
    a: 'Tidak ada minimum order untuk pengiriman ke Bogor. Kami melayani dari pesanan kecil untuk rumah pribadi hingga proyek besar. Ongkos kirim disesuaikan dengan volume.',
  },
  {
    q: 'Produk aluminium apa yang paling diminati untuk rumah di Bogor?',
    a: 'Jendela bulat dan kusen arch sangat populer untuk hunian di Bogor karena banyak perumahan bergaya klasik dan mediterania di sana. Kami bisa buat semua ukuran custom sesuai desain rumah Anda.',
  },
  {
    q: 'Bagaimana cara pesan dan bayar untuk pelanggan di Bogor?',
    a: 'Pemesanan via WhatsApp, pembayaran bisa transfer bank. Kami meminta DP 50% di awal untuk mulai produksi, pelunasan sebelum pengiriman. Kami berikan kuitansi resmi untuk setiap transaksi.',
  },
]

export default function Page() {
  return (
    <CityPage
      city="Bogor"
      province="Jawa Barat"
      slug="kusen-aluminium-lengkung-bogor"
      h1="Kusen Aluminium Lengkung Bogor — Cepat dari Pabrik Bekasi"
      description="Kusen aluminium lengkung custom untuk Bogor. Lokasi pabrik di Bekasi memastikan pengiriman cepat ke Bogor. Jendela bulat, kusen arch, pintu lengkung custom semua ukuran."
      faqs={faqs}
    />
  )
}
