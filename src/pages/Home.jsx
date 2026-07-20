import HeroSlider from '../components/HeroSlider'
import QuienesSomos from '../components/QuienesSomos'
import MisionVision from '../components/MisionVision'
import Valores from '../components/Valores'
import JobDescription from '../components/JobDescription'
import ContactSection from '../components/ContactSection'

export default function Home() {
  return (
    <main className="bg-navy-deep">
      <HeroSlider />
      <div className="overflow-hidden">
        <QuienesSomos />
        <MisionVision />
        <Valores />
        <JobDescription />
      </div>
      <ContactSection />
    </main>
  )
}
