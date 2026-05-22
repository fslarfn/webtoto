'use client'
import { useState, useEffect } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import type { Price } from '@/types'

export default function HargaAdminPage() {
  const [prices, setPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [editing, setEditing] = useState<{ id: string; field: string } | null>(null)

  useEffect(() => {
    fetch('/api/prices').then((r) => r.json()).then((d) => { setPrices(d); setLoading(false) })
  }, [])

  function handleEdit(id: string, field: keyof Price, value: string) {
    setPrices((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p))
  }

  async function handleSave() {
    setSaving(true)
    await fetch('/api/prices', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prices),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Memuat...</div>

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Harga</h1>
          <p className="text-gray-500 text-sm mt-1">Klik sel harga untuk mengedit langsung</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-[#7B3F00] text-white rounded-lg text-sm font-medium hover:bg-[#5a2e00] transition-colors disabled:opacity-60"
        >
          {saved ? (
            <><CheckCircle size={16} /> Tersimpan!</>
          ) : saving ? (
            'Menyimpan...'
          ) : (
            <><Save size={16} /> Simpan Perubahan</>
          )}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#7B3F00] text-white">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Produk</th>
              <th className="text-center px-4 py-3 font-medium">Warna Umum/m</th>
              <th className="text-center px-4 py-3 font-medium">YKK/m</th>
              <th className="text-center px-4 py-3 font-medium">MF/m</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prices.map((p, i) => (
              <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9F6F2]'}>
                <td className="px-5 py-3 font-medium text-gray-900">{p.produk}</td>
                {(['warnaUmum', 'ykk', 'mf'] as const).map((field) => (
                  <td key={field} className="px-4 py-2 text-center">
                    {editing?.id === p.id && editing.field === field ? (
                      <input
                        autoFocus
                        type="text"
                        value={p[field] || ''}
                        onChange={(e) => handleEdit(p.id, field, e.target.value)}
                        onBlur={() => setEditing(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditing(null)}
                        className="w-28 text-center border border-[#7B3F00] rounded px-2 py-1 text-sm focus:outline-none"
                      />
                    ) : (
                      <span
                        onClick={() => setEditing({ id: p.id, field })}
                        className="cursor-pointer hover:bg-amber-50 px-2 py-1 rounded transition-colors inline-block min-w-[80px]"
                      >
                        {p[field] ? `Rp ${p[field]}/m` : <span className="text-gray-400">—</span>}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400">Perubahan harga akan langsung tampil di halaman /harga publik setelah disimpan.</p>
    </div>
  )
}
