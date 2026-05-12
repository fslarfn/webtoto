import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWA from '@/components/FloatingWA'
import { siteConfig } from '@/lib/config'

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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Rawa Mulya No.15 RT 002/001',
      addressLocality: 'Mustika Jaya',
      addressRegion: 'Jawa Barat',
      postalCode: '17158',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.2797,
      longitude: 107.0086,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    image: `${siteConfig.url}/images/hero-all-products.jpg`,
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  }

  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/images/logo.webp" type="image/webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
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
