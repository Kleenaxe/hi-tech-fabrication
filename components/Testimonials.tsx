import { supabase } from '@/lib/supabaseClient'

export default async function Testimonials() {
  let items: any[] = []
  try {
    const { data } = await supabase.from('testimonials').select('*').limit(6)
    items = data ?? []
  } catch {}

  if (!items.length) {
    items = [
      { name: 'A. Rivera', role: 'Mechanical Lead', company: 'Orbital Systems', quote: 'They hit our tolerance window and deadline.', avatar_url: '/media/avatars/rivera.jpg' }
    ]
  }

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">What teams say</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((t, i) => (
          <figure key={i} className="card p-6">
            <blockquote className="text-lg">“{t.quote}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <img src={t.avatar_url} alt="" className="h-10 w-10 rounded-full object-cover" />
              <div className="text-sm text-white/80">
                <div className="font-medium">{t.name}</div>
                <div className="text-white/60">{t.role}{t.company ? `, ${t.company}` : ''}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
