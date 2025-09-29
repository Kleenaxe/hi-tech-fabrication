import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact — Hi‑Tech Fabrication'
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-20 pb-24">
      <h1 className="text-4xl font-semibold tracking-tight">Request a quote</h1>
      <p className="mt-2 text-white/70 max-w-2xl">
        Send your requirements and we’ll follow up with next steps. Attachments can be shared via your preferred method after initial contact.
      </p>
      <div className="mt-10 card p-6">
        <ContactForm />
      </div>
    </div>
  )
}
