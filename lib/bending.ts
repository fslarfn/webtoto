// Rumus perhitungan aluminium bending — porting dari aplikasi internal Toto Bending.
// Konstanta di bawah adalah aturan bisnis pabrik, bukan konstanta matematika murni:
// - PI dibulatkan 3,14 sesuai cara hitung quotation yang dipakai di lapangan
// - Setiap potongan diberi tambahan 30 cm sambungan
// - Hasil > 6 m otomatis ditambah 30 cm lagi

export const PI = 3.14
export const SAMBUNGAN_CM = 30
export const OVERSIZE_CM = 600

export type MethodId = 1 | 2 | 3

/** Aturan pabrik: setengah lingkaran lebar 60–75 cm memakai material standar 1,5 m. */
export const HALF_STD = { minLebar: 60, maxLebar: 75, cm: 150 }

export const METHODS: Record<MethodId, { id: MethodId; label: string; short: string; desc: string }> = {
  1: {
    id: 1,
    label: 'Kurang dari ½ lingkaran',
    short: 'Kurang ½',
    desc: 'Tinggi lengkung kurang dari Lebar ÷ 2',
  },
  2: {
    id: 2,
    label: 'Setengah lingkaran pas',
    short: 'Pas ½',
    desc: 'Tinggi lengkung sama dengan Lebar ÷ 2',
  },
  3: {
    id: 3,
    label: 'Lebih dari ½ lingkaran',
    short: 'Lebih ½',
    desc: 'Tinggi lengkung lebih dari Lebar ÷ 2',
  },
}

export const FORMULA_HINTS: Record<MethodId, string> = {
  1: 'Lebar + Tinggi + 30 cm',
  2: '(Lebar ÷ 2) × 3,14 + 30 cm',
  3: '(Lebar ÷ 2) × 3,14 + 2×(T − L÷2) + 30 cm',
}

export interface CalcStep {
  label: string
  val: string
}

export interface CalcResult {
  ok: boolean
  cm: number
  steps: CalcStep[]
  msg: string | null
  msgType: 'warn' | 'error' | 'info' | null
}

/** Terima input angka bergaya Indonesia ("130,5") maupun titik ("130.5"). */
export function parseNum(v: string | number): number {
  if (typeof v === 'number') return v
  return parseFloat(v.trim().replace(',', '.'))
}

/** Hitung kebutuhan material aluminium bending (dalam cm). */
export function calculate(method: MethodId, lebar: string | number, tinggi: string | number): CalcResult {
  const L = parseNum(lebar)
  const T = parseNum(tinggi)

  if (isNaN(L) || isNaN(T) || L <= 0 || T <= 0) {
    return { ok: false, cm: 0, steps: [], msg: null, msgType: null }
  }

  const half = L / 2

  // METODE 1: Kurang dari setengah lingkaran
  if (method === 1) {
    if (T > half) {
      return {
        ok: false,
        cm: 0,
        steps: [],
        msg: `Tinggi (${fmtCm(T)}) > Lebar÷2 (${fmtCm(half)}). Gunakan Metode 2 atau 3.`,
        msgType: 'warn',
      }
    }
    const cm = L + T + SAMBUNGAN_CM
    return {
      ok: true,
      cm,
      steps: [
        { label: 'Lebar + Tinggi', val: `${fmtCm(L)} + ${fmtCm(T)} = ${fmtCm(L + T)} cm` },
        { label: '+ 30 cm sambungan', val: `${fmtCm(cm)} cm` },
      ],
      msg: null,
      msgType: null,
    }
  }

  // METODE 2: Setengah lingkaran pas
  if (method === 2) {
    // Aturan pabrik: lebar 60–75 cm memakai material standar 1,5 m
    if (L >= HALF_STD.minLebar && L <= HALF_STD.maxLebar) {
      return {
        ok: true,
        cm: HALF_STD.cm,
        steps: [
          { label: `Lebar ${fmtCm(L)} cm (rentang 60–75)`, val: 'material standar' },
          { label: 'Panjang material', val: `${HALF_STD.cm} cm` },
        ],
        msg: 'Setengah lingkaran dengan lebar 60–75 cm memakai material standar 1,5 m.',
        msgType: 'info',
      }
    }
    const arc = half * PI
    const cm = arc + SAMBUNGAN_CM
    const steps: CalcStep[] = [
      { label: 'Lebar ÷ 2', val: `${fmtCm(L)} ÷ 2 = ${fmtCm(half)} cm` },
      { label: '× 3,14', val: `${fmtCm(half)} × 3,14 = ${fmtCm(arc)} cm` },
      { label: '+ 30 cm sambungan', val: `${fmtCm(cm)} cm` },
    ]
    let msg: string | null = null
    let msgType: CalcResult['msgType'] = null
    if (Math.abs(T - half) > 0.5) {
      msg = `Tinggi seharusnya ${fmtCm(half)} cm untuk setengah lingkaran pas. Hasil dihitung dari Lebar.`
      msgType = 'warn'
    }
    return { ok: true, cm, steps, msg, msgType }
  }

  // METODE 3: Lebih dari setengah lingkaran
  if (method === 3) {
    if (T < half) {
      return {
        ok: false,
        cm: 0,
        steps: [],
        msg: `Tinggi (${fmtCm(T)}) < Lebar÷2 (${fmtCm(half)}). Tinggi minimum: ${fmtCm(half)} cm.`,
        msgType: 'error',
      }
    }
    const sisi = (T - half) * 2
    const arc = half * PI
    let cm = arc + sisi + SAMBUNGAN_CM
    const steps: CalcStep[] = [
      { label: 'Lebar ÷ 2', val: `${fmtCm(L)} ÷ 2 = ${fmtCm(half)} cm` },
      { label: 'Tinggi − (Lebar÷2)', val: `${fmtCm(T)} − ${fmtCm(half)} = ${fmtCm(T - half)} cm` },
      { label: '× 2 (sisi lurus)', val: `${fmtCm(T - half)} × 2 = ${fmtCm(sisi)} cm` },
      { label: '(Lebar÷2) × 3,14 (busur)', val: `${fmtCm(half)} × 3,14 = ${fmtCm(arc)} cm` },
      { label: 'Busur + sisi + 30', val: `${fmtCm(cm)} cm` },
    ]
    let msg: string | null = null
    let msgType: CalcResult['msgType'] = null
    if (cm > OVERSIZE_CM) {
      cm += SAMBUNGAN_CM
      steps.push({ label: '+ 30 cm (panjang > 6 m)', val: `${fmtCm(cm)} cm` })
      msg = 'Panjang melebihi 6 m, otomatis ditambahkan 30 cm.'
      msgType = 'info'
    }
    return { ok: true, cm, steps, msg, msgType }
  }

  return { ok: false, cm: 0, steps: [], msg: null, msgType: null }
}

// ---------- Format helpers ----------

export function fmtCm(n: number): string {
  const r = Math.round(n * 100) / 100
  if (r % 1 === 0) return r.toString()
  return r.toFixed(2).replace(/\.?0+$/, '').replace('.', ',')
}

/** Bulatkan cm → meter 1 desimal (half away from zero, sesuai gaya quotation pabrik). */
export function roundMeter(cm: number): number {
  const m = cm / 100
  return Math.round(m * 10 + Number.EPSILON) / 10
}

export function fmtMeter(cm: number): string {
  return roundMeter(cm).toFixed(1).replace('.', ',')
}

export function fmtMeterFull(cm: number): string {
  return fmtMeter(cm) + ' m'
}

/** Format ukuran: L=T ditulis sebagai diameter (D.130), selain itu L.130 T.50 */
export function fmtSize(lebar: number, tinggi: number): string {
  if (lebar === tinggi) return `D.${formatNum(lebar)}`
  return `L.${formatNum(lebar)} T.${formatNum(tinggi)}`
}

function formatNum(n: number): string {
  if (n % 1 === 0) return n.toString()
  return n.toFixed(1).replace('.', ',')
}

// ---------- Item perhitungan (tanpa harga — harga ditanyakan via WhatsApp) ----------

export interface EstimateItem {
  id: string
  /** Nama produk opsional, mis. `Kusen 4"` — kosong jika pelanggan belum memilih */
  productName: string
  method: MethodId
  lebar: number
  tinggi: number
  qty: number
  cmPerPcs: number
}

/** Total meter satu item (meter dibulatkan × qty). */
export function itemTotalMeter(item: Pick<EstimateItem, 'cmPerPcs' | 'qty'>): number {
  return roundMeter(item.cmPerPcs) * item.qty
}

/** Satu baris perhitungan bergaya WA: `Kusen 4" L.130 T.50 : 2,1 m x 2pcs` */
export function formatItemLine(item: EstimateItem): string {
  const size = fmtSize(item.lebar, item.tinggi)
  const meterStr = fmtMeter(item.cmPerPcs)
  const prefix = item.productName ? `${item.productName} ` : ''
  return `${prefix}${size} : ${meterStr} m x ${item.qty}pcs`
}

/** Susun pesan WhatsApp berisi seluruh daftar perhitungan untuk minta penawaran harga. */
export function formatEstimateMessage(items: EstimateItem[]): string {
  if (items.length === 0) return ''
  const lines = items.map(formatItemLine)
  const totalM = items.reduce((sum, it) => sum + itemTotalMeter(it), 0)
  return (
    'Halo, saya sudah hitung kebutuhan material lewat kalkulator di website. Mohon info harga untuk:\n\n' +
    lines.join('\n\n') +
    `\n\nTotal material : ${totalM.toFixed(1).replace('.', ',')} m`
  )
}
