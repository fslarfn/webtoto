import { Factory, Ruler, Truck, Shield } from 'lucide-react'

const reasons = [
  {
    icon: Factory,
    title: 'Pabrik Langsung',
    desc: 'Harga terjangkau karena langsung dari produsen tanpa perantara. Produksi sendiri di Bekasi sejak lebih dari 10 tahun.',
  },
  {
    icon: Ruler,
    title: 'Custom Desain',
    desc: 'Kami siap mengerjakan kusen aluminium sesuai desain dan ukuran spesifik Anda, termasuk bentuk lengkung non-standar.',
  },
  {
    icon: Truck,
    title: 'Kirim Se-Indonesia',
    desc: 'Pengiriman ke seluruh Indonesia menggunakan ekspedisi terpercaya. Produk dikemas aman agar tiba dalam kondisi sempurna.',
  },
  {
    icon: Shield,
    title: 'Bergaransi',
    desc: 'Setiap produk dijamin kualitasnya. Kami memberikan garansi dan siap membantu jika ada kendala setelah pemasangan.',
  },
]

export default function WhyUsSection() {
  return (
    <section className="py-16 bg-white">
      <hr className="section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-10">
          <h2 className="section-title">Mengapa Pilih Kami?</h2>
          <p className="section-subtitle">
            CV Toto Aluminium Manufacture adalah pilihan terpercaya ribuan pelanggan dari Sabang
            sampai Merauke.
          </p>
        </div>

        {/* Grid: 1 col mobile → 2 col tablet → 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="text-center p-6 rounded-2xl border border-[#E8D5B7] bg-white hover:border-[#7B3F00] hover:bg-[#F5EFE6] hover:shadow-lg transition-all duration-200 cursor-default"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F5EFE6] mb-4 group-hover:bg-[#7B3F00]">
                <Icon size={30} className="text-[#7B3F00]" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 font-sans">{title}</h3>
              <p className="text-sm leading-relaxed text-[#6B5B4E]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
