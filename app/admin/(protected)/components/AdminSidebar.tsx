'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Image, DollarSign, MessageSquare, ChevronRight } from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog & Artikel', icon: FileText },
  { href: '/admin/galeri', label: 'Galeri', icon: Image },
  { href: '/admin/harga', label: 'Kelola Harga', icon: DollarSign },
  { href: '/admin/pesan', label: 'Pesan Masuk', icon: MessageSquare },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 bg-[#7B3F00] text-white flex flex-col shrink-0">
      <div className="p-5 border-b border-[#5a2e00]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[#7B3F00] font-black text-lg">T</span>
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">CV Toto Aluminium</p>
            <p className="text-amber-200 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-white text-[#7B3F00]'
                  : 'text-amber-100 hover:bg-[#5a2e00]'
              }`}
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} />}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-[#5a2e00]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 text-xs text-amber-200 hover:text-white transition-colors"
        >
          <span>← Lihat Website</span>
        </Link>
      </div>
    </aside>
  )
}
