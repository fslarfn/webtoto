export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store"],
  "@id": "https://totoaluminiummanufacture.com/#business",
  "name": "CV Toto Aluminium Manufacture",
  "alternateName": "Toto Aluminium",
  "description": "Produsen kusen aluminium lengkung custom, jendela bulat, pintu lengkung. Harga langsung pabrik Bekasi, melayani seluruh Indonesia.",
  "url": "https://totoaluminiummanufacture.com",
  "telephone": "+62-813-1191-2002",
  "logo": {
    "@type": "ImageObject",
    "url": "https://totoaluminiummanufacture.com/images/logo-full.png",
    "width": 300,
    "height": 80
  },
  "image": [
    "https://totoaluminiummanufacture.com/images/hero-all-products.jpg",
    "https://totoaluminiummanufacture.com/images/product-circle-1.jpg",
    "https://totoaluminiummanufacture.com/images/product-arch-1.jpg"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Rawa Mulya No.15 RT 002/001",
    "addressLocality": "Mustika Jaya",
    "addressRegion": "Bekasi",
    "postalCode": "17158",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.3297,
    "longitude": 107.0214
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "Rp 150.000 - Rp 400.000",
  "currenciesAccepted": "IDR",
  "paymentAccepted": "Cash, Transfer Bank",
  "areaServed": { "@type": "Country", "name": "Indonesia" },
  "sameAs": [
    "https://www.tiktok.com/@toto.alumunium.ma",
    "https://www.indonetwork.co.id/company/toto-alumunium-manufacture"
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://totoaluminiummanufacture.com/#website",
  "url": "https://totoaluminiummanufacture.com",
  "name": "CV Toto Aluminium Manufacture",
  "description": "Produsen kusen aluminium lengkung terpercaya se-Indonesia",
  "publisher": { "@id": "https://totoaluminiummanufacture.com/#business" },
  "inLanguage": "id-ID"
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Berapa harga kusen aluminium lengkung per meter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Harga kusen aluminium lengkung CV Toto mulai dari Rp 150.000 per meter untuk profil 3 inch varian MF, hingga Rp 490.000 per meter untuk profil 4 inch Openback+Stoper varian Serat Kayu. Harga bervariasi tergantung jenis profil, ukuran, dan varian finishing. Hubungi kami di WA 0813-1191-2002 untuk penawaran spesifik."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah bisa memesan dengan ukuran custom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, CV Toto melayani pesanan custom sesuai ukuran dan desain spesifik Anda termasuk radius, ukuran, dan bentuk apapun sesuai gambar kerja arsitek."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah bisa dikirim ke luar Bekasi atau Jabodetabek?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, CV Toto Aluminium Manufacture melayani pengiriman ke seluruh Indonesia dengan packing kayu dan bubble wrap untuk memastikan produk tiba dalam kondisi sempurna."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa lama waktu produksi kusen aluminium lengkung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Waktu produksi standar adalah 7-14 hari kerja tergantung kompleksitas desain dan jumlah pesanan. Untuk pesanan urgent bisa dikonsultasikan melalui WhatsApp 0813-1191-2002."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah produk dilengkapi garansi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, setiap produk CV Toto Aluminium Manufacture dilengkapi garansi kualitas. Jika ada cacat produksi atau ketidaksesuaian pesanan, kami siap memberikan solusi terbaik."
      }
    }
  ]
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export function productSchema(name: string, description: string, image: string, url: string, price: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "brand": { "@type": "Brand", "name": "CV Toto Aluminium Manufacture" },
    "image": image,
    "url": url,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "IDR",
      "price": price,
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "CV Toto Aluminium Manufacture" }
    }
  }
}
