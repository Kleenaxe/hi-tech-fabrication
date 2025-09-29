'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
    setStatus('submitting')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error?.message || 'Submission failed')
      setStatus('success')
      setMessage('Thanks! We’ll get back to you shortly.')
      form.reset()
    } catch (err: any) {
      setStatus('error')
      setMessage(err?.message || 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/70">Name</label>
          <input name="name" required className="mt-1 w-full rounded bg-white/5 p-2 ring-1 ring-white/10 focus:outline-none focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-sm text-white/70">Company</label>
          <input name="company" className="mt-1 w-full rounded bg-white/5 p-2 ring-1 ring-white/10 focus:outline-none focus:ring-brand-500" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/70">Email</label>
          <input type="email" name="email" required className="mt-1 w-full rounded bg-white/5 p-2 ring-1 ring-white/10 focus:outline-none focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-sm text-white/70">Phone</label>
          <input name="phone" className="mt-1 w-full rounded bg-white/5 p-2 ring-1 ring-white/10 focus:outline-none focus:ring-brand-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-white/70">How can we help?</label>
        <textarea name="message" required rows={6} className="mt-1 w-full rounded bg-white/5 p-2 ring-1 ring-white/10 focus:outline-none focus:ring-brand-500" />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/60">We’ll reply within one business day.</div>
        <button disabled={status==='submitting'} className="btn btn-accent">
          {status === 'submitting' ? 'Submitting…' : 'Send'}
        </button>
      </div>
      {status !== 'idle' && <p className={`text-sm ${status==='success' ? 'text-brand-400' : 'text-red-400'}`}>{message}</p>}
    </form>
  )
}
