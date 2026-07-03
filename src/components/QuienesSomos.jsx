import { motion } from 'framer-motion'

const XRaySymbol = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-36 h-36 lg:w-52 lg:h-52 opacity-80">
    <circle cx="60" cy="60" r="56" stroke="#C8922A" strokeWidth="1.5" />
    <line x1="15" y1="15" x2="105" y2="105" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <line x1="105" y1="15" x2="15" y2="105" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <circle cx="60" cy="60" r="7" fill="#C8922A" />
  </svg>
)

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="relative py-28 px-8">
      {/* Subtle top gradient — continues from hero fade */}
      <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/30 to-transparent pointer-events-none" />

      {/* Top-right glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />
      {/* Bottom left glow bridging into MisionVision */}
      <div className="absolute -bottom-48 -left-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />
      {/* Bottom center glow bridging into MisionVision */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-160 h-80 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />
      {/* Bottom right glow bridging into MisionVision */}
      <div className="absolute -bottom-48 -right-40 w-120 h-120 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 items-center">
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase mb-5">
            Quiénes somos
          </p>
          <h2 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-7">
            Eficiencia técnica con profundidad filosófica
          </h2>
          <p className="font-body text-white/65 text-lg leading-relaxed max-w-xl">
            X-Ray es una consultora organizacional que combina eficiencia técnica con profundidad filosófica. Acompañamos a líderes, fundadores y equipos en los momentos que más importan: cuando el crecimiento exige un salto de consciencia.
          </p>
        </motion.div>

        <motion.div
          className="lg:col-span-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <XRaySymbol />
        </motion.div>
      </div>
    </section>
  )
}
