import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { getToken } from 'next-auth/jwt'

const BUCKET = 'price-pdfs'
const SETTINGS_KEY = 'price_pdf_url'

export async function GET() {
  try {
    const sb = getSupabase()
    if (!sb) return NextResponse.json({ url: null })
    const { data } = await sb
      .from('settings')
      .select('value')
      .eq('key', SETTINGS_KEY)
      .single()
    return NextResponse.json({ url: data?.value ?? null })
  } catch {
    return NextResponse.json({ url: null })
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Storage belum dikonfigurasi' }, { status: 500 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 })
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Hanya file PDF yang diizinkan' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `daftar-harga-${Date.now()}.pdf`

    const { error: uploadError } = await sb.storage
      .from(BUCKET)
      .upload(filename, buffer, { contentType: 'application/pdf', upsert: true })
    if (uploadError) throw uploadError

    const { data: urlData } = sb.storage.from(BUCKET).getPublicUrl(filename)
    const url = urlData.publicUrl

    await sb.from('settings').upsert({ key: SETTINGS_KEY, value: url })

    return NextResponse.json({ url })
  } catch (error: any) {
    console.error('PDF upload error:', error)
    return NextResponse.json({ error: error.message || 'Upload gagal' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Storage belum dikonfigurasi' }, { status: 500 })

  try {
    await sb.from('settings').delete().eq('key', SETTINGS_KEY)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
