import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import imgConcept from '../assets/iStock-1035193766.jpg'
import imgTeam from '../assets/iStock-2259679276.jpg'

// WhatsApp — canal de conversión. Mensajes pre-cargados según la versión.
const WHATSAPP_URL = 'https://wa.me/5491176764601'
const waLink = (msg) => `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`

const PROBAR_WA = waLink('Hola, me interesa Job Description y quiero probarlo. ¿Me pasan más información?')
const INDIVIDUAL_WA = waLink('Hola, me interesa Job Description (versión individual). ¿Me pasan más información?')
const ORG_WA = waLink('Hola, me interesa Job Description para mi organización (versión organizacional). ¿Me pasan más información?')

const idealFor = [
  {
    label: 'Consultoras de selección de RR.HH.',
    text: 'que necesitan generar perfiles de puesto claros y profesionales para cada búsqueda.',
  },
  {
    label: 'Instituciones de enseñanza',
    text: 'que lo incorporan como herramienta educativa para que sus estudiantes aprendan a construir descripciones y perfiles reales.',
  },
  {
    label: 'Microemprendimientos',
    text: 'que arman su primer organigrama y necesitan definir roles con claridad desde el día uno.',
  },
  {
    label: 'Personas que arman su propia descripción de puesto',
    text: 'ya sea para postularse a un empleo, ordenar su rol actual o emprender.',
  },
]

const orgFeatures = [
  { label: 'Múltiples usuarios', text: 'trabajando de forma simultánea sobre distintos puestos.' },
  { label: 'Niveles de autorización', text: 'para que cada perfil pase por las validaciones necesarias antes de publicarse.' },
  { label: 'Gestión de tiempos', text: 'con seguimiento del avance de cada descripción y del programa en su conjunto.' },
  { label: 'Visión integral de la organización', text: 'con todos los puestos documentados bajo un mismo estándar.' },
]

const reasons = [
  'Ahorra tiempo en un proceso que suele ser lento y desordenado.',
  'Da estructura y profesionalismo a cada descripción de puesto.',
  'Se adapta tanto a un uso individual como a un programa corporativo completo.',
  'Facilita el aprendizaje en contextos educativos.',
  'Ordena, autoriza y da seguimiento cuando el volumen crece.',
]

const Eyebrow = ({ children }) => (
  <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase mb-4">
    {children}
  </p>
)

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, margin: '-60px' },
}

export default function JobDescriptionPage() {
  return (
    <main className="relative bg-navy-deep overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative px-8 pt-40 pb-28">
        <div className="absolute -top-24 -right-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-48 w-120 h-120 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-160 h-96 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />

        <motion.div className="relative max-w-3xl mx-auto text-center" {...reveal}>
          <Eyebrow>Job Description</Eyebrow>
          <p className="font-display italic text-gold/90 text-lg lg:text-xl mb-7">
            La forma más simple y profesional de definir cada puesto de trabajo.
          </p>
          <h1 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-8">
            El software que automatiza y profesionaliza la gestión de puestos.
          </h1>
          <p className="font-body text-white/65 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Crea, supervisa y actualiza Descripciones y Perfiles de Puesto precisos en minutos, sin
            redactar desde cero y con una reducción drástica de errores. Ya seas una consultora de
            selección, una institución educativa, un microemprendimiento o una empresa con equipos
            completos, Job Description se adapta a vos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2"
            >
              <a href={PROBAR_WA} target="_blank" rel="noopener noreferrer">
                Probar gratis
                <MessageCircle size={16} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-gold bg-transparent text-white hover:bg-gold hover:text-white hover:border-gold px-8 h-12 font-body font-medium text-sm"
            >
              <Link to="/#contacto">Agendar demostración</Link>
            </Button>
          </div>

          <div className="border-l-2 border-gold/60 pl-5 mt-16 max-w-2xl mx-auto text-left">
            <p className="font-display italic text-white/70 text-base lg:text-lg leading-relaxed">
              “No necesitás un sistema complejo ni configuraciones eternas: entrás, creás y gestionás.
              No hay que esperar al equipo de TI para conectar APIs — la implementación es instantánea.”
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── EL PROBLEMA QUE RESOLVEMOS ── */}
      <section className="relative px-8 py-28">
        <div className="absolute -top-32 -right-40 w-120 h-120 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...reveal}>
            <Eyebrow>El problema que resolvemos</Eyebrow>
            <h2 className="font-display font-bold text-white text-3xl lg:text-4xl leading-snug mb-6">
              De documentos desordenados a un proceso ordenado de principio a fin.
            </h2>
            <p className="font-body text-white/65 text-base lg:text-lg leading-relaxed">
              Escribir una buena descripción de puesto lleva tiempo, requiere criterio técnico y suele
              terminar en documentos desordenados, desactualizados o inconsistentes entre sí. Job
              Description ordena ese proceso de principio a fin: desde la primera descripción individual
              hasta un programa organizacional con decenas de puestos, usuarios y niveles de autorización.
            </p>
          </motion.div>
          <motion.div {...reveal}>
            <img
              src={imgConcept}
              alt="Job Description"
              className="w-full aspect-4/3 object-cover rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/30"
            />
          </motion.div>
        </div>
      </section>

      {/* ── DOS VERSIONES ── */}
      <section className="relative px-8 py-28">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-160 h-80 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />

        <motion.div className="relative max-w-5xl mx-auto text-center mb-16" {...reveal}>
          <Eyebrow>Dos versiones, una misma solución</Eyebrow>
          <h2 className="font-display font-bold text-white text-3xl lg:text-4xl">
            Elegí el alcance que necesitás.
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          {/* Individual */}
          <motion.div
            className="rounded-xl border border-white/10 bg-white/3 p-8 lg:p-10 flex flex-col"
            {...reveal}
          >
            <h3 className="font-display font-bold text-white text-2xl mb-2">Job Description Individual</h3>
            <p className="font-body text-white/55 text-sm mb-8">
              Para quienes necesitan una o varias descripciones de puesto, sin complicaciones.
            </p>

            <p className="font-body font-semibold text-gold tracking-[0.15em] text-[11px] uppercase mb-4">
              Ideal para
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {idealFor.map((item) => (
                <li key={item.label} className="flex gap-3 items-start">
                  <Check size={16} className="text-gold shrink-0 mt-1" />
                  <p className="font-body text-white/70 text-sm leading-relaxed">
                    <span className="text-white font-medium">{item.label}</span> {item.text}
                  </p>
                </li>
              ))}
            </ul>

            <p className="font-body text-white/60 text-sm leading-relaxed mb-8">
              Con esta versión podés crear descripciones y perfiles de puesto completos, editables y
              listos para usar, sin necesidad de administrar usuarios ni procesos internos.
            </p>

            <div className="mt-auto">
              <Button
                asChild
                className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-7 h-11 font-body font-semibold text-sm gap-2"
              >
                <a href={INDIVIDUAL_WA} target="_blank" rel="noopener noreferrer">
                  Conocer la versión individual
                  <MessageCircle size={15} />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Organizacional — destacada */}
          <motion.div
            className="rounded-xl border border-gold/40 bg-navy-mid/15 p-8 lg:p-10 relative flex flex-col"
            {...reveal}
          >
            <span className="absolute top-6 right-6 font-body text-[10px] font-bold tracking-widest text-gold uppercase">
              ★ Para empresas
            </span>
            <h3 className="font-display font-bold text-white text-2xl mb-2">Job Description Organizacional</h3>
            <p className="font-body text-white/55 text-sm mb-8">
              Para empresas que necesitan gestionar las descripciones de puesto de toda su estructura.
            </p>

            <p className="font-body text-white/60 text-sm leading-relaxed mb-6">
              Esta versión convierte la creación de descripciones en un verdadero programa
              organizacional, con:
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {orgFeatures.map((item) => (
                <li key={item.label} className="flex gap-3 items-start">
                  <Check size={16} className="text-gold shrink-0 mt-1" />
                  <p className="font-body text-white/70 text-sm leading-relaxed">
                    <span className="text-white font-medium">{item.label}</span>, {item.text}
                  </p>
                </li>
              ))}
            </ul>

            <p className="font-body text-white/60 text-sm leading-relaxed mb-8">
              Pensada para áreas de Recursos Humanos que necesitan escalar el proceso, mantener
              consistencia entre puestos y dejar trazabilidad de cada definición.
            </p>

            <div className="mt-auto">
              <Button
                asChild
                className="bg-white/10 text-white border border-white/30 hover:bg-gold hover:border-gold rounded-full px-7 h-11 font-body font-medium text-sm gap-2 backdrop-blur-sm"
              >
                <a href={ORG_WA} target="_blank" rel="noopener noreferrer">
                  Conocer la versión organizacional
                  <MessageCircle size={15} />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── UNA BIBLIOTECA INTELIGENTE ── */}
      <section className="relative px-8 py-28">
        <div className="absolute -bottom-40 -left-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div className="lg:order-2" {...reveal}>
            <Eyebrow>Una biblioteca inteligente, no una hoja en blanco</Eyebrow>
            <p className="font-body text-white/65 text-base lg:text-lg leading-relaxed mb-5">
              Olvidate de las hojas en blanco y las descripciones desactualizadas. Job Description cuenta
              con una biblioteca inteligente y precargada, con contenido alineado a normas del mercado
              (como ISO), KPIs específicos, niveles de supervisión, riesgos laborales y responsabilidades
              por bienes.
            </p>
            <p className="font-body text-white/65 text-base lg:text-lg leading-relaxed mb-6">
              En el Perfil de Puesto vas a encontrar competencias transversales ya definidas, graduadas y
              ajustadas a comportamientos observables, junto con indicadores de experiencia, formación y más.
            </p>
            <p className="font-display italic text-gold/90 text-xl lg:text-2xl">
              Vos seleccionás. El sistema automatiza el resto.
            </p>
          </motion.div>
          <motion.div className="lg:order-1" {...reveal}>
            <img
              src={imgTeam}
              alt="Equipo trabajando con Job Description"
              className="w-full aspect-4/3 object-cover rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/30"
            />
          </motion.div>
        </div>
      </section>

      {/* ── POR QUÉ ── */}
      <section className="relative px-8 py-28">
        <div className="absolute -top-32 -right-40 w-120 h-120 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />

        <motion.div className="relative max-w-3xl mx-auto" {...reveal}>
          <Eyebrow>¿Por qué Job Description?</Eyebrow>
          <div className="flex flex-col gap-4 mt-4">
            {reasons.map((r) => (
              <div key={r} className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-gold" />
                </span>
                <p className="font-body text-white/75 text-base leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CIERRE / CTA ── */}
      <section className="relative px-8 py-28">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-80 rounded-full bg-navy-mid/25 blur-3xl pointer-events-none" />
        <motion.div className="relative max-w-2xl mx-auto text-center" {...reveal}>
          <h2 className="font-display font-bold text-white text-3xl lg:text-4xl mb-6">
            Elegí tu versión y empezá hoy.
          </h2>
          <p className="font-body text-white/60 text-base leading-relaxed mb-10">
            Ya sea que necesites una sola descripción bien hecha o un programa completo para tu
            organización, Job Description te acompaña en cada paso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2"
            >
              <a href={INDIVIDUAL_WA} target="_blank" rel="noopener noreferrer">
                Contratación individual
                <MessageCircle size={16} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-gold bg-transparent text-white hover:bg-gold hover:text-white hover:border-gold px-8 h-12 font-body font-medium text-sm gap-2"
            >
              <a href={ORG_WA} target="_blank" rel="noopener noreferrer">
                Contratación empresas
                <MessageCircle size={16} />
              </a>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
