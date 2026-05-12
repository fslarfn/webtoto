export const SITE = {
  name: 'CV Toto Aluminium Manufacture',
  tagline: 'Produsen Kusen Lengkung Terpercaya Se-Indonesia',
  description:
    'Menyediakan berbagai kebutuhan kusen dan pintu aluminium lengkung custom. Harga langsung pabrik, melayani seluruh Indonesia.',
  url: 'https://totoalumuniummanufacture.com',
  phone: '0813-1191-2002',
  phoneRaw: '6281311912002',
  whatsappMsg: 'Halo, saya ingin konsultasi tentang kusen aluminium lengkung',
  address: 'Jl. Rawa Mulya No.15 RT 002/001, Mustika Jaya, Kec. Mustika Jaya, Kota Bekasi, Jawa Barat 17158',
  tiktok: '@toto.alumunium.ma',
  tiktokUrl: 'https://www.tiktok.com/@toto.alumunium.ma',
  email: 'info@totoalumuniummanufacture.com',
}

export const WA_URL = `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(SITE.whatsappMsg)}`

export const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Produk', href: '/produk' },
  { label: 'Harga', href: '/harga' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tentang Kami', href: '/tentang-kami' },
  { label: 'Kontak', href: '/kontak' },
]

export const TIKTOK_VIDEOS = [
  {
    id: '7535009708495654149',
    url: 'https://www.tiktok.com/@toto.alumunium.ma/video/7535009708495654149',
    caption: 'Proses produksi kusen aluminium lengkung custom',
  },
  {
    id: '7579121700407905557',
    url: 'https://www.tiktok.com/@toto.alumunium.ma/video/7579121700407905557',
    caption: 'Hasil karya kusen aluminium terbaru kami',
  },
  {
    id: '7535009708495654149',
    url: 'https://www.tiktok.com/@toto.alumunium.ma/video/7535009708495654149',
    caption: 'Tips memilih kusen aluminium berkualitas',
  },
]
