import { readDB } from '@/lib/db'
import type { Post, Message, GalleryItem } from '@/types'
import Link from 'next/link'
import { FileText, Image, MessageSquare, Plus } from 'lucide-react'

export default function DashboardPage() {
  const posts = readDB<Post>('posts.json')
  const messages = readDB<Message>('messages.json')
  const gallery = readDB<GalleryItem>('gallery.json')

  const publishedCount = posts.filter((p) => p.status === 'published').length
  const newMessages = messages.filter((m) => m.status === 'baru').length
  const recentPosts = [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)

  const stats = [
    { label: 'Total Artikel', value: posts.length, sub: `${publishedCount} published`, icon: FileText, color: 'bg-blue-50 text-blue-700' },
    { label: 'Total Foto Galeri', value: gallery.length, sub: 'foto tersimpan', icon: Image, color: 'bg-green-50 text-green-700' },
    { label: 'Pesan Masuk', value: messages.length, sub: `${newMessages} belum dibaca`, icon: MessageSquare, color: 'bg-amber-50 text-amber-700' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Ringkasan aktivitas website CV Toto Aluminium</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
              </div>
              <div className={`p-2 rounded-lg ${s.color}`}>
                <s.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/blog/new" className="flex items-center gap-2 px-4 py-2 bg-[#7B3F00] text-white rounded-lg text-sm font-medium hover:bg-[#5a2e00] transition-colors">
            <Plus size={16} /> Tulis Artikel Baru
          </Link>
          <Link href="/admin/galeri" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            <Plus size={16} /> Upload Foto
          </Link>
          <Link href="/admin/pesan" className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
            <MessageSquare size={16} /> Lihat Pesan
          </Link>
        </div>
      </div>

      {/* Recent articles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Artikel Terbaru</h2>
          <Link href="/admin/blog" className="text-sm text-[#7B3F00] hover:underline">Lihat Semua</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentPosts.length === 0 && (
            <p className="px-5 py-4 text-sm text-gray-500">Belum ada artikel.</p>
          )}
          {recentPosts.map((post) => (
            <div key={post.id} className="px-5 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{post.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{post.createdAt}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {post.status === 'published' ? 'Published' : 'Draft'}
                </span>
                <Link href={`/admin/blog/${post.id}/edit`} className="text-xs text-[#7B3F00] hover:underline">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
