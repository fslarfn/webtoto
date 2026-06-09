'use client'
import { useState, useEffect } from 'react'
import { Upload, FileText, Trash2, ExternalLink, Download } from 'lucide-react'

export default function HargaAdminPage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetch('/api/price-pdf')
      .then((r) => r.json())
      .then((d) => { setPdfUrl(d.url); setLoading(false) })
  }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Hanya file PDF yang diizinkan')
      return
    }
    setUploading(true)
    setError('')
    setSuccess('')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/price-pdf', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (res.ok) {
      setPdfUrl(data.url)
      setSuccess('PDF berhasil diupload dan sekarang tampil di halaman /harga')
      e.target.value = ''
    } else {
      setError(`Upload gagal: ${data.error || 'Unknown error'} (status ${res.status})`)
    }
  }

  async function handleDelete() {
    if (!confirm('Hapus file PDF harga? Halaman /harga akan kosong.')) return
    await fetch('/api/price-pdf', { method: 'DELETE' })
    setPdfUrl(null)
    setSuccess('PDF berhasil dihapus')
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Memuat...</div>

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kelola Harga PDF</h1>
        <p className="text-gray-500 text-sm mt-1">
          Upload file PDF daftar harga — pengunjung bisa lihat dan download di halaman /harga
        </p>
      </div>

      {/* Status aktif */}
      {pdfUrl ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <FileText size={24} className="text-green-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">PDF Aktif</p>
              <p className="text-xs text-gray-500 truncate mt-0.5">{pdfUrl}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              <ExternalLink size={15} /> Preview PDF
            </a>
            <a
              href={pdfUrl}
              download
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              <Download size={15} /> Download
            </a>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              <Trash2 size={15} /> Hapus PDF
            </button>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Ganti dengan PDF baru:</p>
            <label className={`flex items-center gap-3 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${uploading ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-[#7B3F00]'}`}>
              <Upload size={18} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                {uploading ? 'Mengupload...' : 'Pilih file PDF baru'}
              </span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        /* Upload area kosong */
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <label className={`flex flex-col items-center gap-4 p-10 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-[#7B3F00] hover:bg-[#F5EFE6]/30'}`}>
            <div className="p-4 bg-[#F5EFE6] rounded-full">
              <Upload size={28} className="text-[#7B3F00]" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">
                {uploading ? 'Mengupload PDF...' : 'Upload PDF Daftar Harga'}
              </p>
              <p className="text-sm text-gray-500 mt-1">Klik untuk pilih file PDF dari komputer Anda</p>
              <p className="text-xs text-gray-400 mt-2">Hanya file .pdf</p>
            </div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Feedback */}
      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          {success}
        </div>
      )}

      <p className="text-xs text-gray-400">
        PDF diupload ke Supabase Storage dan langsung tersedia di halaman /harga.
      </p>
    </div>
  )
}
