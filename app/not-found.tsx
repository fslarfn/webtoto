import Link from 'next/link'
import { Home, MessageCircle } from 'lucide-react'
import { WA_URL } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F2] px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-[#7B3F00] mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">
          Halaman yang Anda cari tidak ada. Mungkin sudah dipindahkan atau URL salah ketik.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7B3F00] text-white font-semibold rounded-xl hover:bg-[#5C2E00] transition-colors"
          >
            <Home size={18} />
            Ke Beranda
          </Link>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7B3F00] text-white font-semibold rounded-xl hover:bg-[#6A3500] transition-colors"
          >
            <MessageCircle size={18} />
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  )
}
