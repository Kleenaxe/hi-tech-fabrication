export const revalidate = 60

import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Badges from '@/components/Badges'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Badges />
      <Testimonials />
      <CTA />
    </>
  )
}
