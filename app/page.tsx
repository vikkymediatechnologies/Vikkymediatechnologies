// app/page.tsx

import Hero from '@/components/hero';
import {ProjectsSection} from '@/components/projects-section';
import {ServicesSection} from '@/components/services-section';
import CoursesSection from '@/components/courses-section';
import {ContactSection} from '@/components/contact-section';
import { Footer } from '@/components/footer';   // ← THIS IS PROBABLY THE FIX YOU NEED

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <ProjectsSection />
        <ServicesSection />
        <CoursesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}