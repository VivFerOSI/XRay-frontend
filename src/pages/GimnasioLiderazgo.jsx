import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import imgJovenes from '../assets/iStock-684820804 Jóvenes trabajando.jpg'

// WhatsApp — canal de conversión.
const WHATSAPP_URL = 'https://wa.me/5491176766932'
const waLink = (msg) => `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`
const DIAGNOSTICO_WA = waLink('Hola, quiero hacer el diagnóstico (Stress Test) del Gimnasio de Liderazgo.')
const DESTRABE_WA = waLink('Hola, quiero reservar una sesión de destrabe del Gimnasio de Liderazgo.')
const ENTRAR_WA = waLink('Hola, quiero entrar al Gimnasio de Liderazgo. ¿Me pasan más información?')

const painPoints = [
  'Sentís que tu negocio avanza, pero con demasiada fricción.',
  'Te cuesta ordenar prioridades y sostener el foco.',
  'Sabés que podrías delegar más, pero todavía no encontraste la forma.',
  'Querés tomar mejores decisiones sin hacerlo todo solo.',
  'Estás cansado de resolver en soledad lo que debería pensarse con otros.',
]

const steps = [
  { t: 'Empezás con un diagnóstico', d: 'Hacés el Stress Test de Robustez y Crecimiento, un autodiagnóstico simple que te ayuda a entender dónde estás parado, qué está funcionando y qué necesita atención.' },
  { t: 'Recibís una orientación', d: 'Según tu momento, te sugerimos la ruta más adecuada para tu momento actual.' },
  { t: 'Entrás al nivel que mejor te encaja', d: 'Podés sumarte a Base, Impulso o Aceleración, según el tipo de acompañamiento que necesites.' },
  { t: 'Compartís con pares', d: 'Trabajás en células cerradas con personas que atraviesan desafíos parecidos. Eso hace que la conversación sea más útil, más honesta y más transformadora.' },
  { t: 'Accedés a destrabe cuando hace falta', d: 'Si aparece una decisión importante o un problema que no querés seguir pateando, podés sumar una sesión premium de foco para resolverlo con claridad y avanzar.' },
]

const takeaways = [
  'Más claridad para decidir.',
  'Más foco para ejecutar.',
  'Más orden en tu negocio y proyecto.',
  'Menos soledad en el rol.',
  'Más criterio para delegar y priorizar.',
  'Más tracción para crecer sin quemarte.',
]

const plans = [
  {
    name: 'Base',
    tagline: 'Orden y claridad para empezar a acomodar el negocio, bajar el ruido y recuperar foco.',
    price: 'AR$ 50.000',
    period: 'por mes',
    modalidad: 'Online, mensual, con ingreso por cohorte.',
    items: ['Diagnóstico de entrada', 'Acceso a la comunidad', '1 encuentro grupal mensual', 'Materiales prácticos', 'Participación en una célula básica de pares'],
    cta: 'Quiero empezar en Base',
    msg: 'Hola, quiero empezar en el plan Base del Gimnasio de Liderazgo.',
    featured: false,
  },
  {
    name: 'Impulso',
    tagline: 'Ejecución y consistencia para quienes ya están en marcha y quieren avanzar con más seguimiento, continuidad y accountability.',
    price: 'AR$ 120.000',
    period: 'por mes',
    modalidad: 'Online, premium, por cohorte cerrada.',
    items: ['Todo lo del plan Base', '2 encuentros en vivo por mes', 'Hot seats grupales', 'Seguimiento de compromisos', 'Participación prioritaria en células de tracción', 'Espacios de revisión de casos reales'],
    cta: 'Quiero pasar a Impulso',
    msg: 'Hola, quiero el plan Impulso del Gimnasio de Liderazgo.',
    featured: true,
  },
  {
    name: 'Aceleración',
    tagline: 'Estrategia y expansión para quienes buscan ordenar lo complejo y avanzar con acompañamiento más cercano.',
    price: 'AR$ 300.000',
    period: 'por mes',
    modalidad: 'Premium, online o híbrido, con cupos limitados.',
    items: ['Todo lo del plan Impulso', '1 sesión 1 a 1 limitada por período', 'Prioridad en espacios de destrabe', 'Revisión de casos complejos', 'Acceso a instancias más reducidas y confidenciales'],
    cta: 'Quiero Aceleración',
    msg: 'Hola, quiero el plan Aceleración del Gimnasio de Liderazgo.',
    featured: false,
  },
]

const diagnostico = ['Cuestionario autoadministrado', 'Lectura por pilares', 'Resultado inmediato', 'Recomendación de ruta', 'Invitación a devolución grupal opcional']

const celulas = [
  { t: 'Edición Fundadores', d: 'Para quienes están ordenando el arranque, afinando la propuesta y saliendo del caos inicial.' },
  { t: 'Edición Liderazgo', d: 'Para quienes ya tienen movimiento y necesitan profesionalizar su forma de conducir, delegar mejor y ordenar el equipo.' },
  { t: 'Edición Escala', d: 'Para quienes buscan autonomía, procesos y crecimiento sostenible sin depender tanto de su presencia constante.' },
]

const faqs = [
  { q: '¿Es para empresas grandes?', a: 'No. Está pensado principalmente para emprendedores, dueños de pequeños negocios y líderes en crecimiento.' },
  { q: '¿Tengo que hacer el diagnóstico para entrar?', a: 'Sí. Nos ayuda a entender tu punto de partida y orientarte mejor.' },
  { q: '¿Puedo entrar en cualquier momento?', a: 'La membresía base puede tener más flexibilidad, pero las células y cohortes intensivas se organizan por ventanas de ingreso.' },
  { q: '¿Hay sesiones 1 a 1?', a: 'Sí, están reservadas para el plan Aceleración o para sesiones de destrabe.' },
  { q: '¿La modalidad es online?', a: 'Sí, la base es online. Más adelante pueden sumarse instancias híbridas o presenciales.' },
]

const Eyebrow = ({ children }) => (
  <p className="font-body font-bold text-gold tracking-[0.15em] text-base uppercase mb-4">
    {children}
  </p>
)

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, margin: '-60px' },
}

export default function GimnasioLiderazgo() {
  return (
    <main className="relative bg-navy-deep overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative px-8 pt-40 pb-16">
        <div className="absolute -top-24 -right-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-160 h-96 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div {...reveal}>
            <Link to="/servicios" className="inline-flex items-center gap-2 text-white/60 hover:text-gold text-sm font-body mb-6">
              <ArrowLeft size={16} /> Volver a Servicios
            </Link>
            <Eyebrow>Gimnasio de Liderazgo</Eyebrow>
            <h1 className="font-display font-bold text-white text-3xl lg:text-4xl leading-tight mb-8">
              Entrenamiento para emprendedores y líderes que quieren pensar mejor, ejecutar mejor y crecer con menos soledad.
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2"
              >
                <a href={DIAGNOSTICO_WA} target="_blank" rel="noopener noreferrer">
                  Hacer mi diagnóstico
                  <MessageCircle size={16} />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-gold bg-transparent text-white hover:bg-gold hover:text-white hover:border-gold px-8 h-12 font-body font-medium text-sm"
              >
                <a href="#planes">Ver los planes</a>
              </Button>
            </div>
          </motion.div>

          <motion.div {...reveal}>
            <img
              src={imgJovenes}
              alt="Emprendedores y líderes entrenando juntos"
              className="w-full aspect-4/3 object-cover rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/30"
            />
          </motion.div>
        </div>
      </section>

      {/* ── SI TE PASA ESTO ── */}
      <section className="relative px-8 py-12">
        <div className="absolute -top-32 -left-40 w-120 h-120 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />

        <motion.div className="relative max-w-3xl mx-auto" {...reveal}>
          <Eyebrow>Si te pasa esto, este espacio puede ayudarte</Eyebrow>
          <ul className="flex flex-col gap-3 mt-4 mb-8">
            {painPoints.map((p) => (
              <li key={p} className="flex gap-3 items-start">
                <Check size={16} className="text-gold shrink-0 mt-1" />
                <p className="font-body text-white/75 text-base leading-relaxed">{p}</p>
              </li>
            ))}
          </ul>
          <p className="font-display italic text-gold/90 text-lg lg:text-xl leading-snug">
            No hace falta estar en crisis para buscar apoyo. A veces alcanza con reconocer que ya no
            querés seguir liderando del mismo modo.
          </p>
        </motion.div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="relative px-8 py-12">
        <div className="absolute -bottom-40 -right-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />

        <motion.div className="relative max-w-5xl mx-auto mb-14" {...reveal}>
          <Eyebrow>Cómo funciona</Eyebrow>
          <h2 className="font-display font-bold text-white text-3xl lg:text-4xl">
            Un sistema simple, en cinco pasos.
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto flex flex-col gap-5">
          {steps.map((s, i) => (
            <motion.div key={s.t} className="flex gap-5 items-start" {...reveal}>
              <div className="w-12 h-12 rounded-full bg-navy-mid/40 flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-gold text-3xl leading-none -translate-y-0.5">{i + 1}</span>
              </div>
              <div>
                <p className="font-body font-semibold text-white text-base mb-1">{s.t}</p>
                <p className="font-body text-white/65 text-sm leading-relaxed">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── QUÉ TE LLEVÁS ── */}
      <section className="relative px-8 py-12">
        <motion.div className="relative max-w-5xl mx-auto" {...reveal}>
          <Eyebrow>Qué te llevás</Eyebrow>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {takeaways.map((t) => (
              <div key={t} className="flex gap-3 items-start rounded-lg border border-white/10 bg-white/3 px-5 py-4">
                <Check size={16} className="text-gold shrink-0 mt-0.5" />
                <p className="font-body text-white/80 text-sm">{t}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── LOS PLANES ── */}
      <section id="planes" className="relative px-8 py-12 scroll-mt-24">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-160 h-80 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />

        <motion.div className="relative max-w-5xl mx-auto text-center mb-16" {...reveal}>
          <Eyebrow>Los planes</Eyebrow>
          <h2 className="font-display font-bold text-white text-3xl lg:text-4xl">
            Elegí el nivel de acompañamiento.
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={cn(
                'rounded-xl p-8 flex flex-col h-full',
                plan.featured ? 'border border-gold/40 bg-navy-mid/15' : 'border border-white/10 bg-white/3'
              )}
              {...reveal}
            >
              {plan.featured && (
                <span className="font-body text-[10px] font-bold tracking-widest text-gold uppercase mb-3">
                  ★ Más elegido
                </span>
              )}
              <h3 className="font-display font-bold text-white text-2xl mb-2">{plan.name}</h3>
              <p className="font-body text-white/55 text-sm leading-relaxed mb-6">{plan.tagline}</p>

              <div className="mb-6">
                <span className="font-display font-bold text-white text-3xl">{plan.price}</span>
                <span className="font-body text-white/50 text-sm"> {plan.period}</span>
              </div>

              <ul className="flex flex-col gap-2.5 mb-6">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-2.5 items-start">
                    <Check size={15} className="text-gold shrink-0 mt-0.5" />
                    <span className="font-body text-white/70 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="font-body text-white/40 text-xs leading-relaxed mb-6">{plan.modalidad}</p>

              <div className="mt-auto">
                <Button
                  asChild
                  className={cn(
                    'w-full rounded-full h-11 font-body font-semibold text-sm gap-2',
                    plan.featured
                      ? 'bg-gold text-white hover:bg-gold/90 border-0'
                      : 'bg-white/10 text-white border border-white/30 hover:bg-gold hover:border-gold backdrop-blur-sm'
                  )}
                >
                  <a href={waLink(plan.msg)} target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                    <MessageCircle size={15} />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EL DIAGNÓSTICO ── */}
      <section className="relative px-8 py-12">
        <div className="absolute -bottom-40 -left-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />

        <motion.div className="relative max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/3 p-8 lg:p-12" {...reveal}>
          <Eyebrow>El diagnóstico</Eyebrow>
          <h2 className="font-display font-bold text-white text-2xl lg:text-3xl mb-4">
            Stress Test de Robustez y Crecimiento
          </h2>
          <p className="font-body text-white/65 text-base leading-relaxed mb-6">
            Antes de entrar, podés hacer el diagnóstico. Es la puerta de entrada al sistema y sirve para
            entender con más claridad en qué punto estás hoy y cuál puede ser tu próximo paso.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-8">
            {diagnostico.map((d) => (
              <div key={d} className="flex gap-2.5 items-start">
                <Check size={15} className="text-gold shrink-0 mt-0.5" />
                <span className="font-body text-white/70 text-sm">{d}</span>
              </div>
            ))}
          </div>
          <Button
            asChild
            className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-7 h-11 font-body font-semibold text-sm gap-2"
          >
            <a href={DIAGNOSTICO_WA} target="_blank" rel="noopener noreferrer">
              Hacer mi diagnóstico
              <MessageCircle size={15} />
            </a>
          </Button>
        </motion.div>
      </section>

      {/* ── CÉLULAS DE TRACCIÓN ── */}
      <section className="relative px-8 py-12">
        <motion.div className="relative max-w-5xl mx-auto mb-14" {...reveal}>
          <Eyebrow>Células de Tracción</Eyebrow>
          <h2 className="font-display font-bold text-white text-3xl lg:text-4xl mb-5">
            Pensar mejor con otros.
          </h2>
          <p className="font-body text-white/65 text-base leading-relaxed max-w-2xl">
            Grupos pequeños, estables y cerrados. Se arman para que no tengas que explicar todo desde
            cero y para que la conversación sea realmente útil: personas atravesando desafíos similares,
            en un momento parecido del negocio o del liderazgo.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {celulas.map((c) => (
            <motion.div key={c.t} className="rounded-xl border border-white/10 bg-white/3 p-7" {...reveal}>
              <p className="font-display font-bold text-white text-lg mb-3">{c.t}</p>
              <p className="font-body text-white/65 text-sm leading-relaxed">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SESIÓN DE DESTRABE ── */}
      <section className="relative px-8 py-12">
        <div className="absolute -top-32 -right-40 w-120 h-120 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />

        <motion.div className="relative max-w-3xl mx-auto text-center" {...reveal}>
          <Eyebrow>Sesión de destrabe</Eyebrow>
          <h2 className="font-display font-bold text-white text-2xl lg:text-3xl mb-5">
            Cuando hace falta ir al punto.
          </h2>
          <p className="font-body text-white/65 text-base leading-relaxed mb-8">
            A veces no necesitás más información. Necesitás mirar de frente una situación concreta y
            destrabarla. Para eso están las sesiones premium: espacios breves, enfocados y muy prácticos,
            pensados para ayudarte a salir del bloqueo con claridad y próximos pasos concretos.
          </p>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-gold bg-transparent text-white hover:bg-gold hover:text-white hover:border-gold px-8 h-11 font-body font-medium text-sm gap-2"
          >
            <a href={DESTRABE_WA} target="_blank" rel="noopener noreferrer">
              Reservar una sesión
              <MessageCircle size={15} />
            </a>
          </Button>
        </motion.div>
      </section>

      {/* ── LO QUE HACE DISTINTO ── */}
      <section className="relative px-8 py-12">
        <motion.div className="relative max-w-3xl mx-auto text-center" {...reveal}>
          <Eyebrow>Lo que hace distinto a este espacio</Eyebrow>
          <p className="font-body text-white/60 text-base leading-relaxed mb-6">
            No es un curso grabado. No es una fórmula mágica. No es una consultoría distante. No es un
            espacio para sentirse abrumado con más contenido.
          </p>
          <p className="font-display italic text-white/85 text-2xl lg:text-3xl leading-snug">
            Es una propuesta humana, clara y concreta para que puedas liderar con más calma, más orden y
            más confianza.
          </p>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative px-8 py-12">
        <motion.div className="relative max-w-3xl mx-auto" {...reveal}>
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <Accordion type="single" collapsible className="mt-4 border-t border-white/10">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-white/10">
                <AccordionTrigger className="font-body text-white font-medium text-base hover:text-gold hover:no-underline py-5 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-white/60 text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* ── CIERRE / CTA ── */}
      <section className="relative px-8 py-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-80 rounded-full bg-navy-mid/25 blur-3xl pointer-events-none" />
        <motion.div className="relative max-w-2xl mx-auto text-center" {...reveal}>
          <h2 className="font-display font-bold text-white text-3xl lg:text-4xl mb-6">
            No necesitás hacerlo solo.
          </h2>
          <p className="font-body text-white/60 text-base leading-relaxed mb-10">
            Si sentís que tu negocio o tu proyecto pueden dar más, pero hoy te falta estructura, compañía
            o criterio para avanzar, este puede ser tu próximo paso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2"
            >
              <a href={ENTRAR_WA} target="_blank" rel="noopener noreferrer">
                Quiero entrar al Gimnasio de Liderazgo
                <MessageCircle size={16} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-gold bg-transparent text-white hover:bg-gold hover:text-white hover:border-gold px-8 h-12 font-body font-medium text-sm gap-2"
            >
              <Link to="/#contacto">
                Escribinos
                <Mail size={16} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
