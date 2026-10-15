import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * Las dos autoevaluaciones de gestión del desempeño, al tope de Servicios.
 *
 * Sin imagen y a propósito: el resto de la página son tarjetas con foto a
 * sangre, y acá lo que importa es que se lea la diferencia entre las dos
 * perspectivas y se elija una. Una foto detrás competía con esa decisión.
 *
 * Cada perspectiva lleva una línea que dice a quién le corresponde: los dos
 * nombres se parecen —"del Evaluador" y "de la Persona Evaluada"— y sin esa
 * línea hay que entrar a una para saber cuál es la propia.
 *
 * Los textos son del cliente (09/10/2026). Están acá y no en la definición del
 * cuestionario porque presentan al par, no a cada uno por separado.
 */

const PERSPECTIVAS = [
  {
    to: '/autoevaluacion/evaluador',
    titulo: 'Autoevaluación del Evaluador',
    bajada: 'Para quienes conducen el proceso de evaluación y desarrollo.',
  },
  {
    // La clave del cuestionario sigue siendo `lider`: se ofrece con otro
    // nombre, pero cambiarla rompería los informes ya emitidos.
    to: '/autoevaluacion/lider',
    titulo: 'Autoevaluación de la Persona Evaluada',
    bajada: 'Para quienes participan como evaluados y gestionan su propio crecimiento.',
  },
]

export default function GestionDesempeno() {
  return (
    <section className="bg-navy-deep">
      <motion.div
        className="px-8 lg:px-14 py-20 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-8 h-px bg-gold mx-auto mb-6" />
        <h2 className="font-display font-bold text-white text-2xl lg:text-[1.75rem] leading-snug mb-5">
          Gestión del desempeño: dos perspectivas para una conversación de desarrollo
        </h2>
        <p className="font-body text-white/70 text-[15px] leading-relaxed mb-3">
          Una conversación de desarrollo efectiva se construye entre dos miradas: la de quien
          evalúa y la de quien recibe la evaluación.
        </p>
        <p className="font-body text-white/70 text-[15px] leading-relaxed mb-12">
          Dos autoevaluaciones complementarias para transformar la evaluación anual en una
          conversación más clara, justa y orientada al desarrollo.
        </p>

        <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase mb-6">
          Elegí tu perspectiva
        </p>

        <div className="grid sm:grid-cols-2 gap-4 text-left">
          {PERSPECTIVAS.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="group rounded-2xl border border-white/12 bg-white/4 p-6 hover:border-gold/45 hover:bg-white/6 transition-colors duration-200"
            >
              <h3 className="font-display font-bold text-white text-lg leading-snug mb-2 group-hover:text-gold transition-colors duration-200">
                {p.titulo}
              </h3>
              <p className="font-body text-white/55 text-sm leading-relaxed mb-5">{p.bajada}</p>
              <span className="inline-flex items-center gap-1.5 font-body font-semibold text-gold text-sm">
                Hacer la autoevaluación
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
