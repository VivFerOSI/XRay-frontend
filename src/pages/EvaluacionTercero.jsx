import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { stressTestApi } from '@/lib/stressTestApi'

/**
 * Cuestionario que responde una persona invitada a evaluar a otra.
 *
 * Entra por el enlace único que le llegó por correo: el token de la URL
 * identifica y autoriza, no hay login. Reusa el recorrido por pilares del
 * cuestionario propio para que la experiencia sea la misma.
 */
export default function EvaluacionTercero() {
  const { token } = useParams()
  const [fase, setFase] = useState('cargando') // cargando|error|intro|quiz|listo
  const [data, setData] = useState(null)
  const [answers, setAnswers] = useState({})
  const [pilarStep, setPilarStep] = useState(0)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    stressTestApi
      .evaluacion(token)
      .then((d) => {
        setData(d)
        if (d.estado === 'respondido') setFase('listo')
        else if (d.vencida) setFase('vencida')
        else setFase('intro')
      })
      .catch((e) => {
        setError(e.message)
        setFase('error')
      })
  }, [token])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [fase, pilarStep])

  const pilares = data?.pilares ?? []
  const actual = pilares[pilarStep]
  const completo = actual?.questions.every((q) => answers[q.id]) ?? false
  const respondidas = useMemo(() => Object.keys(answers).length, [answers])
  const totalPreguntas = pilares.reduce((n, p) => n + p.questions.length, 0)

  async function enviar() {
    setEnviando(true)
    setError('')
    try {
      await stressTestApi.responderEvaluacion(
        token,
        Object.entries(answers).map(([id, value]) => ({
          questionId: Number(id),
          value,
        })),
      )
      setFase('listo')
    } catch (e) {
      setError(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="relative bg-navy-deep min-h-screen overflow-hidden">
      <div className="absolute -top-24 -right-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-8 pt-24 pb-28">

        {fase === 'cargando' && (
          <p className="flex items-center gap-2 font-body text-white/60 text-sm">
            <Loader2 className="animate-spin" size={18} /> Cargando…
          </p>
        )}

        {fase === 'error' && (
          <div>
            <h1 className="font-display font-bold text-white text-2xl mb-3">
              No pudimos abrir la evaluación
            </h1>
            <p className="font-body text-white/60 text-sm">{error}</p>
          </div>
        )}

        {fase === 'vencida' && (
          <div>
            <h1 className="font-display font-bold text-white text-2xl mb-3">
              El plazo para responder venció
            </h1>
            <p className="font-body text-white/60 text-sm">
              Si querés participar igual, hablalo con {data?.nombreEvaluado}.
            </p>
          </div>
        )}

        {fase === 'listo' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto mb-6">
              <Check className="text-gold" size={26} />
            </div>
            <h1 className="font-display font-bold text-white text-2xl mb-3">¡Gracias!</h1>
            <p className="font-body text-white/60 text-sm max-w-md mx-auto">
              Tus respuestas quedaron registradas. {data?.nombreEvaluado} va a recibir un informe
              con el promedio de todas las miradas, sin saber qué respondió cada persona.
            </p>
          </motion.div>
        )}

        {fase === 'intro' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase mb-4">
              Tu mirada cuenta
            </p>
            <h1 className="font-display font-bold text-white text-3xl lg:text-4xl leading-tight mb-6">
              Evaluación de {data.nombreEvaluado}
            </h1>
            <p className="font-body text-white/65 text-base leading-relaxed mb-4 max-w-xl mx-auto">
              Hola {data.nombreEvaluador}. {data.nombreEvaluado} está haciendo un diagnóstico de su
              liderazgo y te eligió para aportar tu punto de vista.
            </p>
            <p className="font-body text-white/65 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Son {totalPreguntas} afirmaciones y toma unos 10 minutos.{' '}
              <span className="text-gold">Tus respuestas son anónimas</span>: se promedian con las
              de las otras personas invitadas, así que nadie va a saber qué respondiste vos.
              Respondé con honestidad, es lo que hace útil al ejercicio.
            </p>
            <Button
              onClick={() => setFase('quiz')}
              className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2"
            >
              Comenzar <ArrowRight size={16} />
            </Button>
          </motion.div>
        )}

        {fase === 'quiz' && actual && (
          <motion.div key={pilarStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between gap-4 mb-2">
              <p className="font-body font-semibold text-gold tracking-[0.2em] text-[11px] uppercase">
                Bloque {pilarStep + 1} de {pilares.length}
              </p>
              <p className="font-body text-white/35 text-xs">
                {respondidas} de {totalPreguntas}
              </p>
            </div>
            <h2 className="font-display font-bold text-white text-2xl mb-2">{actual.name}</h2>
            <p className="font-body text-white/45 text-sm mb-8">
              Pensando en {data.nombreEvaluado}, indicá cuánto coincidís con cada afirmación.
            </p>

            <div className="flex flex-col gap-7">
              {actual.questions.map((q) => (
                <div key={q.id}>
                  <p className="font-body text-white/85 text-sm leading-relaxed mb-3">{q.text}</p>
                  <div className="flex gap-2 flex-wrap">
                    {data.scale.map((s) => {
                      const elegido = answers[q.id] === s.value
                      return (
                        <button
                          key={s.value}
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: s.value }))}
                          title={s.label}
                          className={`w-11 h-11 rounded-full border font-body text-sm transition-all duration-150 ${
                            elegido
                              ? 'bg-gold border-gold text-white font-semibold'
                              : 'border-white/15 text-white/50 hover:border-gold/50 hover:text-white'
                          }`}
                          aria-label={`${s.value} — ${s.label}`}
                          aria-pressed={elegido}
                        >
                          {s.value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-white/8">
              <p className="font-body text-white/30 text-[11px]">
                1 = {data.scale[0].label} · {data.scale.length} = {data.scale.at(-1).label}
              </p>
            </div>

            {error && <p role="alert" className="font-body text-rose-400 text-sm mt-4">{error}</p>}

            <div className="flex justify-between mt-6">
              <Button
                variant="ghost"
                onClick={() => (pilarStep === 0 ? setFase('intro') : setPilarStep((p) => p - 1))}
                className="text-white/60 hover:text-gold hover:bg-transparent gap-2"
              >
                <ArrowLeft size={16} /> Atrás
              </Button>
              {pilarStep < pilares.length - 1 ? (
                <Button
                  onClick={() => setPilarStep((p) => p + 1)}
                  disabled={!completo}
                  className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-7 h-11 font-body font-semibold text-sm gap-2 disabled:opacity-40"
                >
                  Siguiente <ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  onClick={enviar}
                  disabled={!completo || respondidas < totalPreguntas || enviando}
                  className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-11 font-body font-semibold text-sm gap-2 disabled:opacity-40"
                >
                  {enviando ? (
                    <><Loader2 className="animate-spin" size={16} /> Enviando…</>
                  ) : (
                    <>Enviar mis respuestas <Check size={16} /></>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
