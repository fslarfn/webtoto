import type { Metadata } from 'next'
import { Circle, AppWindow, DoorOpen, Square, LayoutGrid, Wrench } from 'lucide-react'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Produk Kusen Aluminium Lengkung Custom',
  description:
    'Daftar lengkap produk kusen aluminium lengkung custom CV Toto Aluminium Manufacture: jendela bulat, kusen arch, pintu lengkung, openback, transome, dan custom bending.',
  alternates: { canonical: `${SITE.url}/produk` },
}

function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const products = [
  {
    id: 'jendela-bulat',
    category: 'Jendela',
    name: 'Jendela Bulat Custom',
    desc: 'Jendela berbentuk lingkaran penuh dengan frame aluminium presisi tinggi. Tersedia dalam berbagai diameter, warna, dan finishing. Cocok untuk desain modern, mediterania, dan klasik.',
    features: ['Diameter custom', 'Berbagai warna', 'Frame presisi', 'Kaca tempered opsional'],
    icon: Circle,
  },
  {
    id: 'kusen-jendela-lengkung',
    category: 'Jendela',
    name: 'Kusen Jendela Lengkung',
    desc: 'Kusen jendela dengan bentuk arch/lengkung di bagian atas. Tersedia 1 daun dan 2 daun, berbagai profil (3" dan 4"), warna standar, YKK, MF, hingga serat kayu.',
    features: ['1 atau 2 daun', 'Profil 3" & 4"', 'Semua merek', 'Ukuran custom'],
    icon: AppWindow,
  },
  {
    id: 'kusen-pintu-lengkung',
    category: 'Pintu',
    name: 'Kusen Pintu Lengkung',
    desc: 'Kusen pintu dengan desain arch elegan untuk tampilan eksterior dan interior yang mewah. Bisa dikombinasikan dengan berbagai jenis daun pintu.',
    features: ['Arch full/setengah', 'Berbagai lebar', 'Custom tinggi', 'Garansi kualitas'],
    icon: DoorOpen,
  },
  {
    id: 'openback',
    category: 'Aksesoris',
    name: 'Openback Aluminium',
    desc: 'Profil openback berkualitas dengan seal maksimal. Tersedia ukuran 3" dan 4", dengan atau tanpa stoper.',
    features: ['Openback 3" & 4"', 'Dengan/tanpa stoper', 'Seal optimal', 'Harga kompetitif'],
    icon: Square,
  },
  {
    id: 'transome',
    category: 'Curtainwall',
    name: 'Transome / Curtainwall',
    desc: 'Sistem curtainwall dan transome aluminium untuk gedung komersial, perkantoran, mal, hotel, dan bangunan modern skala besar.',
    features: ['Sistem modular', 'Tahan cuaca', 'Cocok komersial', 'Presisi tinggi'],
    icon: LayoutGrid,
  },
  {
    id: 'custom-bending',
    category: 'Custom',
    name: 'Custom Bending',
    desc: 'Layanan bending aluminium sesuai desain custom Anda. Kami mampu mengerjakan berbagai radius, bentuk elips, setengah lingkaran, dan bentuk lengkung non-standar lainnya.',
    features: ['Radius custom', 'Bentuk non-standar', 'Konsultasi gratis', 'Pengerjaan presisi'],
    icon: Wrench,
  },
]

export default function ProdukPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Produk', item: `${SITE.url}/produk` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="pt-20 lg:pt-24">
        {/* Header */}
        <div className="bg-[#7B3F00] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              Produk Kusen Aluminium Lengkung
            </h1>
            <p className="text-amber-100 text-lg max-w-2xl mx-auto">
              Semua produk diproduksi langsung di pabrik Bekasi kami. Harga kompetitif, kualitas terjamin.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                id={product.id}
                className="bg-white rounded-2xl overflow-hidden flex flex-col border border-[#E8D5B7] hover:border-[#7B3F00] hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              >
                {/* Icon area — identik untuk semua kartu */}
                <div className="h-48 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F5EFE6] to-[#E8D5B7] relative">
                  <product.icon size={48} className="text-[#7B3F00]" />
                  <span className="text-[14px] font-semibold text-[#7B3F00]">{product.name}</span>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-[#D4A853] text-[#2C1810] text-xs font-bold rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-bold text-xl text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-[#6B5B4E] text-sm leading-relaxed mb-4 flex-1">{product.desc}</p>

                  {/* Features */}
                  <ul className="grid grid-cols-2 gap-1.5 mb-5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(`Halo, saya ingin tanya harga ${product.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-[#7B3F00] hover:bg-[#6A3500] text-white font-semibold rounded-xl transition-colors"
                  >
                    <WaIcon />
                    Tanya Harga
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
