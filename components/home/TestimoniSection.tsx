import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Bapak Dendi S.',
    role: 'Kontraktor, Surabaya',
    rating: 5,
    text: 'Sudah 3x order kusen lengkung di sini. Kualitas konsisten, pengerjaan rapi, dan pengiriman ke Surabaya aman. Harga juga bersaing langsung dari pabrik. Rekomen banget buat teman-teman kontraktor!',
  },
  {
    name: 'Ibu Ratna K.',
    role: 'Arsitek Interior, Jakarta',
    rating: 5,
    text: 'Saya sering rekomendasikan CV Toto ke klien yang minta desain jendela bulat atau kusen arch. Hasilnya selalu memuaskan. Mereka bisa custom ukuran apapun dan komunikasi via WA responsif.',
  },
  {
    name: 'Pak Andri W.',
    role: 'Pemilik Rumah, Bandung',
    rating: 5,
    text: 'Rumah saya pakai jendela bulat dari Toto Aluminium dan hasilnya luar biasa! Banyak tetangga yang tanya beli di mana. Harga sepadan dengan kualitas yang dapat. Proses pemesanan juga mudah.',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} style={{ color: '#D4A853', fill: '#D4A853' }} />
      ))}
    </div>
  )
}

export default function TestimoniSection() {
  return (
    <section className="py-16" style={{ backgroundColor: '#F5EFE6' }}>
      <hr className="section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-10">
          <h2 className="section-title">Kata Mereka Tentang Kami</h2>
          <p className="section-subtitle">
            Kepuasan pelanggan adalah prioritas utama kami di setiap proyek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white p-6 rounded-2xl transition-shadow duration-200"
              style={{ border: '1px solid #E8D5B7' }}
            >
              <Stars count={t.rating} />
              <blockquote className="mt-4 text-sm leading-relaxed italic" style={{ color: '#6B5B4E' }}>
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                  style={{ backgroundColor: '#7B3F00' }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1A1A1A' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: '#6B5B4E' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating summary */}
        <div className="mt-8 text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-md"
            style={{ border: '1px solid #E8D5B7' }}
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} style={{ color: '#D4A853', fill: '#D4A853' }} />
              ))}
            </div>
            <span className="font-bold" style={{ color: '#1A1A1A' }}>4.9/5</span>
            <span className="text-sm" style={{ color: '#6B5B4E' }}>dari 127+ ulasan</span>
          </div>
        </div>
      </div>
    </section>
  )
}
