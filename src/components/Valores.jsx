import { motion } from 'framer-motion'

import iconSimplicidad from '../assets/valor-nodo.png'
import iconInnovacion from '../assets/valor-destello.png'
import iconResponsabilidad from '../assets/valor-red-h.jpg'
import iconProairesis from '../assets/valor-brujula.jpg'

const valores = [
  {
    title: 'SIMPLICIDAD',
    microcopy: 'Soluciones claras y útiles',
    desc: 'Definimos e implementamos servicios y productos útiles, sin artificios ni complejidad innecesaria. Evitamos añadir elementos que no ayudan a comprender o resolver un problema.',
    icon: iconSimplicidad,
  },
  {
    title: 'INNOVACIÓN',
    microcopy: 'Innovación con propósito',
    desc: 'Diseñamos soluciones creativas y distintivas, desarrollamos tecnologías propias y adaptamos respuestas a las necesidades de cada cliente. Buscamos innovación con sentido práctico y pertinencia.',
    icon: iconInnovacion,
  },
  {
    title: 'RESPONSABILIDAD SOCIAL',
    microcopy: 'Impacto social responsable',
    desc: 'Reconocemos que nuestras intervenciones deben contribuir activamente al mejoramiento social. Trabajamos con conciencia del impacto colectivo y la sostenibilidad.',
    icon: iconResponsabilidad,
  },
  {
    title: 'PROAIRESIS',
    microcopy: 'Elección profesional intencional',
    desc: 'Elección intencional con propósito. Decidimos desde la convicción profesional: hacemos lo que elegimos porque aporta de forma coherente y valiosa al propósito de todos los involucrados, más allá de las tendencias del mercado.',
    icon: iconProairesis,
  },
]

export default function Valores() {
  return (
    <section className="relative pt-20 pb-24 px-8">
      {/* Right glow */}
      <div className="absolute -top-32 -right-32 w-120 h-120 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2
          className="font-display font-bold text-white text-4xl text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Nuestros Valores
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
          {valores.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="group relative h-full flex flex-col overflow-hidden border border-white/8 bg-white/3 hover:bg-white/6 hover:border-gold/30 transition-all duration-500 rounded-lg">
                {/* Banner superior con el ícono */}
                {v.icon && (
                  <div className="relative h-24 sm:h-28 lg:h-32 w-full overflow-hidden bg-navy-mid/20">
                    <img
                      src={v.icon}
                      alt={v.title}
                      className="w-full h-full object-cover object-center opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Tinte navy para uniformar las 4 imágenes */}
                    <div className="absolute inset-0 bg-navy-deep/20" />
                    {/* Fundido inferior hacia el cuerpo de la card */}
                    <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/25 to-transparent" />
                    {/* Línea dorada sutil al pie del banner */}
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gold/20" />
                  </div>
                )}

                <div className="p-8">
                  <div className="w-8 h-px bg-gold mb-6" />
                  <p className="font-body font-bold text-gold tracking-[0.15em] text-base uppercase mb-2">
                    {v.title}
                  </p>
                  <p className="font-body text-white/80 text-sm mb-4">
                    {v.microcopy}
                  </p>
                  <p className="font-body text-white/60 text-base leading-relaxed">
                    {v.desc}
                  </p>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm"
                  style={{ boxShadow: 'inset 0 0 40px 0 rgba(184,145,68,0.04)' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
