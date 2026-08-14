import { motion } from 'framer-motion'
import { Check, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import imgManos from '../assets/iStock-457074035 Manos entrelazadas.jpg'
import imgNube from '../assets/nube-ubuntu.png'
import imgRoi from '../assets/iStock-2245441541 ROI.jpg'

// WhatsApp — canal de conversión.
const WHATSAPP_URL = 'https://wa.me/5491176764601'
const waLink = (msg) => `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`
const EXPLORACION_WA = waLink('Hola, quiero solicitar una reunión de exploración por el programa Comunidad Ubuntu.')
const CONOCER_WA = waLink('Hola, quiero conocer el programa Comunidad Ubuntu. ¿Me pasan más información?')

const dimensiones = [
  'Prácticas de comunidad y escucha profunda.',
  'Herramientas para habitar el tiempo, regular la presión y ampliar la resiliencia.',
  'Un proyecto social co-creado por el grupo.',
]

const incluye = [
  '6 encuentros grupales quincenales.',
  '3 espacios de seguimiento del proyecto social.',
  'Un cierre final con devolución de aprendizajes y resultados.',
]

const temas = [
  'El arte de habitar el tiempo',
  'El gimnasio emocional',
  'La colaboración radical',
  'El liderazgo Ubuntu',
]

const beneficiosOrg = [
  'Fortalecer el bienestar percibido y la energía del equipo.',
  'Mejorar la cohesión entre áreas y la calidad de los vínculos.',
  'Favorecer conversaciones más honestas y colaborativas.',
  'Construir una narrativa sólida de cultura, propósito y responsabilidad social.',
]

const beneficiosPersonas = [
  'Un espacio seguro para expresarse y escucharse.',
  'Herramientas para gestionar presión, cambio e incertidumbre.',
  'Una mayor sensación de pertenencia.',
  'La experiencia de contribuir a una causa que trasciende lo individual.',
]

const medicion = [
  'Bienestar y nivel de energía del equipo.',
  'Sentido de pertenencia.',
  'Colaboración y calidad de los vínculos interárea.',
  'Percepción de apoyo y participación.',
  'Impacto social generado.',
]

const faqs = [
  {
    q: '¿Para qué tipo de empresa está pensada?',
    a: 'Para organizaciones de tecnología o salud, idealmente con más de 200 empleados, que quieran trabajar bienestar, cohesión y propósito de manera estructurada.',
  },
  {
    q: '¿Es un programa de formación?',
    a: 'No exactamente. Es una experiencia de comunidad con talleres, dinámica grupal y un proyecto social integrado.',
  },
  { q: '¿Cuánto dura?', a: 'El piloto dura 3 meses.' },
  {
    q: '¿Cómo se mide el impacto?',
    a: 'Con encuestas breves pre y post, más indicadores de participación e impacto social.',
  },
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

export default function ComunidadUbuntu() {
  return (
    <main className="relative bg-navy-deep overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative px-8 pt-40 pb-28">
        <div className="absolute -top-24 -right-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-160 h-96 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div {...reveal}>
            <Eyebrow>Comunidad Ubuntu</Eyebrow>
            <h1 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-6">
              Comunidad Ubuntu
            </h1>
            <p className="font-body text-white/65 text-lg leading-relaxed mb-10">
              Un programa piloto de 3 meses para cultivar bienestar y plenitud, transformando el
              desgaste en cohesión, resiliencia colectiva y propósito compartido en empresas de
              tecnología y salud.
            </p>
            <Button
              asChild
              className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2"
            >
              <a href={EXPLORACION_WA} target="_blank" rel="noopener noreferrer">
                Solicitar una reunión de exploración
                <MessageCircle size={16} />
              </a>
            </Button>
          </motion.div>

          <motion.div {...reveal}>
            <img
              src={imgManos}
              alt="Manos entrelazadas — comunidad"
              className="w-full aspect-4/3 object-cover rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/30"
            />
          </motion.div>
        </div>
      </section>

      {/* ── QUÉ ES UBUNTU ── */}
      <section className="relative px-8 py-28">
        <div className="absolute -top-32 -left-40 w-120 h-120 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div className="lg:order-2" {...reveal}>
            <Eyebrow>Qué es Ubuntu</Eyebrow>
            <p className="font-body text-white/70 text-base lg:text-lg leading-relaxed mb-8">
              Ubuntu es una visión de comunidad basada en una idea esencial:{' '}
              <span className="text-white font-medium">nadie crece solo.</span>
            </p>

            <div className="border-l-2 border-gold/60 pl-5 mb-8">
              <p className="font-display italic text-gold text-xl lg:text-2xl leading-snug mb-2">
                Umuntu ngumuntu ngabantu
              </p>
              <p className="font-body text-white/60 text-sm">
                <span className="uppercase tracking-widest text-[10px] text-white/40">Zulú</span> — Una
                persona llega a ser quien es a través de otras personas.
              </p>
            </div>

            <p className="font-body text-white/70 text-base leading-relaxed">
              Inspirada en ese principio, Comunidad Ubuntu propone un espacio de aprendizaje, escucha y
              colaboración donde las personas se fortalecen mutuamente y el trabajo recupera dimensión
              humana.
            </p>
          </motion.div>

          <motion.div className="lg:order-1" {...reveal}>
            <img
              src={imgNube}
              alt="Valores de Comunidad Ubuntu"
              className="w-full aspect-3/2 object-cover rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/30"
            />
          </motion.div>
        </div>
      </section>

      {/* ── EL DESAFÍO ── */}
      <section className="relative px-8 py-28">
        <motion.div className="relative max-w-3xl mx-auto text-center" {...reveal}>
          <Eyebrow>El desafío actual</Eyebrow>
          <h2 className="font-display font-bold text-white text-3xl lg:text-4xl leading-snug mb-6">
            Talento y compromiso, pero también desgaste y desconexión.
          </h2>
          <p className="font-body text-white/65 text-base lg:text-lg leading-relaxed">
            Muchas organizaciones cuentan con talento, compromiso y capacidad de ejecución. Sin embargo,
            también atraviesan señales cada vez más frecuentes de desgaste, desconexión y fragmentación.
            La exigencia sostenida, la presión por resultados y la falta de espacios genuinos de
            intercambio suelen erosionar la calidad de los vínculos y el sentido compartido.
          </p>
        </motion.div>
      </section>

      {/* ── LA PROPUESTA ── */}
      <section className="relative px-8 py-28">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-160 h-80 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />

        <motion.div className="relative max-w-3xl mx-auto text-center mb-14" {...reveal}>
          <Eyebrow>La propuesta</Eyebrow>
          <h2 className="font-display font-bold text-white text-3xl lg:text-4xl leading-snug mb-6">
            Una experiencia de 3 meses para equipos de tecnología o salud.
          </h2>
          <p className="font-body text-white/65 text-base leading-relaxed">
            Diseñada para construir una cultura más cohesionada, más consciente y más conectada con su
            propósito. No se limita al desarrollo individual: busca activar una inteligencia colectiva
            capaz de sostener, transformar y devolver valor. El programa integra tres dimensiones:
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {dimensiones.map((d, i) => (
            <motion.div
              key={d}
              className="rounded-xl border border-white/10 bg-white/3 p-8"
              {...reveal}
            >
              <div className="w-9 h-9 rounded-full bg-navy-mid/40 flex items-center justify-center mb-5">
                <span className="font-display font-bold text-gold">{i + 1}</span>
              </div>
              <p className="font-body text-white/75 text-sm leading-relaxed">{d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── QUÉ INCLUYE ── */}
      <section className="relative px-8 py-28">
        <div className="absolute -bottom-40 -left-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto grid lg:grid-cols-2 gap-14">
          <motion.div {...reveal}>
            <Eyebrow>Qué incluye</Eyebrow>
            <p className="font-body text-white/70 text-base leading-relaxed mb-6">
              El piloto trabaja con grupos de <span className="text-white font-medium">12 a 20 personas</span> e incluye:
            </p>
            <ul className="flex flex-col gap-3">
              {incluye.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <Check size={16} className="text-gold shrink-0 mt-1" />
                  <p className="font-body text-white/70 text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...reveal}>
            <p className="font-body font-semibold text-gold tracking-[0.15em] text-[11px] uppercase mb-5">
              Temas que se abordan
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {temas.map((t) => (
                <div
                  key={t}
                  className="rounded-lg border border-white/10 bg-white/3 px-5 py-4 font-body text-white/80 text-sm"
                >
                  {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFICIOS ── */}
      <section className="relative px-8 py-28">
        <motion.div className="relative max-w-5xl mx-auto text-center mb-14" {...reveal}>
          <Eyebrow>Beneficios</Eyebrow>
          <h2 className="font-display font-bold text-white text-3xl lg:text-4xl">
            Impacto en la organización y en las personas.
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
          <motion.div className="rounded-xl border border-gold/40 bg-navy-mid/15 p-8 lg:p-10" {...reveal}>
            <h3 className="font-display font-bold text-white text-xl mb-6">Para la organización</h3>
            <ul className="flex flex-col gap-3">
              {beneficiosOrg.map((b) => (
                <li key={b} className="flex gap-3 items-start">
                  <Check size={16} className="text-gold shrink-0 mt-1" />
                  <p className="font-body text-white/70 text-sm leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="rounded-xl border border-white/10 bg-white/3 p-8 lg:p-10" {...reveal}>
            <h3 className="font-display font-bold text-white text-xl mb-6">Para las personas</h3>
            <ul className="flex flex-col gap-3">
              {beneficiosPersonas.map((b) => (
                <li key={b} className="flex gap-3 items-start">
                  <Check size={16} className="text-gold shrink-0 mt-1" />
                  <p className="font-body text-white/70 text-sm leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── CÓMO SE MIDE ── */}
      <section className="relative px-8 py-28">
        <div className="absolute -top-32 -right-40 w-120 h-120 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-14 items-center">
          <motion.div {...reveal}>
            <Eyebrow>Cómo se mide</Eyebrow>
            <p className="font-body text-white/70 text-base leading-relaxed mb-6">
              El proceso cuenta con trazabilidad completa mediante una medición breve antes y después
              del programa, para evaluar cambios en:
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {medicion.map((m) => (
                <li key={m} className="flex gap-3 items-start">
                  <Check size={16} className="text-gold shrink-0 mt-1" />
                  <p className="font-body text-white/70 text-sm leading-relaxed">{m}</p>
                </li>
              ))}
            </ul>
            <div className="border-l-4 border-gold bg-white/3 px-6 py-5 rounded-r-lg">
              <p className="font-body font-semibold text-white text-sm mb-2">
                Entregable clave: Informe de Impacto final
              </p>
              <p className="font-body text-white/65 text-sm leading-relaxed">
                Diseñado para la Dirección y Recursos Humanos, consolida métricas cuantitativas,
                evolución cualitativa y los resultados del proyecto social — un insumo sólido para
                reportes de sostenibilidad, cultura y clima laboral.
              </p>
            </div>
          </motion.div>

          <motion.div {...reveal}>
            <img
              src={imgRoi}
              alt="Retorno e impacto"
              className="w-full max-w-xs mx-auto aspect-4/3 object-cover rounded-2xl ring-1 ring-white/10 shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ── QUÉ LO HACE DIFERENTE ── */}
      <section className="relative px-8 py-28">
        <motion.div className="relative max-w-3xl mx-auto text-center" {...reveal}>
          <Eyebrow>Qué hace diferente a este programa</Eyebrow>
          <p className="font-display italic text-white/80 text-2xl lg:text-3xl leading-snug mb-6">
            No es un taller aislado ni una acción puntual de bienestar.
          </p>
          <p className="font-body text-white/65 text-base lg:text-lg leading-relaxed">
            Es una comunidad con continuidad, con rituales, aprendizaje experiencial y propósito
            compartido. Esa combinación permite una transformación más profunda, más elegante y más
            sostenible que las intervenciones fragmentadas.
          </p>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative px-8 py-28">
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
      <section className="relative px-8 py-28">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-80 rounded-full bg-navy-mid/25 blur-3xl pointer-events-none" />
        <motion.div className="relative max-w-2xl mx-auto text-center" {...reveal}>
          <h2 className="font-display font-bold text-white text-3xl lg:text-4xl mb-6">
            El siguiente paso: un piloto acotado.
          </h2>
          <p className="font-body text-white/60 text-base leading-relaxed mb-10">
            Nosotros nos encargamos del diseño, la facilitación y la medición. Al finalizar los 3 meses
            revisamos resultados concretos para evaluar continuidad o escalamiento.
          </p>
          <Button
            asChild
            className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2"
          >
            <a href={CONOCER_WA} target="_blank" rel="noopener noreferrer">
              Quiero conocer el programa
              <MessageCircle size={16} />
            </a>
          </Button>
        </motion.div>
      </section>
    </main>
  )
}
