import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default async function Footer() {
  let links: { label: string; href: string; zone: string; link_order: number }[] = []
  try {
    const { data } = await supabase.from('nav_links')
      .select('label, href, zone, link_order')
      .order('link_order', { ascending: true })
    links = data ?? []
  } catch {}

  const footerLinks = (links.length ? links : [
    { label: 'Privacy', href: '/privacy', zone: 'footer', link_order: 1 },
    { label: 'Contact', href: '/contact', zone: 'footer', link_order: 2 },
  ]).filter(l => l.zone === 'footer')

  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-2 items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Hi‑Tech Fabrication" className="h-7 w-auto" />
          <p className="text-sm text-white/60">Precision fabrication for aerospace & high‑tech.</p>
        </div>
        <div className="flex md:justify-end gap-6 text-sm">
          {footerLinks.map(l => (
            <Link key={l.label} href={l.href} className="text-white/70 hover:text-white">{l.label}</Link>
          ))}
        </div>
      </div>
      <div className="text-center text-xs text-white/50 pb-8">© {new Date().getFullYear()} Hi‑Tech Fabrication. All rights reserved.</div>
    </footer>
  )
}
