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
          className="font-body font-bold text-gold tracking-[0.15em] text-base uppercase text-center mb-16"
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
              Co-creamos organizaciones conscientes donde la tecnología agiliza procesos, el pensamiento crítico guía las decisiones y el disfrute del camino eleva el liderazgo; acompañamos a las empresas a trascender conflictos y alcanzar su máximo potencial colectivo.
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
              Generar consultoría que conjuga eficiencia técnica, pensamiento crítico aplicado y cuidado de las personas, acompañando a las organizaciones hacia mayor agilidad, eficacia y propósito compartido.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
