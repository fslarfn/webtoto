import type { Metadata } from 'next'
import { MessageCircle, Download, FileText } from 'lucide-react'
import { WA_URL, SITE } from '@/lib/constants'
import { getSupabase } from '@/lib/supabase'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Daftar Harga Kusen Aluminium Lengkung',
  description:
    'Download daftar harga kusen aluminium lengkung CV Toto Aluminium Manufacture: warna umum, YKK, MF per meter. Harga langsung pabrik Bekasi. WA: 0813-1191-2002.',
  alternates: { canonical: `${SITE.url}/harga` },
}

async function getPdfUrl(): Promise<string | null> {
  try {
    const sb = getSupabase()
    if (!sb) return null
    const { data } = await sb
      .from('settings')
      .select('value')
      .eq('key', 'price_pdf_url')
      .single()
    return data?.value ?? null
  } catch {
    return null
  }
}

export default async function HargaPage() {
  const pdfUrl = await getPdfUrl()
  const crumbs = breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Harga', url: `${SITE.url}/harga` },
  ])

  return (
    <div className="pt-20 lg:pt-24">
      <JsonLd schema={crumbs} />

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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {pdfUrl ? (
          <div className="space-y-6">
            {/* Download card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center space-y-5">
              <div className="flex justify-center">
                <div className="p-5 bg-[#F5EFE6] rounded-full">
                  <FileText size={40} className="text-[#7B3F00]" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Daftar Harga Terbaru</h2>
                <p className="text-gray-500 text-sm mt-1">
                  File PDF berisi daftar harga lengkap semua produk kusen aluminium kami
                </p>
              </div>
              <a
                href={pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#7B3F00] text-white font-bold rounded-xl hover:bg-[#5a2e00] transition-colors text-lg"
              >
                <Download size={22} />
                Download Daftar Harga (PDF)
              </a>
              <p className="text-xs text-gray-400">
                Klik tombol di atas untuk mengunduh file PDF daftar harga
              </p>
            </div>

            {/* Preview PDF di browser (desktop) */}
            <div className="hidden md:block bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                <FileText size={16} className="text-[#7B3F00]" />
                <span className="text-sm font-medium text-gray-700">Preview Daftar Harga</span>
              </div>
              <iframe
                src={pdfUrl}
                className="w-full"
                style={{ height: '600px' }}
                title="Daftar Harga CV Toto Aluminium"
              />
            </div>
          </div>
        ) : (
          /* Belum ada PDF — tampilkan pesan dan WA */
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10 text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-amber-50 rounded-full">
                <FileText size={36} className="text-amber-500" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Daftar Harga Segera Hadir</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Daftar harga sedang dalam proses pembaruan. Hubungi kami langsung untuk mendapatkan
              informasi harga terkini.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#7B3F00] text-white font-semibold rounded-xl hover:bg-[#5a2e00] transition-colors"
            >
              <MessageCircle size={18} />
              Tanya Harga via WhatsApp
            </a>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 bg-[#7B3F00] rounded-2xl p-8 text-center text-white">
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
