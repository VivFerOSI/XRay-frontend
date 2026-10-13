import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import imgGestionDesempeno from '../assets/iStock-2197991177 Liderazgo-w.jpg'

/**
 * Las dos autoevaluaciones de gestión del desempeño, al tope de Servicios.
 *
 * Cada perspectiva lleva una línea que la describe: los dos nombres se
 * parecen ("del Evaluador" / "de la Persona Evaluada") y sin esa línea el
 * lector tiene que entrar a una para saber cuál le corresponde.
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
    <section className="relative overflow-hidden">
      <img
        src={imgGestionDesempeno}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/85 to-navy-deep" />

      <motion.div
        className="relative px-10 lg:px-16 py-20 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display font-bold text-white text-3xl lg:text-4xl leading-tight mb-6">
          Gestión del desempeño: dos perspectivas para una conversación de desarrollo
        </h2>
        <p className="font-body text-white/70 text-base leading-relaxed mb-4">
          Una conversación de desarrollo efectiva se construye entre dos miradas: la de quien
          evalúa y la de quien recibe la evaluación.
        </p>
        <p className="font-body text-white/70 text-base leading-relaxed mb-10">
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
