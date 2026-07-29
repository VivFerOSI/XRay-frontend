import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function JobDescription() {
  return (
    <section id="job-description" className="relative py-28 px-8">
      {/* Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-navy-mid/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase mb-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Job Description
        </motion.p>

        <motion.h2
          className="font-display font-bold text-white text-3xl lg:text-4xl leading-tight mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Tecnología que facilita; pensamiento que orienta; personas primero.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            className="bg-navy-mid text-white hover:bg-gold border-0 rounded-full px-8 py-3 h-auto font-body font-medium text-base gap-2 mt-4"
          >
            <Link to="/job-description">
              Conocer Job Description
              <ArrowRight size={16} />
            </Link>
          </Button>

          {/*
            FASE 2 — Botón de acceso a la Autoevaluación de Competencias.
            Oculto por ahora. Para reactivarlo:
              1. Reponer imports:  import { Link } from 'react-router-dom'
                 y  ClipboardCheck  en el import de 'lucide-react'.
              2. Envolver este botón y el de arriba en un contenedor flex
                 (flex flex-col sm:flex-row items-center justify-center gap-4).

            <Button
              asChild
              variant="outline"
              className="rounded-full border-gold bg-transparent text-white hover:bg-gold hover:text-navy-deep hover:border-gold px-8 py-3 h-auto font-body font-medium text-base gap-2"
            >
              <Link to="/autoevaluacion">
                Autoevaluación de competencias
                <ClipboardCheck size={16} />
              </Link>
            </Button>
          */}
        </motion.div>
      </div>
    </section>
  )
}
