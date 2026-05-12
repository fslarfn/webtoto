import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWA from '@/components/FloatingWA'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Kusen Aluminium Lengkung Terpercaya Se-Indonesia`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
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
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Kusen Aluminium Lengkung Terpercaya`,
    description: SITE.description,
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
    title: `${SITE.name} | Kusen Aluminium Lengkung`,
    description: SITE.description,
    images: ['/images/hero-all-products.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE.url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/images/logo.webp" type="image/webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: SITE.name,
              description: SITE.description,
              url: SITE.url,
              telephone: SITE.phone,
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
              image: `${SITE.url}/images/hero-all-products.jpg`,
              priceRange: '$$',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '127',
              },
            }),
          }}
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
