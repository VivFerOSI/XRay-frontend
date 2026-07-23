import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Loader2, Mail, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { assessmentApi } from '@/lib/assessmentApi'

// Colores de las bandas de alineación devueltas por el backend.
const BAND_STYLES = {
  green: { bar: 'bg-emerald-500', text: 'text-emerald-400', label: 'Alineado' },
  amber: { bar: 'bg-amber-500', text: 'text-amber-400', label: 'Alineación media' },
  red: { bar: 'bg-rose-500', text: 'text-rose-400', label: 'Baja alineación' },
}

const EMPTY_FORM = {
  fullName: '',
  email: '',
  declaredRoleId: '',
  wantsEmailResults: false,
}

export default function Autoevaluacion() {
  const [phase, setPhase] = useState('loading') // loading|intro|form|quiz|result|error
  const [boot, setBoot] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [assessmentId, setAssessmentId] = useState(null)
  const [answers, setAnswers] = useState({}) // questionId -> optionId
  const [step, setStep] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    assessmentApi
      .bootstrap()
      .then((data) => {
        setBoot(data)
        setPhase('intro')
      })
      .catch((e) => {
        setError(e.message)
        setPhase('error')
      })
  }, [])

  // Preguntas aplanadas, conservando el nombre de la categoría.
  const questions = useMemo(() => {
    if (!boot) return []
    return boot.categories.flatMap((c) =>
      c.questions.map((q) => ({ ...q, categoryName: c.name })),
    )
  }, [boot])

  const total = questions.length
  const currentQuestion = questions[step]
  const answeredCount = Object.keys(answers).length

  function validateForm() {
    const errs = {}
    const name = form.fullName.trim()
    const email = form.email.trim()
    // Nombre: al menos 2 caracteres y que contenga alguna letra.
    if (name.length < 2 || !/\p{L}/u.test(name)) {
      errs.fullName = 'Ingresá tu nombre y apellido.'
    }
    // Correo: formato válido.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Ingresá un correo válido (ej. nombre@empresa.com).'
    }
    if (!form.declaredRoleId) {
      errs.declaredRoleId = 'Seleccioná tu rol.'
    }
    return errs
  }

  // Limpia el error de un campo apenas el usuario lo corrige.
  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    const errs = validateForm()
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      return
    }
    setFieldErrors({})
    setBusy(true)
    try {
      const { assessmentId: id } = await assessmentApi.register({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        declaredRoleId: Number(form.declaredRoleId),
        wantsEmailResults: form.wantsEmailResults,
      })
      setAssessmentId(id)
      setStep(0)
      setPhase('quiz')
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  function selectOption(questionId, optionId) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  async function handleSubmit() {
    setBusy(true)
    setError('')
    try {
      const payload = Object.entries(answers).map(([questionId, optionId]) => ({
        questionId: Number(questionId),
        optionId: Number(optionId),
      }))
      const res = await assessmentApi.submit(assessmentId, payload)
      setResult(res)
      setPhase('result')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  function restart() {
    setForm(EMPTY_FORM)
    setAnswers({})
    setAssessmentId(null)
    setResult(null)
    setStep(0)
    setError('')
    setFieldErrors({})
    setPhase('intro')
  }

  return (
    <main className="min-h-screen bg-navy-deep pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase mb-12 text-center pb-4">
          Autoevaluación de Competencias
        </p>

        {phase === 'loading' && (
          <Centered>
            <Loader2 className="animate-spin text-gold " size={32} />
          </Centered>
        )}

        {phase === 'error' && (
          <Panel>
            <p className="text-rose-300 font-body text-center">{error}</p>
            <div className="flex justify-center mt-6">
              <GoldButton onClick={() => window.location.reload()}>
                Reintentar
              </GoldButton>
            </div>
          </Panel>
        )}

        {phase === 'intro' && boot && (
          <Panel>
            <h1 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight mb-8 text-center">
              Descubrí qué tan alineado estás con tu rol
            </h1>
            <p className="font-body text-white/80 text-lg leading-loose mb-12 text-center max-w-xl mx-auto">
              {boot.intro}
            </p>
            <div className="flex justify-center">
              <GoldButton onClick={() => setPhase('form')}>
                Comenzar <ArrowRight size={16} />
              </GoldButton>
            </div>
          </Panel>
        )}

        {phase === 'form' && boot && (
          <Panel>
            <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-2">
              Tus datos
            </h2>
            <p className="font-body text-white/60 text-sm mb-8">
              Con esto personalizamos tu evaluación y el envío de resultados.
            </p>
            <form onSubmit={handleRegister} className="flex flex-col gap-7" noValidate>
              <Field label="Nombre y apellido" error={fieldErrors.fullName}>
                <Input
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  aria-invalid={!!fieldErrors.fullName}
                  className="h-11 text-white bg-white/5 border-white/20 placeholder:text-white/40"
                  placeholder="Tu nombre"
                />
              </Field>
              <Field label="Correo electrónico" error={fieldErrors.email}>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  aria-invalid={!!fieldErrors.email}
                  className="h-11 text-white bg-white/5 border-white/20 placeholder:text-white/40"
                  placeholder="tu@correo.com"
                />
              </Field>
              <Field label="Tu rol" error={fieldErrors.declaredRoleId}>
                <select
                  value={form.declaredRoleId}
                  onChange={(e) => updateField('declaredRoleId', e.target.value)}
                  aria-invalid={!!fieldErrors.declaredRoleId}
                  className="h-11 w-full cursor-pointer rounded-lg border border-white/20 bg-white/5 px-3 text-white outline-none focus-visible:border-gold aria-invalid:border-rose-400"
                >
                  <option value="" className="text-carbon">
                    Seleccioná tu rol
                  </option>
                  {boot.roles.map((r) => (
                    <option key={r.id} value={r.id} className="text-carbon">
                      {r.name}
                    </option>
                  ))}
                </select>
              </Field>
              <label className="flex items-center gap-3 font-body text-white/80 text-sm cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={form.wantsEmailResults}
                  onChange={(e) => updateField('wantsEmailResults', e.target.checked)}
                  className="size-4 accent-gold"
                />
                Quiero recibir mis resultados por correo
              </label>

              {error && (
                <p className="text-rose-300 font-body text-sm">{error}</p>
              )}

              <div className="flex justify-between items-center mt-3">
                <TextButton onClick={() => setPhase('intro')} type="button">
                  <ArrowLeft size={16} /> Volver
                </TextButton>
                <GoldButton type="submit" disabled={busy}>
                  {busy ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      Empezar cuestionario <ArrowRight size={16} />
                    </>
                  )}
                </GoldButton>
              </div>
            </form>
          </Panel>
        )}

        {phase === 'quiz' && currentQuestion && (
          <div>
            <ProgressBar current={step + 1} total={total} />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                <Panel>
                  <p className="font-body text-gold text-xs uppercase tracking-widest mb-4">
                    {currentQuestion.categoryName}
                  </p>
                  <h2 className="font-display font-bold text-white text-xl md:text-2xl mb-8 leading-relaxed">
                    {currentQuestion.situation}
                  </h2>
                  <div className="flex flex-col gap-3.5">
                    {currentQuestion.options.map((o) => {
                      const selected = answers[currentQuestion.id] === o.id
                      return (
                        <button
                          key={o.id}
                          onClick={() => selectOption(currentQuestion.id, o.id)}
                          className={`text-left font-body leading-relaxed rounded-xl border px-5 py-4 cursor-pointer transition-all ${
                            selected
                              ? 'border-gold bg-gold/15 text-white'
                              : 'border-white/15 bg-white/5 text-white/80 hover:border-white/40'
                          }`}
                        >
                          {o.text}
                        </button>
                      )
                    })}
                  </div>
                </Panel>
              </motion.div>
            </AnimatePresence>

            {error && (
              <p className="text-rose-300 font-body text-sm mt-4 text-center">
                {error}
              </p>
            )}

            <div className="flex justify-between items-center mt-6">
              <TextButton
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ArrowLeft size={16} /> Anterior
              </TextButton>

              {step < total - 1 ? (
                <GoldButton
                  onClick={() => setStep((s) => s + 1)}
                  disabled={answers[currentQuestion.id] === undefined}
                >
                  Siguiente <ArrowRight size={16} />
                </GoldButton>
              ) : (
                <GoldButton
                  onClick={handleSubmit}
                  disabled={busy || answeredCount < total}
                >
                  {busy ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    'Ver mis resultados'
                  )}
                </GoldButton>
              )}
            </div>
          </div>
        )}

        {phase === 'result' && result && (
          <ResultView result={result} onRestart={restart} />
        )}
      </div>
    </main>
  )
}

function ResultView({ result, onRestart }) {
  const band = BAND_STYLES[result.band] ?? BAND_STYLES.amber
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Panel>
        <h1 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight mb-5 text-center">
          Tus resultados
        </h1>
        <p className="font-body text-white/70 text-center mb-14">
          Rol declarado: <strong className="text-white">{result.role.name}</strong>
        </p>

        <div className="text-center mb-14">
          <div className={`font-display font-bold text-6xl md:text-7xl leading-none ${band.text}`}>
            {Math.round(result.alignmentPct)}%
          </div>
          <p className="font-body text-white/70 mt-6 pt-4">Alineación general</p>
          <p className={`font-body font-semibold mt-3 ${band.text}`}>
            {band.label}
          </p>
        </div>

        <p className="font-body text-white/80 text-center bg-white/5 rounded-xl px-5 py-4 leading-relaxed mb-14">
          {result.deviationLabel}
        </p>

        <h3 className="font-body text-gold text-xs uppercase tracking-widest mb-7 pb-2 pt-4">
          Por categoría
        </h3>
        <div className="flex flex-col gap-7">
          {result.categories.map((c) => {
            const cb = BAND_STYLES[c.band] ?? BAND_STYLES.amber
            return (
              <div key={c.id}>
                <div className="flex justify-between font-body text-sm text-white/80 mb-2">
                  <span>{c.name}</span>
                  <span>{Math.round(c.alignmentPct)}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${cb.bar}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.alignmentPct}%` }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {result.participant.wantsEmailResults && (
          <p className="flex items-center justify-center gap-2 font-body text-white/60 text-sm mt-8">
            <Mail size={15} /> Te enviamos una copia a {result.participant.email}
          </p>
        )}

        <div className="flex justify-center mt-8">
          <TextButton onClick={onRestart}>
            <RotateCcw size={15} /> Realizar de nuevo
          </TextButton>
        </div>
      </Panel>
    </motion.div>
  )
}

/* --- Pequeños componentes de presentación --- */

function Panel({ children }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-11 backdrop-blur-sm">
      {children}
    </div>
  )
}

function Centered({ children }) {
  return <div className="flex justify-center py-20">{children}</div>
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="font-body text-white/70 text-sm">{label}</span>
      {children}
      {error && (
        <span className="font-body text-rose-300 text-xs">{error}</span>
      )}
    </label>
  )
}

function GoldButton({ children, className = '', ...props }) {
  return (
    <Button
      className={`bg-gold text-navy-deep hover:bg-gold/85 border-0 rounded-full px-7 py-3 h-auto font-body font-medium text-base gap-2 ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}

function TextButton({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 font-body text-white/70 hover:text-white text-sm cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

function ProgressBar({ current, total }) {
  const pct = (current / total) * 100
  return (
    <div className="mb-8">
      <div className="flex justify-between font-body text-white/60 text-xs mb-3">
        <span>
          Pregunta {current} de {total}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gold"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}
