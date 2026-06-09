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
  if (!sb) return NextResponse.json({ error: 'Supabase belum dikonfigurasi' }, { status: 500 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 })
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Hanya file PDF yang diizinkan' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `daftar-harga-${Date.now()}.pdf`

    // Pastikan bucket ada — buat jika belum
    const { data: buckets } = await sb.storage.listBuckets()
    const bucketExists = buckets?.some((b) => b.name === BUCKET)
    if (!bucketExists) {
      const { error: bucketErr } = await sb.storage.createBucket(BUCKET, { public: true })
      if (bucketErr) {
        console.error('Bucket create error:', bucketErr)
        return NextResponse.json(
          { error: `Bucket error: ${bucketErr.message}` },
          { status: 500 }
        )
      }
    }

    // Upload file
    const { error: uploadError } = await sb.storage
      .from(BUCKET)
      .upload(filename, buffer, { contentType: 'application/pdf', upsert: true })
    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { error: `Upload gagal: ${uploadError.message}` },
        { status: 500 }
      )
    }

    // Ambil public URL
    const { data: urlData } = sb.storage.from(BUCKET).getPublicUrl(filename)
    const url = urlData.publicUrl

    // Simpan URL ke settings
    const { error: settingsError } = await sb
      .from('settings')
      .upsert({ key: SETTINGS_KEY, value: url })
    if (settingsError) {
      console.error('Settings error:', settingsError)
      return NextResponse.json(
        { error: `Simpan URL gagal: ${settingsError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ url })
  } catch (error: any) {
    console.error('PDF upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Upload gagal' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Supabase belum dikonfigurasi' }, { status: 500 })

  try {
    await sb.from('settings').delete().eq('key', SETTINGS_KEY)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
