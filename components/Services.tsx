import { supabase } from '@/lib/supabaseClient'

export default async function Services() {
  let services: any[] = []
  try {
    const { data } = await supabase.from('services').select('*').order('sort_order', { ascending: true })
    services = data ?? []
  } catch {}

  if (!services.length) {
    services = [
      { title: 'CNC Machining', blurb: 'Tight‑tolerance 3‑/5‑axis milling & turning.', icon_url: '/media/icons/cnc.svg' },
      { title: 'Sheet Metal', blurb: 'Laser cutting, bending, and finishing.', icon_url: '/media/icons/sheetmetal.svg' },
      { title: 'Rapid Prototyping', blurb: 'Fast iterations in aluminum, steel, composites.', icon_url: '/media/icons/prototype.svg' },
    ]
  }

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Capabilities</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <div key={i} className="card p-6">
            <div className="h-10 w-10 rounded bg-white/10 flex items-center justify-center">
              <img src={s.icon_url} alt="" className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
            <p className="mt-2 text-sm text-white/70">{s.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
