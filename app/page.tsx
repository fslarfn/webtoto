import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ProductSection from '@/components/home/ProductSection'
import WhyUsSection from '@/components/home/WhyUsSection'
import GalleryPreview from '@/components/home/GalleryPreview'
import TikTokFeed from '@/components/TikTokFeed'
import TestimoniSection from '@/components/home/TestimoniSection'
import FaqSection from '@/components/home/FaqSection'
import CtaBottom from '@/components/home/CtaBottom'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Produsen Kusen Aluminium Lengkung Terpercaya Se-Indonesia | CV Toto Aluminium',
  description:
    'CV Toto Aluminium Manufacture — Produsen kusen aluminium lengkung custom, jendela bulat, pintu lengkung. Harga langsung pabrik Bekasi, melayani seluruh Indonesia. WA: 0813-1191-2002.',
  alternates: { canonical: SITE.url },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductSection />
      <WhyUsSection />
      <GalleryPreview />
      <TikTokFeed />
      <TestimoniSection />
      <FaqSection />
      <CtaBottom />
    </>
  )
}
