import Link from 'next/link'
import { Circle, AppWindow, DoorOpen, Square, LayoutGrid, Wrench } from 'lucide-react'
import { SITE } from '@/lib/constants'

function WaIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const products = [
  {
    id: 'jendela-bulat',
    name: 'Jendela Bulat Custom',
    desc: 'Jendela berbentuk lingkaran penuh dengan frame aluminium presisi. Cocok untuk aksen arsitektur modern dan mediterania.',
    icon: Circle,
  },
  {
    id: 'kusen-jendela-lengkung',
    name: 'Kusen Jendela Lengkung',
    desc: 'Kusen jendela dengan bentuk arch/lengkung di bagian atas. Tersedia berbagai ukuran, warna, dan finishing.',
    icon: AppWindow,
  },
  {
    id: 'kusen-pintu-lengkung',
    name: 'Kusen Pintu Lengkung',
    desc: 'Kusen pintu dengan desain arch elegan. Memberikan kesan mewah pada tampilan eksterior dan interior bangunan.',
    icon: DoorOpen,
  },
  {
    id: 'openback',
    name: 'Openback Aluminium',
    desc: 'Profil openback dengan presisi tinggi. Cocok untuk jendela dan pintu dengan kebutuhan seal maksimal.',
    icon: Square,
  },
  {
    id: 'transome',
    name: 'Transome / Curtainwall',
    desc: 'Sistem curtainwall dan transome aluminium untuk gedung komersial, perkantoran, dan bangunan modern.',
    icon: LayoutGrid,
  },
  {
    id: 'custom-bending',
    name: 'Custom Bending',
    desc: 'Layanan bending aluminium sesuai desain custom. Kami mampu mengerjakan berbagai radius dan bentuk lengkung.',
    icon: Wrench,
  },
]

export default function ProductSection() {
  return (
    <section className="py-16 bg-[#F5EFE6]">
      <hr className="section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-10">
          <h2 className="section-title">Produk Kusen Aluminium Lengkung Kami</h2>
          <p className="section-subtitle">
            Semua produk diproduksi langsung di pabrik kami di Bekasi dengan standar kualitas tinggi
            dan bisa dipesan sesuai ukuran custom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden flex flex-col border border-[#E8D5B7] hover:border-[#7B3F00] hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
            >
              {/* Icon area — identik untuk semua kartu */}
              <div className="h-48 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F5EFE6] to-[#E8D5B7]">
                <product.icon size={48} className="text-[#7B3F00]" />
                <span className="text-[14px] font-semibold text-[#7B3F00]">{product.name}</span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-2 font-sans">{product.name}</h3>
                <p className="text-sm flex-1 leading-relaxed text-[#6B5B4E]">{product.desc}</p>
                <div className="mt-4 flex gap-2">
                  <a
                    href={`https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(`Halo, saya ingin tanya harga ${product.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#7B3F00] hover:bg-[#6A3500] text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    <WaIcon />
                    Tanya Harga
                  </a>
                  <Link
                    href={`/produk#${product.id}`}
                    className="px-4 py-2.5 text-sm font-semibold rounded-lg border-[1.5px] border-[#7B3F00] text-[#7B3F00] hover:bg-[#7B3F00] hover:text-white transition-colors"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#7B3F00] hover:bg-[#6A3500] text-white font-semibold rounded-xl transition-colors"
          >
            Lihat Semua Produk
          </Link>
        </div>
      </div>
    </section>
  )
}
