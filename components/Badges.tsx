import { supabase } from '@/lib/supabaseClient'

export default async function Badges() {
  let badges: any[] = []
  try {
    const { data } = await supabase.from('badges').select('*').order('sort_order', { ascending: true })
    badges = data ?? []
  } catch {}

  if (!badges.length) {
    badges = [
      { logo_url: '/media/badges/iso.svg', alt: 'ISO Certified', href: '#' },
      { logo_url: '/media/badges/as9100.svg', alt: 'AS9100', href: '#' },
      { logo_url: '/media/badges/itarm.svg', alt: 'ITAR', href: '#' }
    ]
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
        {badges.map((b, i) => (
          <a key={i} href={b.href ?? '#'} className="inline-flex items-center gap-3">
            <img src={b.logo_url} alt={b.alt ?? ''} className="h-8 w-auto" />
          </a>
        ))}
      </div>
    </section>
  )
}
