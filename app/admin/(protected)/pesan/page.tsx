'use client'
import { useState, useEffect } from 'react'
import type { Message } from '@/types'
import { Eye, Trash2, X } from 'lucide-react'

export default function PesanAdminPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)

  useEffect(() => {
    fetch('/api/messages').then((r) => r.json()).then((d) => { setMessages(d); setLoading(false) })
  }, [])

  async function markRead(id: string) {
    await fetch('/api/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'dibaca' }),
    })
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: 'dibaca' } : m))
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus pesan ini?')) return
    await fetch('/api/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, delete: true }),
    })
    setMessages((prev) => prev.filter((m) => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  function handleView(msg: Message) {
    setSelected(msg)
    if (msg.status === 'baru') markRead(msg.id)
  }

  const newCount = messages.filter((m) => m.status === 'baru').length

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pesan Masuk</h1>
        <p className="text-gray-500 text-sm mt-1">{messages.length} total • {newCount} belum dibaca</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Memuat...</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">Belum ada pesan masuk.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-700">Nama</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Telepon</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Pesan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Tanggal</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="text-right px-5 py-3 font-medium text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {messages.map((msg) => (
                <tr key={msg.id} className={`hover:bg-gray-50 ${msg.status === 'baru' ? 'bg-amber-50/50' : ''}`}>
                  <td className="px-5 py-3 font-medium text-gray-900">{msg.nama}</td>
                  <td className="px-4 py-3 text-gray-600">{msg.telepon}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{msg.pesan}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${msg.status === 'baru' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                      {msg.status === 'baru' ? 'Baru' : 'Dibaca'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleView(msg)}
                        className="p-1.5 text-[#7B3F00] hover:bg-[#F5EFE6] rounded-lg transition-colors"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
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

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Detail Pesan</h3>
              <button onClick={() => setSelected(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Nama:</span>
                <span className="text-gray-900 ml-2">{selected.nama}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Telepon:</span>
                <span className="text-gray-900 ml-2">{selected.telepon}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Tanggal:</span>
                <span className="text-gray-500 ml-2">{new Date(selected.createdAt).toLocaleString('id-ID')}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700 block mb-1">Pesan:</span>
                <p className="bg-gray-50 rounded-lg p-3 text-gray-800 leading-relaxed">{selected.pesan}</p>
              </div>
            </div>
            <a
              href={`https://wa.me/${selected.telepon.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Balas via WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
