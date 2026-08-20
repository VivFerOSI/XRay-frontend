import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ServiceCard({
  title,
  description,
  imageLeft = true,
  image,
  icon: Icon,
  onVerMas,
  moreHref,
  moreLabel = 'Ver información →',
  comingSoon,
  split = false,
  autoHeight = false,
  index = 0,
}) {
  // panelLeft=true  → panel de texto a la izquierda, foto a la derecha
  const panelLeft = imageLeft

  const anim = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.8, delay: index * 0.05 },
    viewport: { once: true, margin: '-60px' },
  }

  // Contenido del panel de texto (compartido por ambos diseños)
  const panel = (
    <div className="max-w-lg px-8 py-12 lg:px-14 lg:py-16">
      <div className="w-8 h-px bg-gold mb-6" />
      <h2 className="font-display font-bold text-white text-2xl lg:text-[1.75rem] leading-snug mb-4">
        {title}
      </h2>
      {Array.isArray(description) ? (
        <div className="flex flex-col gap-1 mb-8 max-w-md">
          {description.map((para, i) => (
            <p key={i} className="font-body text-white/70 text-[15px] leading-relaxed">{para}</p>
          ))}
        </div>
      ) : (
        <p className="font-body text-white/70 text-[15px] leading-relaxed mb-8 max-w-md">{description}</p>
      )}
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

        {moreHref ? (
          <Button
            asChild
            variant="ghost"
            className="text-white/60 hover:text-gold hover:bg-transparent h-10 px-3 font-body text-sm gap-1"
          >
            <Link to={moreHref}>{moreLabel}</Link>
          </Button>
        ) : (
          onVerMas && (
            <Button
              variant="ghost"
              onClick={onVerMas}
              className="text-white/60 hover:text-gold hover:bg-transparent h-10 px-3 font-body text-sm gap-1"
            >
              Ver información →
            </Button>
          )
        )}

        {comingSoon && (
          <span className="inline-flex items-center rounded-full border border-white/15 text-white/45 h-10 px-5 font-body text-sm">
            {comingSoon}
          </span>
        )}
      </div>
    </div>
  )

  // ── Diseño PARTIDO (foto contenida en una mitad) ──
  if (split) {
    return (
      <motion.div className="relative flex flex-col lg:flex-row bg-navy-deep overflow-hidden" {...anim}>
        <div
          className={`relative h-72 sm:h-96 lg:w-1/2 overflow-hidden ${
            autoHeight ? 'lg:h-auto lg:self-stretch' : 'lg:h-160'
          } ${panelLeft ? 'lg:order-2' : 'lg:order-1'}`}
        >
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-navy-mid/20 flex items-center justify-center">
              {Icon && <Icon size={80} className="text-white/10" />}
            </div>
          )}
          <div className="absolute inset-0 bg-navy-deep/10 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-navy-deep to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-navy-deep to-transparent pointer-events-none z-10" />
          <div
            className={`absolute inset-0 hidden lg:block pointer-events-none bg-linear-to-r ${
              panelLeft
                ? 'from-navy-deep via-navy-deep/10 to-transparent'
                : 'from-transparent via-navy-deep/10 to-navy-deep'
            }`}
          />
        </div>

        <div
          className={`relative z-10 lg:w-1/2 flex items-center ${
            panelLeft ? 'lg:order-1 lg:justify-end' : 'lg:order-2 lg:justify-start'
          }`}
        >
          {panel}
        </div>
      </motion.div>
    )
  }

  // ── Diseño OVERLAY (foto a pantalla completa con texto encima) ──
  return (
    <motion.div className="relative overflow-hidden h-130 lg:h-160 flex" {...anim}>
      {image ? (
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-navy-deep">
          {Icon && (
            <div className="flex items-center justify-center w-full h-full">
              <Icon size={80} className="text-white/10" />
            </div>
          )}
        </div>
      )}

      {/* Velo global sutil */}
      <div className="absolute inset-0 bg-navy-deep/25" />

      {/* Degradado direccional del lado del texto */}
      <div
        className={`absolute inset-0 ${
          panelLeft
            ? 'bg-linear-to-r from-navy-deep/95 via-navy-deep/55 to-transparent'
            : 'bg-linear-to-l from-navy-deep/95 via-navy-deep/55 to-transparent'
        }`}
      />

      {/* Fundidos arriba/abajo — continuidad entre secciones */}
      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-navy-deep to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-navy-deep to-transparent pointer-events-none z-20" />

      {/* Panel de texto sobre el degradado */}
      <div
        className={`relative z-10 flex items-center w-full ${
          panelLeft ? 'justify-start' : 'justify-end'
        }`}
      >
        {panel}
      </div>
    </motion.div>
  )
}
