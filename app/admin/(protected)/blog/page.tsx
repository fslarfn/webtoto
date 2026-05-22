'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Post } from '@/types'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts').then((r) => r.json()).then((data) => {
      setPosts(data)
      setLoading(false)
    })
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Hapus artikel ini?')) return
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  const filtered = posts.filter((p) => filter === 'all' || p.status === filter)
  const sorted = [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog & Artikel</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} artikel total</p>
        </div>
        <Link href="/admin/blog/new" className="flex items-center gap-2 px-4 py-2 bg-[#7B3F00] text-white rounded-lg text-sm font-medium hover:bg-[#5a2e00] transition-colors">
          <Plus size={16} /> Tulis Artikel Baru
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'published', 'draft'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-[#7B3F00] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {f === 'all' ? 'Semua' : f === 'published' ? 'Published' : 'Draft'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Memuat...</div>
        ) : sorted.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">Tidak ada artikel.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-700">Judul</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Kategori</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Tanggal</th>
                <th className="text-right px-5 py-3 font-medium text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sorted.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900 truncate max-w-xs">{post.title}</p>
                    <p className="text-xs text-gray-400">/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{post.category}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{post.createdAt}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/blog/${post.id}/edit`} className="p-1.5 text-[#7B3F00] hover:bg-[#F5EFE6] rounded-lg transition-colors">
                        <Pencil size={15} />
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
