import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export const metadata = {
  title: 'Projects — Hi‑Tech Fabrication'
}

export default async function ProjectsIndex() {
  let projects: any[] = []
  try {
    const { data } = await supabase.from('projects').select('title, slug, excerpt, cover_url, featured').order('id', { ascending: false })
    projects = data ?? []
  } catch {}

  if (!projects.length) {
    projects = [
      { title: 'Flight‑qualified bracket', slug: 'flight-qualified-bracket', excerpt: 'Lightweight, high‑stiffness bracket fabricated under aerospace QA.', cover_url: '/media/projects/flight-bracket.jpg', featured: true }
    ]
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-16 pb-24">
      <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(p => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="group rounded-lg overflow-hidden border border-white/10 bg-white/[0.04]">
            <img src={p.cover_url} alt="" className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
            <div className="p-5">
              <div className="text-xs uppercase tracking-widest text-white/60">{p.featured ? 'Featured' : 'Project'}</div>
              <h3 className="mt-1 text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-white/70 line-clamp-2">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
