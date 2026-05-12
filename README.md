# CV Toto Aluminium Manufacture — Website

Website profesional Next.js 14 untuk CV Toto Aluminium Manufacture.

---

## LANGKAH 1 — Siapkan File Gambar

Taruh semua file gambar di folder `/public/images/` dengan nama **persis** sebagai berikut:

| Nama File | Digunakan Untuk |
|-----------|-----------------|
| `logo.webp` | Favicon, ikon kecil |
| `logo-full.png` | Navbar, footer, halaman Tentang Kami |
| `hero-all-products.jpg` | Hero section homepage, OG image |
| `product-circle-1.jpg` | Kartu produk Jendela Bulat (sudut kiri) |
| `product-circle-2.jpg` | Galeri Jendela Bulat (sudut depan) |
| `product-arch-1.jpg` | Kartu produk Kusen Jendela Lengkung |
| `product-arch-2.jpg` | Galeri Kusen Jendela Lengkung (tampak depan) |

> Pastikan ekstensi file sudah benar (.webp, .png, .jpg) dan tidak ada spasi di nama file.

---

## LANGKAH 2 — Jalankan Lokal (Testing)

```bash
# Install dependensi (sudah dilakukan jika ada node_modules)
npm install

# Jalankan dev server
npm run dev
```

Buka browser ke: **http://localhost:3000**

---

## LANGKAH 3 — Deploy ke Vercel

### Opsi A — Deploy via Vercel CLI (Recommended)

```bash
# Install Vercel CLI jika belum ada
npm i -g vercel

# Login ke akun Vercel
vercel login

# Deploy (dari folder project)
vercel

# Untuk production deploy
vercel --prod
```

### Opsi B — Deploy via GitHub + Vercel Dashboard

1. Push project ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CV Toto Aluminium website"
   git remote add origin https://github.com/USERNAME/toto-aluminium.git
   git push -u origin main
   ```

2. Buka [vercel.com](https://vercel.com) → **Add New Project**
3. Import repository dari GitHub
4. Vercel otomatis detect Next.js — langsung klik **Deploy**
5. Set custom domain `totoalumuniummanufacture.com` di Settings → Domains

### Pengaturan Domain Custom di Vercel

1. Di Vercel Dashboard → Project → Settings → Domains
2. Tambahkan: `totoalumuniummanufacture.com` dan `www.totoalumuniummanufacture.com`
3. Update DNS di registrar domain:
   - Tambah record **A** → `76.76.21.21` (Vercel IP)
   - Tambah record **CNAME** untuk `www` → `cname.vercel-dns.com`

---

## LANGKAH 4 — Menambah Video TikTok Baru

Edit file: `lib/constants.ts`

Cari section `TIKTOK_VIDEOS` dan tambah/ganti video:

```typescript
export const TIKTOK_VIDEOS = [
  {
    id: '7535009708495654149',   // ← ID video (dari URL TikTok)
    url: 'https://www.tiktok.com/@toto.alumunium.ma/video/7535009708495654149',
    caption: 'Proses produksi kusen aluminium lengkung custom',
  },
  {
    id: '7579121700407905557',
    url: 'https://www.tiktok.com/@toto.alumunium.ma/video/7579121700407905557',
    caption: 'Hasil karya kusen aluminium terbaru kami',
  },
  // Tambah video baru di sini:
  {
    id: 'ID_VIDEO_BARU',        // ← Ambil dari URL video TikTok
    url: 'https://www.tiktok.com/@toto.alumunium.ma/video/ID_VIDEO_BARU',
    caption: 'Deskripsi video baru',
  },
]
```

**Cara mendapatkan ID video TikTok:**
- Buka video di TikTok
- Salin URL: `https://www.tiktok.com/@toto.alumunium.ma/video/1234567890`
- Angka di akhir URL = ID video

---

## Struktur File Penting

```
websitebaru/
├── app/                          ← Semua halaman
│   ├── page.tsx                  ← Homepage (/)
│   ├── produk/page.tsx           ← /produk
│   ├── harga/page.tsx            ← /harga
│   ├── galeri/page.tsx           ← /galeri
│   ├── tentang-kami/page.tsx     ← /tentang-kami
│   ├── kontak/page.tsx           ← /kontak
│   ├── blog/                     ← /blog dan artikel
│   ├── kusen-aluminium-lengkung-bekasi/   ← Halaman SEO kota
│   ├── kusen-aluminium-lengkung-jakarta/
│   ├── kusen-aluminium-lengkung-bandung/
│   ├── kusen-aluminium-lengkung-surabaya/
│   └── kusen-aluminium-lengkung-bogor/
├── components/                   ← Komponen reusable
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── FloatingWA.tsx
│   ├── CityPage.tsx              ← Template halaman kota SEO
│   └── home/                    ← Section-section homepage
├── lib/
│   └── constants.ts              ← ← EDIT DI SINI untuk kontak, TikTok, dll
├── public/images/                ← ← TARUH FOTO DI SINI
└── next-sitemap.config.js        ← Konfigurasi sitemap
```

---

## Konfigurasi Penting di `lib/constants.ts`

Untuk mengubah nomor WA, alamat, TikTok, atau URL website:

```typescript
export const SITE = {
  name: 'CV Toto Aluminium Manufacture',
  phone: '0813-1191-2002',        // ← Nomor tampil
  phoneRaw: '6281311912002',      // ← Kode negara + nomor tanpa 0
  whatsappMsg: 'Halo, saya ingin konsultasi...',  // ← Pesan default WA
  address: 'Jl. Rawa Mulya No.15...',
  tiktok: '@toto.alumunium.ma',
  tiktokUrl: 'https://www.tiktok.com/@toto.alumunium.ma',
  url: 'https://totoalumuniummanufacture.com',    // ← Ganti ke domain Anda
}
```

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3
- **Language:** TypeScript
- **Lightbox:** yet-another-react-lightbox
- **Icons:** lucide-react
- **SEO:** next-sitemap, Schema.org JSON-LD
- **Deploy:** Vercel
