import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default async function Projects({ limit = 6 }: { limit?: number }) {
  let projects: any[] = []
  try {
    const { data } = await supabase.from('projects')
      .select('title, slug, excerpt, cover_url, featured')
      .order('featured', { ascending: false })
      .order('id', { ascending: false })
      .limit(limit)
    projects = data ?? []
  } catch {}

  if (!projects.length) {
    projects = [
      { title: 'Flight‑qualified bracket', slug: 'flight-qualified-bracket', excerpt: 'Lightweight, high‑stiffness bracket fabricated under aerospace QA.', cover_url: '/media/projects/flight-bracket.jpg', featured: true }
    ]
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Featured projects</h2>
        <Link href="/projects" className="text-sm text-brand-400 hover:text-brand-300">View all</Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
            <img src={p.cover_url} alt="" className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
            <div className="p-5">
              <div className="text-xs uppercase tracking-widest text-white/60">{p.featured ? 'Featured' : 'Project'}</div>
              <h3 className="mt-1 text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-white/70 line-clamp-2">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
