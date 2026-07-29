import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import veleros from '../assets/hero-veleros-w.jpg'
import paracaidistas from '../assets/hero-paracaidistas-w.jpg'
import violonchelo from '../assets/hero-violonchelo-w.jpg'

const slides = [
  {
    image: veleros,
    overlay: 'bg-navy-deep/55',
    title: 'Aprende la estrategia. Disfruta la travesía. Actúa poniendo el viento a favor.',
    cta: 'Servicios',
    href: '/servicios',
  },
  {
    image: paracaidistas,
    overlay: 'bg-navy-deep/50',
    title: 'Sincronizamos talentos. Forjamos equipos capaces de alcanzar cualquier meta con precisión.',
    cta: 'Ver servicios de equipo',
    href: '/servicios#equipos',
  },
  {
    image: violonchelo,
    overlay: 'bg-navy-deep/60',
    title: 'Detén lo que estás haciendo y préstate atención.',
    subtitle: 'Para transformar la cultura de tu empresa, primero: pausar la inercia y segundo, rediseñar la estrategia desde las personas.',
    cta: 'Conocé X-Ray',
    href: '/#quienes-somos',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [])

  const prev = () => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const handleSlideLink = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.slice(2)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative overflow-hidden" style={{ minHeight: '100svh' }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ minHeight: '100svh' }}
        >
          <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className={`absolute inset-0 ${slide.overlay}`} />
          <svg
            className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="#C8922A" strokeWidth="1" />
          </svg>

          <div className="relative z-10 flex items-center min-h-screen pt-40 pb-28 lg:pt-28 lg:pb-16">
            <div className="max-w-2xl px-8 lg:pl-16">
              <h1 className="font-display font-bold text-white text-4xl lg:text-6xl leading-tight mb-6">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="font-body text-white/75 text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
                  {slide.subtitle}
                </p>
              )}
              <Button
                asChild
                className="bg-navy-mid text-white hover:bg-gold border-0 rounded-full px-8 py-3 h-auto font-body font-medium text-base"
              >
                <Link to={slide.href} onClick={(e) => handleSlideLink(e, slide.href)}>
                  {slide.cta}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Frase institucional fija — persiste en todos los slides */}
      <div className="absolute top-24 lg:top-28 left-0 right-0 z-30 px-8 lg:pl-16 pointer-events-none">
        <p className="font-display italic text-gold text-lg lg:text-2xl leading-snug max-w-lg">
          Diseño organizacional con sentido, rigurosidad y disfrute.
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-gold hover:bg-transparent w-12 h-12"
        aria-label="Anterior"
      >
        <ChevronLeft size={36} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-gold hover:bg-transparent w-12 h-12"
        aria-label="Siguiente"
      >
        <ChevronRight size={36} />
      </Button>

      {/* Bottom fade — dissolves into dark section below */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-navy-deep to-transparent pointer-events-none z-20" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-0.5 transition-all duration-300 ${
              i === current ? 'w-12 bg-gold' : 'w-12 bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
