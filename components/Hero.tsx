import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default async function Hero() {
  let content: any = null
  try {
    const { data } = await supabase.from('pages')
      .select('hero_title, hero_sub, hero_image_url, cta_text, cta_href')
      .eq('slug', 'home').single()
    content = data
  } catch {}

  const title = content?.hero_title ?? 'Precision fabrication for aerospace & high‑tech'
  const sub = content?.hero_sub ?? 'CNC, sheet metal, and rapid prototyping trusted by demanding teams.'
  const img = content?.hero_image_url ?? '/media/hero/default.jpg'
  const ctaText = content?.cta_text ?? 'Request a quote'
  const ctaHref = content?.cta_href ?? '/contact'

  return (
    <section className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <img src={img} alt="" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-24">
        <p className="text-eyebrow text-brand-400">Hi‑Tech Fabrication</p>
        <h1 className="text-hero font-semibold tracking-tight max-w-4xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">{sub}</p>
        <div className="mt-8 flex gap-4">
          <Link href={ctaHref} className="btn btn-accent">{ctaText}</Link>
          <a href="#services" className="btn btn-primary">Explore capabilities</a>
        </div>
      </div>
    </section>
  )
}
