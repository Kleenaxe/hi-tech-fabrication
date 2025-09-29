import Link from 'next/link'

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-semibold">Ready to build?</h3>
          <p className="text-white/70 mt-1">Send a print, CAD, or a quick sketch — we’ll get a fast, precise quote back.</p>
        </div>
        <Link href="/contact" className="btn btn-accent">Request a quote</Link>
      </div>
    </section>
  )
}
