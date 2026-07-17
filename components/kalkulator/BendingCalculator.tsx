'use client'

import { useState, useEffect, useMemo } from 'react'
import { MessageCircle, Plus, Minus, Trash2, ChevronDown, Info } from 'lucide-react'
import clsx from 'clsx'
import { SITE } from '@/lib/constants'
import {
  calculate,
  METHODS,
  FORMULA_HINTS,
  type MethodId,
  type EstimateItem,
  fmtMeterFull,
  fmtMeter,
  fmtSize,
  roundMeter,
  itemTotalMeter,
  formatEstimateMessage,
  formatItemLine,
  parseNum,
} from '@/lib/bending'

// ---------- Tipe data produk (nama saja, tanpa harga — sumber: data/prices.json admin) ----------

export interface CalcProduct {
  id: string
  produk: string
}

const STORAGE_KEY = 'toto.kalkulator.daftar.v2'

function waUrlFor(text: string): string {
  return `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(text)}`
}

// ---------- Ilustrasi bentuk untuk tiap metode ----------

function ShapeIcon({ method, active }: { method: MethodId; active: boolean }) {
  const stroke = active ? '#7B3F00' : '#A89680'
  const common = {
    fill: 'none',
    stroke,
    strokeWidth: 2.5,
    strokeLinecap: 'round' as const,
  }
  if (method === 1) {
    // Busur dangkal — kurang dari setengah lingkaran
    return (
      <svg viewBox="0 0 64 40" className="w-full h-9" aria-hidden="true">
        <path d="M6 34 Q32 4 58 34" {...common} />
        <line x1="6" y1="34" x2="58" y2="34" stroke={stroke} strokeWidth="2" strokeDasharray="3 4" />
      </svg>
    )
  }
  if (method === 2) {
    // Setengah lingkaran pas
    return (
      <svg viewBox="0 0 64 40" className="w-full h-9" aria-hidden="true">
        <path d="M8 36 A24 24 0 0 1 56 36" {...common} />
        <line x1="8" y1="36" x2="56" y2="36" stroke={stroke} strokeWidth="2" strokeDasharray="3 4" />
      </svg>
    )
  }
  // Lebih dari setengah — lengkung + sisi lurus (bentuk pintu arch)
  return (
    <svg viewBox="0 0 64 40" className="w-full h-9" aria-hidden="true">
      <path d="M12 36 L12 22 A20 20 0 0 1 52 22 L52 36" {...common} />
      <line x1="12" y1="36" x2="52" y2="36" stroke={stroke} strokeWidth="2" strokeDasharray="3 4" />
    </svg>
  )
}

// ---------- Komponen utama ----------

export default function BendingCalculator({ products }: { products: CalcProduct[] }) {
  const [method, setMethod] = useState<MethodId>(1)
  const [lebar, setLebar] = useState('')
  const [tinggi, setTinggi] = useState('')
  const [productId, setProductId] = useState('')
  const [qty, setQty] = useState(1)
  const [items, setItems] = useState<EstimateItem[]>([])
  const [loaded, setLoaded] = useState(false)

  // Muat daftar dari localStorage (sekali, di client)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      /* abaikan data korup */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage penuh/di-block — tidak fatal */
    }
  }, [items, loaded])

  // Metode 2: tinggi otomatis = lebar ÷ 2
  useEffect(() => {
    if (method === 2 && lebar) {
      const half = parseNum(lebar) / 2
      if (!isNaN(half)) setTinggi(String(half))
    }
  }, [method, lebar])

  const result = useMemo(() => calculate(method, lebar, tinggi), [method, lebar, tinggi])

  const product = products.find((p) => p.id === productId)

  const meterPerPcs = result.ok ? roundMeter(result.cm) : 0
  const totalMeter = meterPerPcs * qty

  const currentItem: EstimateItem | null = result.ok
    ? {
        id: 'current',
        productName: product?.produk ?? '',
        method,
        lebar: parseNum(lebar),
        tinggi: parseNum(tinggi),
        qty,
        cmPerPcs: result.cm,
      }
    : null

  const singleWaMsg = currentItem
    ? 'Halo, saya sudah hitung kebutuhan material lewat kalkulator di website. Mohon info harga untuk:\n\n' +
      formatItemLine(currentItem)
    : ''

  const handleAdd = () => {
    if (!currentItem) return
    setItems((prev) => [...prev, { ...currentItem, id: 'q' + Date.now() }])
    setLebar('')
    setTinggi('')
    setQty(1)
  }

  const handleRemove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))

  const listTotalMeter = items.reduce((sum, it) => sum + itemTotalMeter(it), 0)
  const listWaUrl = waUrlFor(formatEstimateMessage(items))

  return (
    <div className="grid lg:grid-cols-5 gap-8 items-start">
      {/* ===== Kolom kiri: form kalkulator ===== */}
      <div className="lg:col-span-3 bg-white rounded-2xl shadow-md border border-[#E8D5B7] p-6 sm:p-8 space-y-6">
        {/* Pilih metode */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
            1. Pilih bentuk lengkungan
          </label>
          <div className="grid grid-cols-3 gap-3">
            {([1, 2, 3] as MethodId[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={clsx(
                  'p-3 rounded-xl border-2 text-center transition-all',
                  method === m
                    ? 'border-[#7B3F00] bg-[#F5EFE6]'
                    : 'border-[#E8D5B7] bg-white hover:border-[#C4956A]'
                )}
                aria-pressed={method === m}
              >
                <ShapeIcon method={m} active={method === m} />
                <div
                  className={clsx(
                    'text-xs font-medium mt-2 leading-tight',
                    method === m ? 'text-[#7B3F00]' : 'text-[#6B5B4E]'
                  )}
                >
                  {METHODS[m].label}
                </div>
                <div className="text-[10px] text-[#A89680] mt-1 leading-tight">
                  {METHODS[m].desc}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-2.5 px-3 py-2 bg-[#F5EFE6] rounded-lg text-xs font-mono text-[#6B5B4E]">
            Rumus: {FORMULA_HINTS[method]}
          </div>
        </div>

        {/* Ukuran */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">2. Masukkan ukuran</label>
          <div className="grid grid-cols-2 gap-4">
            <SizeInput label="Lebar" value={lebar} onChange={setLebar} />
            <SizeInput
              label={method === 2 ? 'Tinggi (otomatis)' : 'Tinggi'}
              value={tinggi}
              onChange={setTinggi}
              disabled={method === 2}
            />
          </div>
        </div>

        {/* Produk (opsional) + jumlah */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="calc-product" className="block text-sm font-semibold text-[#1A1A1A] mb-3">
              3. Produk <span className="font-normal text-[#A89680]">(opsional)</span>
            </label>
            <select
              id="calc-product"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full bg-white border border-[#E8D5B7] rounded-xl px-4 py-3 text-sm focus:border-[#7B3F00] focus:outline-none focus:ring-2 focus:ring-[#7B3F00]/20"
            >
              <option value="">— pilih produk —</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.produk}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">4. Jumlah</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center bg-white border border-[#E8D5B7] rounded-xl text-[#7B3F00] hover:bg-[#F5EFE6] transition"
                aria-label="Kurangi jumlah"
              >
                <Minus size={18} />
              </button>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                inputMode="numeric"
                className="w-20 bg-white border border-[#E8D5B7] rounded-xl px-3 py-2.5 text-center font-mono focus:border-[#7B3F00] focus:outline-none"
                aria-label="Jumlah pcs"
              />
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="w-11 h-11 flex items-center justify-center bg-white border border-[#E8D5B7] rounded-xl text-[#7B3F00] hover:bg-[#F5EFE6] transition"
                aria-label="Tambah jumlah"
              >
                <Plus size={18} />
              </button>
              <span className="text-sm text-[#6B5B4E]">pcs</span>
            </div>
          </div>
        </div>

        {/* Pesan validasi */}
        {result.msg && (
          <div
            className={clsx(
              'flex items-start gap-2 px-4 py-3 rounded-xl text-sm',
              result.msgType === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : result.msgType === 'info'
                ? 'bg-blue-50 border border-blue-200 text-blue-700'
                : 'bg-amber-50 border border-amber-200 text-amber-800'
            )}
            role="status"
          >
            <Info size={16} className="mt-0.5 flex-shrink-0" />
            <span>{result.msg}</span>
          </div>
        )}

        {/* Breakdown */}
        {result.ok && result.steps.length > 0 && (
          <details className="group bg-[#F9F6F2] border border-[#E8D5B7] rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 text-sm text-[#6B5B4E] cursor-pointer select-none list-none">
              Lihat cara perhitungan
              <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-[#E8D5B7]">
              {result.steps.map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center gap-4 px-4 py-2.5 text-xs font-mono border-b border-[#E8D5B7]/60 last:border-0"
                >
                  <span className="text-[#6B5B4E]">{s.label}</span>
                  <span className="text-[#1A1A1A] text-right">{s.val}</span>
                </div>
              ))}
            </div>
          </details>
        )}

        {/* Hasil: kebutuhan material */}
        {result.ok && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F9F6F2] border border-[#E8D5B7] rounded-xl p-4">
                <div className="text-xs text-[#6B5B4E] mb-1">Material per pcs</div>
                <div className="text-xl font-mono font-semibold text-[#1A1A1A]">
                  {fmtMeterFull(result.cm)}
                </div>
              </div>
              <div className="bg-[#F9F6F2] border border-[#E8D5B7] rounded-xl p-4">
                <div className="text-xs text-[#6B5B4E] mb-1">Total ({qty} pcs)</div>
                <div className="text-xl font-mono font-semibold text-[#1A1A1A]">
                  {totalMeter.toFixed(1).replace('.', ',')} m
                </div>
              </div>
            </div>

            {/* CTA harga → WhatsApp */}
            <div className="bg-[#7B3F00] rounded-xl p-5 text-white">
              <div className="font-semibold mb-1">Berapa harganya?</div>
              <p className="text-sm text-amber-100/90 mb-4">
                Kirim hasil perhitungan ini ke tim kami — kami balas dengan penawaran harga
                terbaik langsung dari pabrik.
              </p>
              <a
                href={waUrlFor(singleWaMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb955] text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                <MessageCircle size={18} />
                Tanya Harga via WhatsApp
              </a>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="w-full inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#7B3F00] text-[#7B3F00] hover:bg-[#7B3F00] hover:text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <Plus size={18} />
              Tambah ke daftar (untuk beberapa ukuran)
            </button>
          </div>
        )}
      </div>

      {/* ===== Kolom kanan: daftar perhitungan ===== */}
      <div className="lg:col-span-2 lg:sticky lg:top-24 bg-white rounded-2xl shadow-md border border-[#E8D5B7] p-6 space-y-4">
        <h3 className="font-display text-lg font-bold text-[#7B3F00]">Daftar Perhitungan</h3>

        {items.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-[#E8D5B7] rounded-xl">
            <p className="text-sm text-[#6B5B4E]">Belum ada item.</p>
            <p className="text-xs text-[#A89680] mt-1">
              Punya beberapa ukuran? Hitung satu per satu di samping, lalu tambahkan ke daftar
              dan tanyakan harganya sekaligus.
            </p>
          </div>
        ) : (
          <>
            <ul className="space-y-2.5">
              {items.map((it) => (
                <li
                  key={it.id}
                  className="flex items-start justify-between gap-3 bg-[#F9F6F2] border border-[#E8D5B7] rounded-xl px-3.5 py-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[#1A1A1A] truncate">
                      {it.productName || 'Kusen lengkung custom'}
                    </div>
                    <div className="text-xs text-[#6B5B4E] font-mono mt-0.5">
                      {fmtSize(it.lebar, it.tinggi)} · {fmtMeter(it.cmPerPcs)} m × {it.qty} pcs
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(it.id)}
                    className="p-1.5 text-[#A89680] hover:text-red-600 transition-colors flex-shrink-0"
                    aria-label={`Hapus ${it.productName || 'item'}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-3 border-t border-[#E8D5B7]">
              <span className="text-sm font-semibold text-[#1A1A1A]">Total material</span>
              <span className="text-lg font-mono font-bold text-[#7B3F00]">
                {listTotalMeter.toFixed(1).replace('.', ',')} m
              </span>
            </div>

            <a
              href={listWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb955] text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              <MessageCircle size={18} />
              Tanya Harga Semua Item
            </a>
          </>
        )}

        <p className="text-[11px] leading-relaxed text-[#A89680]">
          Kalkulator ini menghitung <strong className="text-[#6B5B4E]">kebutuhan material</strong>{' '}
          bending Anda. Harga menyesuaikan produk, warna, dan jumlah pesanan — tim kami balas
          penawaran lengkap via WhatsApp, biasanya dalam 1–2 jam di hari kerja.
        </p>
      </div>
    </div>
  )
}

// ---------- Sub-komponen ----------

function SizeInput({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}) {
  return (
    <div>
      <label className="block text-xs text-[#6B5B4E] mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="0"
          className="w-full bg-white border border-[#E8D5B7] rounded-xl px-4 py-3 pr-12 text-base font-mono focus:border-[#7B3F00] focus:outline-none focus:ring-2 focus:ring-[#7B3F00]/20 disabled:bg-[#F5EFE6] disabled:text-[#6B5B4E]"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#A89680] font-mono pointer-events-none">
          cm
        </span>
      </div>
    </div>
  )
}
