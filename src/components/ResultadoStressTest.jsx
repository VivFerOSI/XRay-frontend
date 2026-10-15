import { motion } from 'framer-motion'
import { Dumbbell, MessageCircle, Printer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import PilarRadar from '@/components/PilarRadar'

const WHATSAPP = 'https://wa.me/5491176766932'

// Color del "semáforo" según el puntaje del pilar (5–25).
export function bandColor(score) {
  if (score >= 21) return { bar: 'bg-emerald-500', text: 'text-emerald-400' }
  if (score >= 16) return { bar: 'bg-lime-500', text: 'text-lime-400' }
  if (score >= 11) return { bar: 'bg-amber-500', text: 'text-amber-400' }
  return { bar: 'bg-rose-500', text: 'text-rose-400' }
}

/**
 * Devolución de una autoevaluación. La usan dos pantallas: el final del flujo
 * de `Autoevaluacion` y el enlace permanente `/autoevaluacion/resultado/:id`
 * que va en el correo, así el informe se ve igual en ambos lados.
 *
 * Sirve a cualquier cuestionario: los títulos salen del resultado, la
 * devolución por pilar puede ser un párrafo o una lista, y el cierre puede
 * venir del cruce entre el norte elegido y el nivel alcanzado.
 *
 * Al pie, el paso siguiente: hablar con X-Ray o entrenar en el Gimnasio de
 * Liderazgo. Antes había un "Hacerlo de nuevo" que invitaba a repetir el
 * cuestionario recién terminado, que no lleva a ninguna parte.
 */
export default function ResultadoStressTest({
  result,
  nombreEmprendimiento,
  fecha,
}) {
  const titulo = result.assessmentTitle ?? 'Stress Test de Robustez y Crecimiento'
  const corto = result.assessmentShortName ?? 'Stress Test'

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="print-area">
      {/* Encabezado que solo aparece al imprimir / guardar como PDF */}
      <div className="hidden print:block mb-8 pb-4 border-b border-black/15">
        <p className="font-display font-bold text-2xl print-navy">X<span className="print-gold">-</span>RAY</p>
        <p className="font-body text-[10px] tracking-[0.2em] uppercase print-gold mb-3">{titulo}</p>
        <p className="font-body text-xs print-muted">
          {nombreEmprendimiento} &middot; {(fecha ? new Date(fecha) : new Date()).toLocaleDateString('es-AR')}
        </p>
      </div>
      <p className="font-body font-semibold text-gold print-gold tracking-[0.2em] text-[11px] uppercase mb-4">Tu diagnóstico</p>

      {/* Foto global */}
      <div className="rounded-2xl border border-gold/30 bg-white/3 p-8 mb-10">
        <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
          <h1 className="font-display font-bold text-white text-2xl lg:text-3xl">{result.global.title}</h1>
          <span className="font-display font-bold text-gold print-gold text-2xl">{result.total}<span className="text-white/40 text-lg font-body"> / {result.maxTotal}</span></span>
        </div>
        <p className="font-body font-semibold text-gold print-gold text-sm mb-3">{result.global.perfil}</p>
        <p className="font-body text-white/70 text-sm leading-relaxed">{result.global.text}</p>
      </div>

      {/* Lectura general (solo en los cuestionarios que la definen) */}
      {result.lecturaGeneral?.length > 0 && (
        <div className="mb-12">
          <h2 className="font-display font-bold text-white text-xl mb-5">Lectura general</h2>
          <div className="flex flex-col gap-3">
            {result.lecturaGeneral.map((p, i) => (
              <p key={i} className="font-body text-white/65 text-sm leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      )}

      {/* Semáforo de pilares */}
      <h2 className="font-display font-bold text-white text-xl mb-5">Semáforo de pilares</h2>
      <div className="mb-8">
        <PilarRadar pilares={result.pilares} />
      </div>
      <div className="flex flex-col gap-4 mb-12">
        {result.pilares.map((p) => {
          const c = bandColor(p.score)
          return (
            <div key={p.key}>
              <div className="flex justify-between items-baseline mb-1.5 gap-3">
                <span className="font-body text-white/80 text-sm">{p.name}</span>
                <span className={`font-body text-sm font-semibold text-right ${c.text}`}>{p.score}/25 · {p.bandTitle}</span>
              </div>
              <div className="h-2.5 bg-white/8 print-track rounded-full overflow-hidden">
                <div className={`h-full rounded-full print-keep ${c.bar} transition-all duration-700`} style={{ width: `${(p.score / 25) * 100}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Detalle por pilar: párrafo o lista, según el cuestionario */}
      <h2 className="font-display font-bold text-white text-xl mb-5">Lectura por pilar</h2>
      <div className="flex flex-col gap-5 mb-12">
        {result.pilares.map((p) => (
          <div key={p.key} className="rounded-xl border border-white/10 bg-white/3 p-6">
            <p className="font-body font-semibold text-white text-sm mb-2">{p.name} — <span className={bandColor(p.score).text}>{p.bandTitle}</span></p>
            {p.bandBullets?.length > 0 ? (
              <ul className="flex flex-col gap-2 mt-3">
                {p.bandBullets.map((b, i) => (
                  <li key={i} className="font-body text-white/65 text-sm leading-relaxed flex gap-2.5">
                    <span className={`${bandColor(p.score).text} shrink-0`} aria-hidden="true">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-body text-white/65 text-sm leading-relaxed">{p.bandText}</p>
            )}
          </div>
        ))}
      </div>

      {/* Llamada a la acción */}
      <div className="rounded-2xl border-l-4 border-gold bg-navy-mid/15 px-6 py-6 mb-10">
        <p className="font-body text-white/80 text-sm leading-relaxed mb-3">{result.global.closing}</p>
        {result.cruce ? (
          <>
            <p className="font-body font-semibold text-gold print-gold text-sm mb-2">{result.cruce.lectura}</p>
            <p className="font-body text-white/80 text-sm leading-relaxed mb-3">{result.cruce.diagnostico}</p>
            <p className="font-body text-white/80 text-sm leading-relaxed">
              <span className="font-semibold text-white">Primer paso: </span>
              {result.cruce.primerPaso}
            </p>
          </>
        ) : (
          <p className="font-body text-white/80 text-sm leading-relaxed">{result.norteClosing}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 no-print">
        <Button
          asChild
          className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2"
        >
          <a
            href={`${WHATSAPP}?text=${encodeURIComponent(
              `Hola, hice el ${corto} y mi resultado fue "${result.global.title}". Quiero conversar los próximos pasos.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar una conversación <MessageCircle size={16} />
          </a>
        </Button>
        <Button
          variant="ghost"
          onClick={() => window.print()}
          className="text-white/60 hover:text-gold hover:bg-transparent gap-2"
        >
          <Printer size={15} /> Descargar mi informe
        </Button>
        <Button
          asChild
          variant="ghost"
          className="text-white/60 hover:text-gold hover:bg-transparent gap-2"
        >
          <Link to="/gimnasio-liderazgo">
            <Dumbbell size={15} /> Gimnasio de Liderazgo
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}
