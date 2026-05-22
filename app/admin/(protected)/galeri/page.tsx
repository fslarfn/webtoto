'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Upload, Trash2, X } from 'lucide-react'
import type { GalleryItem } from '@/types'

export default function GaleriAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ altText: '', produk: '', kategori: 'Kusen Lengkung' })
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    fetch('/api/gallery').then((r) => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleUpload() {
    if (!selectedFile) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', selectedFile)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const { url } = await res.json()

    const newItem = {
      filename: selectedFile.name,
      url,
      altText: form.altText || selectedFile.name,
      produk: form.produk,
      kategori: form.kategori,
      createdAt: new Date().toISOString(),
    }

    const saveRes = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
    const saved = await saveRes.json()
    setItems((prev) => [saved, ...prev])
    setSelectedFile(null)
    setPreview(null)
    setForm({ altText: '', produk: '', kategori: 'Kusen Lengkung' })
    setUploading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus foto ini?')) return
    await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kelola Galeri</h1>
        <p className="text-gray-500 text-sm mt-1">{items.length} foto tersimpan</p>
      </div>

      {/* Upload form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Upload Foto Baru</h2>
        <div className="space-y-4">
          <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#7B3F00] transition-colors">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            {preview ? (
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="preview" className="max-h-40 mx-auto rounded-lg object-cover" />
                <button
                  onClick={(e) => { e.preventDefault(); setPreview(null); setSelectedFile(null) }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Upload size={32} />
                <p className="text-sm">Klik atau drag & drop gambar di sini</p>
                <p className="text-xs">JPG, PNG, WebP — maks. 5MB</p>
              </div>
            )}
          </label>

          {selectedFile && (
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                value={form.produk}
                onChange={(e) => setForm({ ...form, produk: e.target.value })}
                placeholder="Nama produk"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B3F00]"
              />
              <input
                type="text"
                value={form.altText}
                onChange={(e) => setForm({ ...form, altText: e.target.value })}
                placeholder="Alt text"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B3F00]"
              />
              <select
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B3F00]"
              >
                <option>Kusen Lengkung</option>
                <option>Jendela Bulat</option>
                <option>Pintu Lengkung</option>
                <option>Ornamen</option>
                <option>Lainnya</option>
              </select>
            </div>
          )}

          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-5 py-2 bg-[#7B3F00] text-white rounded-lg text-sm font-medium hover:bg-[#5a2e00] disabled:opacity-60 transition-colors"
            >
              {uploading ? 'Mengupload...' : 'Upload Foto'}
            </button>
          )}
        </div>
      </div>

      {/* Gallery grid */}
      {items.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-12">Belum ada foto. Upload foto pertama Anda.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group relative">
              <div className="relative h-40">
                <Image src={item.url} alt={item.altText} fill className="object-cover" />
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate">{item.produk || item.filename}</p>
                <p className="text-xs text-gray-400">{item.kategori}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
