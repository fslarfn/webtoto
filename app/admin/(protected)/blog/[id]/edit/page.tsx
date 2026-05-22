'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import type { Post } from '@/types'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-')
}

export default function EditBlogPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [form, setForm] = useState<Partial<Post>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch(`/api/posts/${id}`).then((r) => r.json()).then((data) => {
      setForm(data)
      setLoading(false)
    })
  }, [id])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setForm((prev) => ({ ...prev, thumbnail: data.url }))
    setUploading(false)
  }

  async function handleSubmit(status: Post['status']) {
    setSaving(true)
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, status }),
    })
    setSaving(false)
    router.push('/admin/blog')
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Memuat artikel...</div>

  return (
    <div className="max-w-4xl space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Edit Artikel</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel *</label>
          <input
            type="text"
            value={form.title || ''}
            onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B3F00]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug URL</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">/blog/</span>
            <input
              type="text"
              value={form.slug || ''}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B3F00]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select
              value={form.category || 'Tips'}
              onChange={(e) => setForm({ ...form, category: e.target.value as Post['category'] })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B3F00]"
            >
              <option>Tips</option>
              <option>Tutorial</option>
              <option>Produk</option>
              <option>Inspirasi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-[#F5EFE6] file:text-[#7B3F00] file:font-medium"
            />
            {uploading && <p className="text-xs text-gray-400 mt-1">Mengupload...</p>}
            {form.thumbnail && <p className="text-xs text-green-600 mt-1">✓ {form.thumbnail}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Excerpt <span className="text-gray-400">({(form.excerpt || '').length}/160)</span>
          </label>
          <textarea
            value={form.excerpt || ''}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value.slice(0, 160) })}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B3F00]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Konten Artikel *</label>
          <div data-color-mode="light">
            <MDEditor
              value={form.content || ''}
              onChange={(v) => setForm({ ...form, content: v || '' })}
              height={400}
              preview="live"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description (SEO)</label>
          <textarea
            value={form.metaDescription || ''}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B3F00]"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => handleSubmit('draft')}
            disabled={saving}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            Simpan Draft
          </button>
          <button
            onClick={() => handleSubmit('published')}
            disabled={saving || !form.title}
            className="px-5 py-2 bg-[#7B3F00] text-white rounded-lg text-sm font-medium hover:bg-[#5a2e00] transition-colors disabled:opacity-60"
          >
            {saving ? 'Menyimpan...' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  )
}
