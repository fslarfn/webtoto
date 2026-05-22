import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWA from '@/components/FloatingWA'
import { siteConfig } from '@/lib/config'
import JsonLd from '@/components/JsonLd'
import { localBusinessSchema, websiteSchema } from '@/lib/schema'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Kusen Aluminium Lengkung Terpercaya Se-Indonesia`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'kusen aluminium lengkung',
    'kusen lengkung custom',
    'pintu aluminium lengkung',
    'jendela bulat aluminium',
    'produsen kusen aluminium',
    'kusen aluminium bekasi',
    'harga kusen aluminium',
    'kusen aluminium murah',
    'CV Toto Aluminium Manufacture',
    'toto aluminium',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Kusen Aluminium Lengkung Terpercaya`,
    description: siteConfig.description,
    images: [
      {
        url: '/images/hero-all-products.jpg',
        width: 1200,
        height: 630,
        alt: 'Produk kusen aluminium lengkung CV Toto Aluminium Manufacture Bekasi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Kusen Aluminium Lengkung`,
    description: siteConfig.description,
    images: ['/images/hero-all-products.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/images/logo.webp" type="image/webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd schema={[localBusinessSchema, websiteSchema]} />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWA />
      </body>
    </html>
  )
}
