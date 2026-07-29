import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ServiceCard({ title, description, imageLeft = true, image, icon: Icon, onVerMas, index = 0 }) {
  // imageLeft=true  → panel de texto a la izquierda, foto a la derecha
  // imageLeft=false → foto a la izquierda, panel de texto a la derecha
  const panelLeft = imageLeft

  return (
    <motion.div
      className="relative flex flex-col lg:flex-row bg-navy-deep overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* ── Imagen (mitad) ── */}
      <div
        className={`relative h-72 sm:h-96 lg:h-180 lg:w-1/2 overflow-hidden ${
          panelLeft ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-navy-mid/20 flex items-center justify-center">
            {Icon && <Icon size={80} className="text-white/10" />}
          </div>
        )}

        {/* Tinte navy sutil para cohesión de marca (no tapa la foto) */}
        <div className="absolute inset-0 bg-navy-deep/10 pointer-events-none" />

        {/* Fundido hacia el panel de texto — abajo en mobile */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-navy-deep to-transparent pointer-events-none lg:hidden" />

        {/* Fundido hacia el panel de texto — al costado en desktop */}
        <div
          className={`absolute inset-0 hidden lg:block pointer-events-none bg-linear-to-r ${
            panelLeft
              ? 'from-navy-deep via-navy-deep/10 to-transparent'
              : 'from-transparent via-navy-deep/10 to-navy-deep'
          }`}
        />
      </div>

      {/* ── Panel de texto (mitad) ── */}
      <div
        className={`relative z-10 lg:w-1/2 flex items-center ${
          panelLeft ? 'lg:order-1 lg:justify-end' : 'lg:order-2 lg:justify-start'
        }`}
      >
        <div className="max-w-lg px-8 py-12 lg:px-14 lg:py-16">
          <div className="w-8 h-px bg-gold mb-6" />

          <h2 className="font-display font-bold text-white text-2xl lg:text-[1.75rem] leading-snug mb-4">
            {title}
          </h2>
          <p className="font-body text-white/70 text-[15px] leading-relaxed mb-8 max-w-md">
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-white/10 text-white border border-white/30 hover:bg-gold hover:border-gold rounded-full h-10 px-6 font-body font-medium text-sm gap-2 backdrop-blur-sm transition-all duration-300"
            >
              <Link to="/#contacto">
                Contactanos
                <ArrowRight size={14} />
              </Link>
            </Button>

            {onVerMas && (
              <Button
                variant="ghost"
                onClick={onVerMas}
                className="text-white/60 hover:text-gold hover:bg-transparent h-10 px-3 font-body text-sm gap-1"
              >
                Ver información →
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
