import type { Metadata } from 'next'
import { MessageCircle, Info } from 'lucide-react'
import { WA_URL, SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Daftar Harga Kusen Aluminium Lengkung',
  description:
    'Daftar harga kusen aluminium lengkung CV Toto Aluminium Manufacture: warna umum, YKK, MF per meter. Harga langsung pabrik Bekasi. WA: 0813-1191-2002.',
  alternates: { canonical: `${SITE.url}/harga` },
}

const priceData = [
  { produk: 'Kusen 4"', warnaumum: '240.000', ykk: '310.000', mf: '280.000' },
  { produk: 'Kusen 3"', warnaumum: '190.000', ykk: '260.000', mf: '230.000' },
  { produk: 'Openback 4"', warnaumum: '250.000', ykk: '320.000', mf: '290.000' },
  { produk: 'Openback 3"', warnaumum: '200.000', ykk: '270.000', mf: '240.000' },
  { produk: 'OB + Stoper 4"', warnaumum: '320.000', ykk: '400.000', mf: '360.000' },
  { produk: 'OB + Stoper 3"', warnaumum: '260.000', ykk: '340.000', mf: '300.000' },
  { produk: 'Tutup M4"', warnaumum: '190.000', ykk: '250.000', mf: '220.000' },
  { produk: 'Tutup M3"', warnaumum: '160.000', ykk: '210.000', mf: '190.000' },
  { produk: 'Daun 8 & 6cm', warnaumum: '360.000', ykk: '450.000', mf: '410.000' },
  { produk: 'Daun 5cm', warnaumum: '310.000', ykk: '390.000', mf: '350.000' },
  { produk: 'Stoper', warnaumum: '60.000', ykk: '90.000', mf: '75.000' },
  { produk: 'Ornamen', warnaumum: '60.000', ykk: '90.000', mf: '75.000' },
  { produk: 'Mahkota', warnaumum: '150.000', ykk: '200.000', mf: '180.000' },
  { produk: 'Transome', warnaumum: '370.000', ykk: '470.000', mf: '430.000' },
]

function formatRp(v: string) {
  return `Rp ${v}/m`
}

export default function HargaPage() {
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
                <tr
                  key={row.produk}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9F6F2]'}
                >
                  <td className="px-5 py-3.5 font-medium text-gray-900">{row.produk}</td>
                  <td className="px-5 py-3.5 text-center text-gray-700">
                    {formatRp(row.warnaumum)}
                  </td>
                  <td className="px-5 py-3.5 text-center text-gray-700">{formatRp(row.ykk)}</td>
                  <td className="px-5 py-3.5 text-center text-gray-700">{formatRp(row.mf)}</td>
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
