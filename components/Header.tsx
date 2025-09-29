import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default async function Header() {
  // Pull nav links, but fall back to defaults if Supabase isn't configured yet
  let links: { label: string; href: string; zone: string; link_order: number }[] = []
  try {
    const { data } = await supabase.from('nav_links')
      .select('label, href, zone, link_order')
      .order('link_order', { ascending: true })
    links = data ?? []
  } catch {}

  const headerLinks = (links.length ? links : [
    { label: 'Services', href: '/#services', zone: 'header', link_order: 1 },
    { label: 'Projects', href: '/projects', zone: 'header', link_order: 2 },
    { label: 'Testimonials', href: '/#testimonials', zone: 'header', link_order: 3 },
    { label: 'Contact', href: '/contact', zone: 'header', link_order: 4 },
  ]).filter(l => l.zone === 'header')

  return (
    <header className="sticky top-0 z-50 header-glass">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Hi‑Tech Fabrication" className="h-6 w-auto" />
          <span className="sr-only">Hi‑Tech Fabrication</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {headerLinks.map((l) => (
            <Link key={l.label} href={l.href} className="text-white/80 hover:text-white transition">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn-accent text-sm">Request a quote</Link>
      </div>
    </header>
  )
}
