import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)?.trim()
  if (!url || !key) return null
  try {
    new URL(url) // validasi format URL sebelum createClient
  } catch {
    console.error('NEXT_PUBLIC_SUPABASE_URL tidak valid:', url)
    return null
  }
  try {
    _client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    return _client
  } catch (e) {
    console.error('Supabase createClient error:', e)
    return null
  }
}
