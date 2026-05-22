'use client'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
      <p className="text-sm text-gray-600">
        Selamat datang, <span className="font-semibold text-gray-900">Admin</span>
      </p>
      <button
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  )
}
