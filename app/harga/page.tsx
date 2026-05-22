import type { Metadata } from 'next'
import { MessageCircle, Info } from 'lucide-react'
import { WA_URL, SITE } from '@/lib/constants'
import { readDB } from '@/lib/db'
import type { Price } from '@/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Daftar Harga Kusen Aluminium Lengkung',
  description:
    'Daftar harga kusen aluminium lengkung CV Toto Aluminium Manufacture: warna umum, YKK, MF per meter. Harga langsung pabrik Bekasi. WA: 0813-1191-2002.',
  alternates: { canonical: `${SITE.url}/harga` },
}

function formatRp(v: string) {
  return `Rp ${v}/m`
}

export default function HargaPage() {
  const priceData = readDB<Price>('prices.json')

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <div className="bg-[#7B3F00] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Daftar Harga Kusen Aluminium Lengkung
          </h1>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto">
            Harga langsung dari pabrik kami di Bekasi. Transparan, kompetitif, tanpa biaya tersembunyi.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Note */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <Info size={20} className="text-[#E6A817] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            <strong>Catatan:</strong> Harga di atas adalah harga per meter linier, belum termasuk ongkos
            kirim. Harga dapat berubah sewaktu-waktu sesuai kondisi pasar. Hubungi kami untuk penawaran
            terkini dan harga grosir.
          </p>
        </div>

        {/* Price Table */}
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-[#7B3F00] text-white">
                <th className="text-left px-5 py-4 font-semibold">Produk</th>
                <th className="text-center px-5 py-4 font-semibold">
                  Warna Umum
                  <span className="block text-xs font-normal text-amber-200">/ meter</span>
                </th>
                <th className="text-center px-5 py-4 font-semibold">
                  YKK
                  <span className="block text-xs font-normal text-amber-200">/ meter</span>
                </th>
                <th className="text-center px-5 py-4 font-semibold">
                  MF
                  <span className="block text-xs font-normal text-amber-200">/ meter</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {priceData.map((row, i) => (
                <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9F6F2]'}>
                  <td className="px-5 py-3.5 font-medium text-gray-900">{row.produk}</td>
                  <td className="px-5 py-3.5 text-center text-gray-700">
                    {row.warnaUmum ? formatRp(row.warnaUmum) : '—'}
                  </td>
                  <td className="px-5 py-3.5 text-center text-gray-700">
                    {row.ykk ? formatRp(row.ykk) : '—'}
                  </td>
                  <td className="px-5 py-3.5 text-center text-gray-700">
                    {row.mf ? formatRp(row.mf) : '—'}
                  </td>
                </tr>
              ))}
              {/* Serat Kayu row */}
              <tr className="bg-amber-50">
                <td className="px-5 py-3.5 font-medium text-gray-900">Serat Kayu</td>
                <td className="px-5 py-3.5 text-center" colSpan={3}>
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full border border-amber-300">
                    Segera Menyusul
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-10 bg-[#7B3F00] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Butuh Penawaran Khusus?</h2>
          <p className="text-amber-100 mb-6">
            Dapatkan harga terbaik untuk pembelian dalam jumlah besar atau proyek skala besar.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7B3F00] font-bold rounded-xl hover:bg-[#F5EFE6] transition-colors"
          >
            <MessageCircle size={20} />
            Minta Penawaran via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
