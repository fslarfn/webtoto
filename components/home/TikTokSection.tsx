import Script from 'next/script'
import { TIKTOK_VIDEOS, SITE } from '@/lib/constants'

export default function TikTokSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#7B3F00">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
            </svg>
            <span className="text-[#7B3F00] font-semibold">TikTok</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#7B3F00]">
            Ikuti Perkembangan Kami di TikTok
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Lihat proses produksi, hasil proyek, dan tips aluminium langsung dari pabrik kami
          </p>
        </div>

        {/* TikTok Embeds */}
        <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 md:grid md:grid-cols-3 md:overflow-visible snap-x snap-mandatory md:snap-none">
          {TIKTOK_VIDEOS.map((video) => (
            <div
              key={video.url}
              className="flex-shrink-0 w-80 md:w-auto snap-center"
            >
              <blockquote
                className="tiktok-embed"
                cite={video.url}
                data-video-id={video.id}
                style={{ maxWidth: '325px', minWidth: '325px', margin: '0 auto' }}
              >
                <section>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`@toto.alumunium.ma`}
                    href="https://www.tiktok.com/@toto.alumunium.ma"
                  >
                    @toto.alumunium.ma
                  </a>
                  <p>{video.caption}</p>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    title="♬ original sound"
                    href={video.url}
                  >
                    ♬ original sound
                  </a>
                </section>
              </blockquote>
            </div>
          ))}
        </div>

        {/* Follow button */}
        <div className="text-center mt-8">
          <a
            href={SITE.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#010101] text-white font-bold text-base rounded-xl hover:bg-gray-900 transition-colors shadow-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
            </svg>
            Follow {SITE.tiktok}
          </a>
        </div>
      </div>

      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
    </section>
  )
}
