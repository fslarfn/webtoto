import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { getToken } from 'next-auth/jwt'

const BUCKET = 'price-pdfs'
const FILENAME = 'daftar-harga.pdf'

async function ensureBucket(sb: NonNullable<ReturnType<typeof getSupabase>>) {
  const { data: buckets } = await sb.storage.listBuckets()
  if (!buckets?.some((b) => b.name === BUCKET)) {
    await sb.storage.createBucket(BUCKET, { public: true })
  }
}

export async function GET() {
  try {
    const sb = getSupabase()
    if (!sb) return NextResponse.json({ url: null })

    const { data: files } = await sb.storage.from(BUCKET).list()
    const exists = files?.some((f) => f.name === FILENAME)
    if (!exists) return NextResponse.json({ url: null })

    const { data } = sb.storage.from(BUCKET).getPublicUrl(FILENAME)
    return NextResponse.json({ url: data.publicUrl })
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

    await ensureBucket(sb)

    const buffer = Buffer.from(await file.arrayBuffer())
    const { error: uploadError } = await sb.storage
      .from(BUCKET)
      .upload(FILENAME, buffer, { contentType: 'application/pdf', upsert: true })

    if (uploadError) {
      return NextResponse.json({ error: `Upload gagal: ${uploadError.message}` }, { status: 500 })
    }

    const { data } = sb.storage.from(BUCKET).getPublicUrl(FILENAME)
    return NextResponse.json({ url: data.publicUrl })
  } catch (error: any) {
    console.error('PDF upload error:', error)
    return NextResponse.json({ error: error.message || 'Upload gagal' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'Supabase belum dikonfigurasi' }, { status: 500 })

  try {
    await sb.storage.from(BUCKET).remove([FILENAME])
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
