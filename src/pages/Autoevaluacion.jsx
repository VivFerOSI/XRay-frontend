import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Loader2, MessageCircle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PilarRadar from '@/components/PilarRadar'
import { stressTestApi } from '@/lib/stressTestApi'

const WHATSAPP = 'https://wa.me/5491176764601'

// Color del "semáforo" según el puntaje del pilar (5–25).
function bandColor(score) {
  if (score >= 21) return { bar: 'bg-emerald-500', text: 'text-emerald-400' }
  if (score >= 16) return { bar: 'bg-lime-500', text: 'text-lime-400' }
  if (score >= 11) return { bar: 'bg-amber-500', text: 'text-amber-400' }
  return { bar: 'bg-rose-500', text: 'text-rose-400' }
}

const inputClass =
  'border-0 border-b-2 border-white/15 rounded-none bg-transparent shadow-none ' +
  'focus-visible:ring-0 focus-visible:border-gold text-white placeholder:text-white/25 ' +
  'font-body h-12 px-0 transition-colors duration-200'

export default function Autoevaluacion() {
  const [phase, setPhase] = useState('loading') // loading|error|intro|datos|quiz|contacto|result
  const [content, setContent] = useState(null)
  const [org, setOrg] = useState({ nombreEmprendimiento: '', sector: '', antiguedad: '', tamanoEquipo: '' })
  const [answers, setAnswers] = useState({}) // questionId -> 1..5
  const [pilarStep, setPilarStep] = useState(0)
  const [norte, setNorte] = useState('')
  const [contacto, setContacto] = useState({ nombreContacto: '', email: '', telefono: '' })
  const [consent, setConsent] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    stressTestApi
      .content()
      .then((data) => {
        setContent(data)
        setPhase('intro')
      })
      .catch((e) => {
        setError(e.message)
        setPhase('error')
      })
  }, [])

  const pilares = content?.pilares ?? []
  const currentPilar = pilares[pilarStep]

  const orgComplete = useMemo(
    () => Object.values(org).every((v) => v.trim() !== ''),
    [org],
  )
  const pilarComplete = currentPilar?.questions.every((q) => answers[q.id]) ?? false
  const contactoComplete =
    norte && contacto.nombreContacto.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto.email) && consent

  async function handleSubmit() {
    setError('')
    setBusy(true)
    try {
      const payload = {
        ...org,
        nombreContacto: contacto.nombreContacto.trim(),
        email: contacto.email.trim(),
        telefono: contacto.telefono.trim() || undefined,
        consent,
        norte,
        answers: Object.entries(answers).map(([id, value]) => ({
          questionId: Number(id),
          value,
        })),
      }
      const data = await stressTestApi.submit(payload)
      setResult(data.result)
      setPhase('result')
      window.scrollTo(0, 0)
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setOrg({ nombreEmprendimiento: '', sector: '', antiguedad: '', tamanoEquipo: '' })
    setAnswers({})
    setPilarStep(0)
    setNorte('')
    setContacto({ nombreContacto: '', email: '', telefono: '' })
    setConsent(false)
    setResult(null)
    setPhase('intro')
    window.scrollTo(0, 0)
  }

  return (
    <main className="relative bg-navy-deep min-h-screen overflow-hidden">
      <div className="absolute -top-24 -right-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-8 pt-36 pb-28">

        {phase === 'loading' && (
          <div className="flex items-center justify-center py-32 text-white/60 gap-3">
            <Loader2 className="animate-spin" size={22} /> Cargando…
          </div>
        )}

        {phase === 'error' && (
          <div className="text-center py-24">
            <p className="font-body text-rose-300 mb-6">{error}</p>
            <p className="font-body text-white/50 text-sm">
              El diagnóstico no está disponible en este momento. Volvé a intentar más tarde.
            </p>
          </div>
        )}

        {/* ── INTRO ── */}
        {phase === 'intro' && content && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase mb-4">
              Diagnóstico
            </p>
            <h1 className="font-display font-bold text-white text-3xl lg:text-4xl leading-tight mb-6">
              {content.title}
            </h1>
            <p className="font-body text-white/65 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              25 afirmaciones en 5 pilares. Respondé según cuánto coincidís con cada una (1 a 5). Al
              finalizar vas a recibir tu nivel de robustez y una devolución por pilar. Toma unos 10 minutos.
            </p>
            <Button
              onClick={() => setPhase('datos')}
              className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2"
            >
              Comenzar <ArrowRight size={16} />
            </Button>
          </motion.div>
        )}

        {/* ── DATOS DEL EMPRENDIMIENTO ── */}
        {phase === 'datos' && content && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-display font-bold text-white text-2xl mb-8">Sobre tu emprendimiento</h2>
            <div className="flex flex-col gap-6">
              {content.orgFields.map((f) => (
                <div key={f.key} className="flex flex-col gap-1">
                  <label className="font-body text-[11px] text-white/40 tracking-widest uppercase">{f.label}</label>
                  <Input
                    value={org[f.key]}
                    onChange={(e) => setOrg({ ...org, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    maxLength={120}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-10">
              <Button variant="ghost" onClick={() => setPhase('intro')} className="text-white/60 hover:text-gold hover:bg-transparent gap-2">
                <ArrowLeft size={16} /> Atrás
              </Button>
              <Button
                onClick={() => { setPilarStep(0); setPhase('quiz') }}
                disabled={!orgComplete}
                className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-7 h-11 font-body font-semibold text-sm gap-2 disabled:opacity-40"
              >
                Siguiente <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>
        )}

        {/* ── CUESTIONARIO (por pilar) ── */}
        {phase === 'quiz' && currentPilar && (
          <AnimatePresence mode="wait">
            <motion.div key={pilarStep} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase">
                  Pilar {pilarStep + 1} de {pilares.length}
                </p>
                <p className="font-body text-white/40 text-xs">{currentPilar.name}</p>
              </div>
              {/* Barra de progreso */}
              <div className="h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
                <div className="h-full bg-gold transition-all duration-500" style={{ width: `${((pilarStep + 1) / pilares.length) * 100}%` }} />
              </div>

              <h2 className="font-display font-bold text-white text-2xl mb-2">{currentPilar.name}</h2>
              <p className="font-body text-white/45 text-xs mb-8">
                1 = Totalmente en desacuerdo · 5 = Totalmente de acuerdo
              </p>

              <div className="flex flex-col gap-7">
                {currentPilar.questions.map((q) => (
                  <div key={q.id}>
                    <p className="font-body text-white/80 text-[15px] leading-relaxed mb-3">
                      <span className="text-gold font-semibold">{q.id}.</span> {q.text}
                    </p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setAnswers({ ...answers, [q.id]: v })}
                          className={`w-11 h-11 rounded-full border font-body text-sm transition-all duration-150 ${
                            answers[q.id] === v
                              ? 'bg-gold border-gold text-white font-semibold'
                              : 'border-white/20 text-white/60 hover:border-gold hover:text-gold'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-10">
                <Button
                  variant="ghost"
                  onClick={() => (pilarStep === 0 ? setPhase('datos') : setPilarStep(pilarStep - 1))}
                  className="text-white/60 hover:text-gold hover:bg-transparent gap-2"
                >
                  <ArrowLeft size={16} /> Atrás
                </Button>
                <Button
                  onClick={() => (pilarStep === pilares.length - 1 ? setPhase('contacto') : setPilarStep(pilarStep + 1))}
                  disabled={!pilarComplete}
                  className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-7 h-11 font-body font-semibold text-sm gap-2 disabled:opacity-40"
                >
                  {pilarStep === pilares.length - 1 ? 'Casi listo' : 'Siguiente'} <ArrowRight size={16} />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── NORTE + CONTACTO ── */}
        {phase === 'contacto' && content && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-display font-bold text-white text-2xl mb-6">{content.norte.question}</h2>
            <div className="flex flex-col gap-3 mb-10">
              {content.norte.options.map((o) => (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => setNorte(o.key)}
                  className={`text-left rounded-xl border px-5 py-4 font-body text-sm leading-relaxed transition-all duration-150 ${
                    norte === o.key ? 'border-gold bg-gold/10 text-white' : 'border-white/15 text-white/65 hover:border-gold/50'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <h3 className="font-display font-bold text-white text-xl mb-6">¿A dónde te enviamos la devolución?</h3>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <label className="font-body text-[11px] text-white/40 tracking-widest uppercase">Nombre y apellido</label>
                <Input value={contacto.nombreContacto} onChange={(e) => setContacto({ ...contacto, nombreContacto: e.target.value })} placeholder="María González" maxLength={80} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-body text-[11px] text-white/40 tracking-widest uppercase">Email</label>
                <Input type="email" value={contacto.email} onChange={(e) => setContacto({ ...contacto, email: e.target.value })} placeholder="maria@empresa.com" maxLength={120} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-body text-[11px] text-white/40 tracking-widest uppercase">Teléfono (opcional)</label>
                <Input value={contacto.telefono} onChange={(e) => setContacto({ ...contacto, telefono: e.target.value })} placeholder="+54 11 5555 5555" maxLength={40} className={inputClass} />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-gold w-4 h-4" />
                <span className="font-body text-white/55 text-sm leading-relaxed">
                  Acepto que X-Ray use mis datos de contacto para enviarme la devolución y comunicarse conmigo.
                </span>
              </label>
            </div>

            {error && <p className="font-body text-rose-300 text-sm mt-6">{error}</p>}

            <div className="flex justify-between mt-10">
              <Button variant="ghost" onClick={() => setPhase('quiz')} className="text-white/60 hover:text-gold hover:bg-transparent gap-2">
                <ArrowLeft size={16} /> Atrás
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!contactoComplete || busy}
                className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2 disabled:opacity-40"
              >
                {busy ? <><Loader2 className="animate-spin" size={16} /> Calculando…</> : <>Ver mi resultado <ArrowRight size={16} /></>}
              </Button>
            </div>
          </motion.div>
        )}

        {/* ── RESULTADO ── */}
        {phase === 'result' && result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase mb-4">Tu diagnóstico</p>

            {/* Foto global */}
            <div className="rounded-2xl border border-gold/30 bg-white/3 p-8 mb-10">
              <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                <h1 className="font-display font-bold text-white text-2xl lg:text-3xl">{result.global.title}</h1>
                <span className="font-display font-bold text-gold text-2xl">{result.total}<span className="text-white/40 text-lg font-body"> / {result.maxTotal}</span></span>
              </div>
              <p className="font-body font-semibold text-gold text-sm mb-3">{result.global.perfil}</p>
              <p className="font-body text-white/70 text-sm leading-relaxed">{result.global.text}</p>
            </div>

            {/* Semáforo de pilares */}
            <h2 className="font-display font-bold text-white text-xl mb-5">Semáforo de pilares</h2>
            <div className="mb-8">
              <PilarRadar pilares={result.pilares} />
            </div>
            <div className="flex flex-col gap-4 mb-12">
              {result.pilares.map((p) => {
                const c = bandColor(p.score)
                return (
                  <div key={p.key}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="font-body text-white/80 text-sm">{p.name}</span>
                      <span className={`font-body text-sm font-semibold ${c.text}`}>{p.score}/25 · {p.bandTitle}</span>
                    </div>
                    <div className="h-2.5 bg-white/8 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${c.bar} transition-all duration-700`} style={{ width: `${(p.score / 25) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Detalle por pilar */}
            <h2 className="font-display font-bold text-white text-xl mb-5">Lectura por pilar</h2>
            <div className="flex flex-col gap-5 mb-12">
              {result.pilares.map((p) => (
                <div key={p.key} className="rounded-xl border border-white/10 bg-white/3 p-6">
                  <p className="font-body font-semibold text-white text-sm mb-2">{p.name} — <span className={bandColor(p.score).text}>{p.bandTitle}</span></p>
                  <p className="font-body text-white/65 text-sm leading-relaxed">{p.bandText}</p>
                </div>
              ))}
            </div>

            {/* Llamada a la acción */}
            <div className="rounded-2xl border-l-4 border-gold bg-navy-mid/15 px-6 py-6 mb-10">
              <p className="font-body text-white/80 text-sm leading-relaxed mb-3">{result.global.closing}</p>
              <p className="font-body text-white/80 text-sm leading-relaxed">{result.norteClosing}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2"
              >
                <a
                  href={`${WHATSAPP}?text=${encodeURIComponent(
                    `Hola, hice el Stress Test y mi resultado fue "${result.global.title}". Quiero conversar los próximos pasos.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar una conversación <MessageCircle size={16} />
                </a>
              </Button>
              <Button variant="ghost" onClick={reset} className="text-white/60 hover:text-gold hover:bg-transparent gap-2">
                <RotateCcw size={15} /> Hacerlo de nuevo
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
