'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, WA_URL, SITE } from '@/lib/constants'
import clsx from 'clsx'

function WaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300',
        scrolled ? 'shadow-[0_1px_8px_rgba(0,0,0,0.08)]' : 'shadow-none'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="CV Toto Aluminium Manufacture">
            <Image
              src="/images/logo-full.png"
              alt="CV Toto Aluminium Manufacture"
              width={180}
              height={46}
              className="h-9 lg:h-11 w-auto object-contain"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.insertAdjacentHTML(
                    'beforeend',
                    '<span class="text-[#7B3F00] font-bold text-sm leading-tight">CV Toto<br/>Aluminium</span>'
                  )
                }
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#1A1A1A] hover:text-[#7B3F00] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right — WA button + hamburger */}
          <div className="flex items-center gap-2">
            {/* Desktop WA button */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-[#7B3F00] text-white text-sm font-semibold rounded-lg hover:bg-[#6A3500] transition-colors"
            >
              <WaIcon size={15} />
              WhatsApp
            </a>

            {/* Mobile WA icon only */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden flex items-center justify-center w-9 h-9 bg-[#7B3F00] text-white rounded-lg hover:bg-[#6A3500] transition-colors"
              aria-label="WhatsApp"
            >
              <WaIcon size={17} />
            </a>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 text-[#1A1A1A] rounded-lg hover:bg-[#F5EFE6] transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#E8D5B7] shadow-lg">
          <nav className="flex flex-col px-4 py-3 gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-3 text-[#1A1A1A] font-medium border-b border-[#F5EFE6] last:border-0 hover:text-[#7B3F00] hover:bg-[#F5EFE6] rounded-lg transition-colors text-sm"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 py-3 bg-[#7B3F00] text-white font-semibold rounded-lg hover:bg-[#6A3500] transition-colors text-sm"
              onClick={() => setOpen(false)}
            >
              <WaIcon size={17} />
              Konsultasi via WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
