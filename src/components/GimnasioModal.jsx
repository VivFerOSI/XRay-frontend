import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'BÁSICO',
    tagline: 'Ideal para empezar',
    hours: '4 hs mensuales',
    items: ['4 hs coaching', 'Foros 24/7', 'Discord', 'Sin permanencia'],
    featured: false,
  },
  {
    name: 'PRO',
    tagline: 'Para los que van en serio',
    hours: '8 hs mensuales',
    items: ['8 hs coaching', 'Foros 24/7', 'Discord', 'Sin permanencia', 'Retos y rankings', 'Feedback personalizado'],
    featured: true,
  },
  {
    name: 'PREMIUM',
    tagline: 'Tu pase ilimitado',
    hours: 'Horas ilimitadas',
    items: ['Todo PRO', 'Sesiones presenciales individuales', 'Reuniones de pares presenciales', 'Foros de expertos', 'Soporte prioritario'],
    featured: false,
  },
]

const faqs = [
  { q: '¿A quiénes va dirigido?', a: 'A líderes, fundadores, profesionales y emprendedores que buscan transformar la complejidad del entorno en una ventaja estratégica deliberada.' },
  { q: '¿Cómo se define con quién entreno?', a: 'Realizamos una entrevista de diagnóstico inicial para asignarte el mentor más adecuado según tu industria, desafíos y objetivos.' },
  { q: '¿Cuáles son los horarios de las sesiones?', a: 'Las sesiones se coordinan directamente con tu mentor según disponibilidad mutua, con amplia flexibilidad horaria.' },
  { q: '¿Todo el formato es online?', a: 'Los planes BÁSICO y PRO son 100% online. El plan PREMIUM incluye sesiones presenciales en Buenos Aires.' },
  { q: '¿Cómo accedo al formato presencial?', a: 'Las sesiones presenciales del plan PREMIUM se realizan en nuestras instalaciones en Buenos Aires, previa coordinación.' },
  { q: '¿Hay algún tipo de permanencia o matrícula?', a: 'No. Todos los planes son sin permanencia. Podés cancelar en cualquier momento sin cargos adicionales.' },
]

const pillars = [
  { title: 'Mentoreo en Directo', desc: 'Nada de cursos grabados que nunca terminás. Sesiones en vivo con "entrenadores" que ya han facturado lo que vos buscás o liderado los equipos que vos soñás.' },
  { title: 'Foro de Pares 24/7', desc: 'La duda de un CEO no espera. Entrá a nuestra comunidad de consulta inmediata donde siempre hay un mentor o un par estratégico conectado.' },
  { title: 'Gamificación de Resultados', desc: 'Retos mensuales de productividad e indicadores clave. Si no se mide, no crece. Aquí la constancia se premia.' },
  { title: 'Bienestar del Líder', desc: 'No sacrificamos tu salud mental. Aplicamos estrategias de estudio y ejecución rápidas para que recuperes tu vida fuera de la oficina.' },
]

export default function GimnasioModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={true}
        className={cn(
          // override sm:max-w-sm from shadcn default
          'sm:max-w-3xl w-full max-h-[92vh] overflow-hidden',
          'bg-offwhite rounded-lg p-0 gap-0 ring-0 shadow-2xl',
          'flex flex-col'
        )}
      >
        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          {/* Header strip */}
          <div className="bg-navy-deep px-10 pt-10 pb-8">
            <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase mb-3">
              Programa de alto rendimiento
            </p>
            <DialogHeader>
              <DialogTitle className="font-display font-bold text-white text-4xl leading-tight">
                Gimnasio de Mente
              </DialogTitle>
            </DialogHeader>
            <p className="font-body text-white/60 text-base mt-3 leading-relaxed max-w-xl">
              Dejá de "aprender", empezá a entrenar. Transformamos la gestión de negocios y el liderazgo en un entrenamiento de alto rendimiento.
            </p>
          </div>

          <div className="px-10 py-8">
            {/* Intro */}
            <p className="font-body text-carbon/70 text-base leading-relaxed mb-10">
              ¿Sentís que estás estancado en la zona media de la tabla o que tu proyecto te consume? La mente de un líder necesita un espacio de puesta a punto constante: la gestión de la incertidumbre, la toma de decisiones bajo presión y el autodominio.
            </p>

            {/* 4 Pillars — list, no grid */}
            <p className="font-body font-bold text-gold tracking-[0.2em] text-[11px] uppercase mb-5">
              4 Pilares
            </p>
            <div className="flex flex-col gap-4 mb-10">
              {pillars.map((p, i) => (
                <div key={p.title} className="flex gap-5 items-start">
                  <div className="w-7 h-7 rounded-full bg-navy-deep flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-body font-bold text-gold text-xs">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-navy-deep text-sm mb-1">{p.title}</p>
                    <p className="font-body text-carbon/70 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Why */}
            <div className="border-l-4 border-gold bg-navy-deep/4 px-6 py-5 mb-10">
              <p className="font-body font-semibold text-navy-deep text-sm mb-3">¿Por qué esto funciona?</p>
              <p className="font-body text-carbon/70 text-sm leading-relaxed mb-3">
                El mercado está lleno de cursos de $10 USD y Masterminds de lujo de $5.000 USD. Esta suscripción cubre el hueco del medio con:
              </p>
              <div className="flex flex-col gap-1.5">
                {['Acceso real (no solo videos).', 'Sentido de pertenencia (tribus de iguales).', 'Accountability — alguien que te empuje a cumplir lo que dijiste que harías.'].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start font-body text-carbon/70 text-sm">
                    <span className="text-gold font-bold shrink-0 mt-0.5">→</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Plans */}
            <p className="font-body font-bold text-gold tracking-[0.2em] text-[11px] uppercase mb-5">
              Elegí tu plan
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    'rounded-lg p-6 flex flex-col gap-3',
                    plan.featured
                      ? 'bg-navy-deep'
                      : 'bg-white border border-carbon/15'
                  )}
                >
                  {plan.featured && (
                    <span className="font-body text-[10px] font-bold tracking-widest text-gold uppercase">
                      ★ Más elegido
                    </span>
                  )}
                  <div>
                    <p className={cn(
                      'font-body font-bold text-xs tracking-widest uppercase mb-1',
                      plan.featured ? 'text-gold' : 'text-navy-deep'
                    )}>
                      {plan.name}
                    </p>
                    <p className={cn('font-body text-xs', plan.featured ? 'text-white/50' : 'text-carbon/50')}>
                      {plan.tagline}
                    </p>
                  </div>
                  <p className={cn('font-display font-bold text-xl', plan.featured ? 'text-white' : 'text-navy-deep')}>
                    {plan.hours}
                  </p>
                  <ul className="flex flex-col gap-2 mt-1">
                    {plan.items.map((item) => (
                      <li key={item} className="flex gap-2 items-start">
                        <span className={cn('text-xs mt-0.5 shrink-0', plan.featured ? 'text-gold' : 'text-navy-deep/40')}>✓</span>
                        <span className={cn('font-body text-xs leading-relaxed', plan.featured ? 'text-white/80' : 'text-carbon/70')}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <p className="font-body font-bold text-gold tracking-[0.2em] text-[11px] uppercase mb-4">
              Preguntas frecuentes
            </p>
            <Accordion type="single" collapsible className="mb-4 border-t border-carbon/10">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-carbon/10">
                  <AccordionTrigger className="font-body text-carbon font-medium text-sm hover:text-navy-deep hover:no-underline py-4 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-carbon/70 text-sm leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="border-t border-carbon/10 bg-offwhite px-10 py-5 flex justify-end gap-3 shrink-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-navy-deep text-navy-deep hover:bg-navy-deep hover:text-white rounded-full px-7 h-10 font-body text-sm font-medium"
          >
            Volver
          </Button>
          <Button
            asChild
            className="bg-navy-deep text-white hover:bg-gold border-0 rounded-full px-7 h-10 font-body text-sm font-medium"
          >
            <Link to="/#contacto" onClick={onClose}>
              Contactanos
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
