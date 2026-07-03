import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ServiceCard({ title, description, imageLeft = true, image, icon: Icon, onVerMas, index = 0 }) {
  // Panel side: imageLeft=true → panel on left, photo visible right
  //             imageLeft=false → panel on right, photo visible left
  const panelLeft = imageLeft

  return (
    <motion.div
      className="relative overflow-hidden h-130 lg:h-120 flex"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* Full-bleed background image */}
      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[8s] ease-out"
          style={{ animationPlayState: 'running' }}
        />
      ) : (
        <div className="absolute inset-0 bg-navy-deep">
          {Icon && (
            <div className="flex items-center justify-center w-full h-full">
              <Icon size={80} className="text-white/10" />
            </div>
          )}
        </div>
      )}

      {/* Global dark veil */}
      <div className="absolute inset-0 bg-navy-deep/35" />

      {/* Directional gradient: text panel side */}
      <div
        className={`absolute inset-0 ${
          panelLeft
            ? 'bg-linear-to-r from-navy-deep/95 via-navy-deep/60 to-transparent'
            : 'bg-linear-to-l from-navy-deep/95 via-navy-deep/60 to-transparent'
        }`}
      />

      {/* Top fade — dissolves into whatever's above */}
      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-navy-deep to-transparent pointer-events-none z-20" />

      {/* Bottom fade — dissolves into whatever's below */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-navy-deep to-transparent pointer-events-none z-20" />

      {/* Text panel — sits within the gradient, no hard box */}
      <div
        className={`relative z-10 flex items-center w-full ${
          panelLeft ? 'justify-start' : 'justify-end'
        }`}
      >
        <div className={`max-w-lg px-10 py-12 lg:px-16 ${panelLeft ? '' : 'text-left'}`}>
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
