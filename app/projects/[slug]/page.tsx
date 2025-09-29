import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'

type Params = { params: { slug: string } }

export async function generateMetadata({ params }: Params) {
  const { data } = await supabase.from('projects').select('title, excerpt').eq('slug', params.slug).single()
  if (!data) return { title: 'Project — Hi‑Tech Fabrication' }
  return { title: `${data.title} — Projects` }
}

export default async function ProjectDetail({ params }: Params) {
  const { data } = await supabase.from('projects').select('*').eq('slug', params.slug).single()
  if (!data) return notFound()

  const processed = await remark().use(html).process(data.body_md || '')
  const bodyHtml = processed.toString()

  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-24">
      <img src={data.cover_url} alt="" className="w-full h-64 object-cover rounded-lg border border-white/10" />
      <h1 className="mt-8 text-4xl font-semibold tracking-tight">{data.title}</h1>
      {data.tags?.length ? <div className="mt-2 text-sm text-white/60">{data.tags.join(' • ')}</div> : null}
      <p className="mt-4 text-white/80">{data.excerpt}</p>
      <div className="prose prose-invert mt-8" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </article>
  )
}
