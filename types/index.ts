export interface Post {
  id: string
  title: string
  slug: string
  category: 'Tips' | 'Tutorial' | 'Produk' | 'Inspirasi'
  excerpt: string
  content: string
  thumbnail: string
  metaDescription: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface Price {
  id: string
  produk: string
  warnaUmum: string
  ykk: string
  mf: string
  note?: string
}

export interface Message {
  id: string
  nama: string
  telepon: string
  pesan: string
  createdAt: string
  status: 'baru' | 'dibaca'
}

export interface GalleryItem {
  id: string
  filename: string
  url: string
  altText: string
  produk: string
  kategori: string
  createdAt: string
}
