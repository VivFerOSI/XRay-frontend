import { useState } from 'react'
import { Mail, Phone, Send, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

const XTwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.622 5.906-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const inputClass = [
  'border-0 border-b-2 border-carbon/15 rounded-none bg-transparent shadow-none',
  'focus-visible:ring-0 focus-visible:border-gold',
  'font-body text-sm text-carbon placeholder:text-carbon/35',
  'h-12 px-0 transition-colors duration-200',
].join(' ')

const textareaClass = [
  'border-0 border-b-2 border-carbon/15 rounded-none bg-transparent shadow-none',
  'focus-visible:ring-0 focus-visible:border-gold',
  'font-body text-sm text-carbon placeholder:text-carbon/35',
  'px-0 pt-3 resize-none transition-colors duration-200',
].join(' ')

// Endpoint de Formspree. El ID va en VITE_FORMSPREE_ID (ver .env.example).
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID
const FORMSPREE_ENDPOINT = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : null

// Límites de longitud por campo (evita envíos abusivos).
const MAX = { nombre: 60, apellido: 60, email: 120, puesto: 80, consulta: 1500 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactSection() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', puesto: '', consulta: '', _gotcha: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Honeypot: si el campo trampa viene lleno, es un bot → simulamos éxito y cortamos.
    if (form._gotcha) {
      setSent(true)
      return
    }

    const data = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      email: form.email.trim(),
      puesto: form.puesto.trim(),
      consulta: form.consulta.trim(),
    }

    if (!data.nombre || !data.apellido || !data.email || !data.consulta) {
      setError('Completá los campos obligatorios.')
      return
    }
    if (!EMAIL_RE.test(data.email)) {
      setError('Ingresá un email válido.')
      return
    }

    if (!FORMSPREE_ENDPOINT) {
      setError('El formulario no está disponible por el momento. Escribinos por email o WhatsApp y te respondemos a la brevedad.')
      return
    }

    setSending(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSent(true)
      } else {
        const data = await res.json().catch(() => null)
        const detail = data?.errors?.map((x) => x.message).join(', ')
        setError(detail || 'No se pudo enviar el mensaje. Intentá de nuevo.')
      }
    } catch {
      setError('Error de conexión. Revisá tu internet e intentá de nuevo.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contacto" className="bg-navy-deep">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-0">

        {/* Left: info */}
        <motion.div
          className="p-12 lg:p-20 flex flex-col justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase mb-4">
            Contacto
          </p>
          <h2 className="font-display font-bold text-white text-4xl leading-snug mb-3">
            Hablemos de<br />tu desafío.
          </h2>
          <p className="font-body text-white/50 text-base mb-12">
            Contanos en qué etapa está tu organización y cómo podemos ayudarte.
          </p>

          <div className="flex flex-col gap-6">
            <a
              href="mailto:servicios@x-ray.ar"
              className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-200"
            >
              <span className="w-10 h-10 rounded-full border border-white/15 group-hover:border-gold flex items-center justify-center transition-colors duration-200 shrink-0">
                <Mail size={16} className="text-gold" />
              </span>
              <div>
                <p className="font-body text-[11px] text-white/40 tracking-widest uppercase mb-0.5">Email</p>
                <p className="font-body text-sm font-medium">servicios@x-ray.ar</p>
              </div>
            </a>

            <a
              href="https://wa.me/5491176764601"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-200"
            >
              <span className="w-10 h-10 rounded-full border border-white/15 group-hover:border-gold flex items-center justify-center transition-colors duration-200 shrink-0">
                <Phone size={16} className="text-gold" />
              </span>
              <div>
                <p className="font-body text-[11px] text-white/40 tracking-widest uppercase mb-0.5">WhatsApp</p>
                <p className="font-body text-sm font-medium">+54 11 7676 4601</p>
              </div>
            </a>
          </div>

          <div className="flex gap-3 mt-10">
            <a
              href="https://www.instagram.com/xraygenera/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/15 hover:border-gold flex items-center justify-center text-white/50 hover:text-gold transition-all duration-200"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://x.com/XRay_genera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="w-9 h-9 rounded-full border border-white/15 hover:border-gold flex items-center justify-center text-white/50 hover:text-gold transition-all duration-200"
            >
              <XTwitterIcon />
            </a>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          className="p-12 lg:p-20 border-l border-white/8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mb-6">
                <Send size={22} className="text-gold" />
              </div>
              <h3 className="font-display font-bold text-white text-2xl mb-3">¡Mensaje enviado!</h3>
              <p className="font-body text-white/50 text-sm">Nos pondremos en contacto a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Honeypot anti-bots — invisible para humanos, los bots lo completan */}
              <input
                type="text"
                name="_gotcha"
                value={form._gotcha}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="font-body text-[11px] text-white/40 tracking-widest uppercase">Nombre</label>
                  <Input
                    name="nombre"
                    maxLength={MAX.nombre}
                    placeholder="María"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className={inputClass + ' text-white placeholder:text-white/20 border-white/15 focus-visible:border-gold'}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-body text-[11px] text-white/40 tracking-widest uppercase">Apellido</label>
                  <Input
                    name="apellido"
                    maxLength={MAX.apellido}
                    placeholder="González"
                    value={form.apellido}
                    onChange={handleChange}
                    required
                    className={inputClass + ' text-white placeholder:text-white/20 border-white/15 focus-visible:border-gold'}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-body text-[11px] text-white/40 tracking-widest uppercase">Email</label>
                <Input
                  type="email"
                  name="email"
                  maxLength={MAX.email}
                  placeholder="maria@empresa.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass + ' text-white placeholder:text-white/20 border-white/15 focus-visible:border-gold'}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-body text-[11px] text-white/40 tracking-widest uppercase">Puesto actual</label>
                <Input
                  name="puesto"
                  maxLength={MAX.puesto}
                  placeholder="CEO / Fundador / Gerente…"
                  value={form.puesto}
                  onChange={handleChange}
                  className={inputClass + ' text-white placeholder:text-white/20 border-white/15 focus-visible:border-gold'}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-body text-[11px] text-white/40 tracking-widest uppercase">Tu consulta</label>
                <Textarea
                  name="consulta"
                  maxLength={MAX.consulta}
                  placeholder="Contanos brevemente tu situación o desafío…"
                  rows={4}
                  value={form.consulta}
                  onChange={handleChange}
                  required
                  className={textareaClass + ' text-white placeholder:text-white/20 border-white/15 focus-visible:border-gold'}
                />
              </div>

              {error && (
                <p className="font-body text-sm text-rose-300">{error}</p>
              )}

              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-gold text-white hover:bg-gold/90 active:bg-gold/80 border-0 rounded-full h-13 font-body font-semibold text-sm gap-2 tracking-wide mt-2 transition-all duration-200"
              >
                {sending ? 'Enviando…' : 'Enviar mensaje'}
                {!sending && <ArrowRight size={16} />}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
