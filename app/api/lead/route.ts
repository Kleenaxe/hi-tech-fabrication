import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const payload = {
      name: String(body.name || '').slice(0, 120),
      email: String(body.email || '').slice(0, 160),
      phone: String(body.phone || '').slice(0, 80),
      company: String(body.company || '').slice(0, 160),
      message: String(body.message || '').slice(0, 5000),
      source: String(body.source || 'contact-form').slice(0, 120)
    }
    const { error } = await supabaseServer.from('leads').insert([payload])
    if (error) {
      console.error(error)
      return NextResponse.json({ ok: false, error }, { status: 400 })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: { message: e?.message || 'unknown error' } }, { status: 400 })
  }
}
