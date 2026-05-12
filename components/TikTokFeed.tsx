import { ExternalLink } from 'lucide-react'
import { SITE } from '@/lib/constants'

const TikTokLogo = ({ size = 48 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#7B3F00"
    aria-hidden="true"
    style={{ opacity: 0.35 }}
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
  </svg>
)

const PlayButton = () => (
  <div className="w-12 h-12 rounded-full bg-[#7B3F00] flex items-center justify-center">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  </div>
)

const videos = [
  {
    id: '7535009708495654149',
    caption:
      'CV Toto Aluminium hadir untuk kamu yang butuh produk aluminium berkualitas tinggi, mulai dari kusen, pintu, jendela, hingga bending aluminium custom.',
    url: 'https://www.tiktok.com/@toto.alumunium.ma/video/7535009708495654149',
    cta: 'Lihat Video',
  },
  {
    id: '7579121700407905557',
    caption:
      'Hari ini CV. TOTO ALUMUNIUM MANUFACTURE lagi banyak order! Yuk lihat proses produksi kami langsung dari pabrik di Bekasi.',
    url: 'https://www.tiktok.com/@toto.alumunium.ma/video/7579121700407905557',
    cta: 'Lihat Video',
  },
  {
    id: 'profile',
    caption:
      'Follow akun TikTok kami untuk update produk terbaru, tips aluminium, dan proses produksi langsung dari pabrik kami di Bekasi.',
    url: 'https://www.tiktok.com/@toto.alumunium.ma',
    cta: 'Follow Kami',
  },
]

export default function TikTokFeed() {
  return (
    <section className="py-16 bg-white">
      <hr className="section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#7B3F00">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
            </svg>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#7B3F00]">TikTok</span>
          </div>
          <h2 className="section-title">Ikuti Perkembangan Kami di TikTok</h2>
          <p className="section-subtitle">
            Lihat proses produksi, hasil proyek, dan tips aluminium langsung dari pabrik kami
          </p>
        </div>

        {/* Cards — scroll horizontal di mobile, grid 3 kolom di desktop */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-72 lg:w-auto snap-center flex flex-col rounded-2xl overflow-hidden border border-[#E8D5B7] bg-[#F5EFE6] hover:border-[#7B3F00] hover:-translate-y-1 hover:shadow-xl transition-all duration-200 group"
              style={{ minWidth: '280px' }}
            >
              {/* Thumbnail area */}
              <div className="relative flex flex-col items-center justify-center gap-4 py-10 bg-[#EDE0CC]" style={{ minHeight: '180px' }}>
                <TikTokLogo size={52} />
                <PlayButton />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold bg-[#7B3F00] text-white">
                  TikTok
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm leading-relaxed flex-1 mb-4 text-[#6B5B4E] line-clamp-3">
                  {video.caption}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#7B3F00] group-hover:gap-3 transition-all">
                  {video.cta}
                  <ExternalLink size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow button */}
        <div className="text-center mt-8">
          <a
            href={SITE.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#2C1810] hover:bg-[#1a0a00] text-white font-bold text-base rounded-xl shadow-md transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
            </svg>
            Follow {SITE.tiktok}
          </a>
        </div>
      </div>
    </section>
  )
}
