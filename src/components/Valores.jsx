import { motion } from 'framer-motion'

const valores = [
  {
    title: 'SIMPLICIDAD',
    desc: 'Definimos e implementamos servicios y productos útiles y sin artificios ni complicaciones. Evitamos complejizar si eso no contribuye a la comprensión de un fenómeno.',
  },
  {
    title: 'INNOVACIÓN',
    desc: 'Diseñamos soluciones creativas y distintivas, y desarrollamos tecnologías propias, para ajustarnos a las demandas de nuestros clientes. Aseguramos la individualización de las respuestas a cada problema.',
  },
  {
    title: 'RESPONSABILIDAD SOCIAL',
    desc: 'Consciencia de que todas nuestras intervenciones deben significar una contribución activa al mejoramiento social.',
  },
  {
    title: 'PROAIRESIS',
    desc: 'Elección con un propósito. X-Ray hace lo que quiere hacer, no hace lo que puede en un mercado complicado. Estamos exactamente dónde queremos estar.',
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
              <div className="group relative h-full p-8 border border-white/8 bg-white/3 hover:bg-white/6 hover:border-gold/30 transition-all duration-500 rounded-lg">
                <div className="w-8 h-px bg-gold mb-6" />
                <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase mb-4">
                  {v.title}
                </p>
                <p className="font-body text-white/60 text-base leading-relaxed">
                  {v.desc}
                </p>
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
