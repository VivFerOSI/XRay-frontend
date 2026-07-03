import { motion } from 'framer-motion'

export default function MisionVision() {
  return (
    <section className="relative pt-24 pb-8 px-8">
      {/* Left glow */}
      <div className="absolute -bottom-48 -left-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />
      {/* Center glow bridging into Valores */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-160 h-80 rounded-full bg-navy-mid/25 blur-3xl pointer-events-none" />
      {/* Right glow */}
      <div className="absolute -bottom-48 -right-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.p
          className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Propósito
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0">
          <motion.div
            className="lg:pr-16 lg:border-r lg:border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-px bg-gold mx-auto mb-6" />
            <h3 className="font-display font-bold text-white text-2xl text-center mb-6">
              MISIÓN
            </h3>
            <p className="font-body text-white/60 text-base leading-relaxed text-center">
              Co-crear entornos organizacionales conscientes donde la tecnología agiliza los procesos y el pensamiento profundo y el disfrute del camino eleva el liderazgo, permitiendo que las empresas transiten y trasciendan sus conflictos y alcancen su máximo potencial colectivo.
            </p>
          </motion.div>

          <motion.div
            className="lg:pl-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-px bg-gold mx-auto mb-6" />
            <h3 className="font-display font-bold text-white text-2xl text-center mb-6">
              VISIÓN
            </h3>
            <p className="font-body text-white/60 text-base leading-relaxed text-center">
              Disfrutar el ejercicio de una concepción de consultoría organizacional donde la eficiencia técnica y la profundidad filosófica convergen para contribuir con el diseño de empresas más humanas, ágiles, eficaces y profundamente conectadas con su entorno.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
