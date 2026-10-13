import { useEffect, useState } from 'react'
import { Check, Clock, Loader2, Send, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { stressTestApi } from '@/lib/stressTestApi'

const inputClass =
  'border-0 border-b-2 border-white/15 rounded-none bg-transparent shadow-none ' +
  'focus-visible:ring-0 focus-visible:border-gold text-white placeholder:text-white/25 ' +
  'font-body h-11 px-0 transition-colors duration-200'

const fecha = (d) =>
  new Date(d).toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })

/**
 * Invitar hasta tres personas a evaluar, al pie del propio informe.
 *
 * Si la autoevaluación no admite 360° (el cuestionario no lo tiene habilitado
 * o le faltan los textos en tercera persona), el bloque no se muestra: no
 * tiene sentido ofrecer algo que va a fallar al enviarse.
 */
export default function Invitar360({ submissionId }) {
  const [estado, setEstado] = useState('cargando')
  const [ronda, setRonda] = useState(null)
  const [filas, setFilas] = useState([
    { nombre: '', email: '' },
    { nombre: '', email: '' },
    { nombre: '', email: '' },
  ])
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    stressTestApi
      .estado360(submissionId)
      .then((d) => {
        // El cuestionario puede no tener 360° habilitado, o faltarle los
        // textos en tercera persona: ahí no se ofrece nada.
        if (!d.disponible) setEstado('oculto')
        else if (d.existe) {
          setRonda(d)
          setEstado('enviada')
        } else {
          setEstado('formulario')
        }
      })
      // Si el estado no se puede consultar, se oculta el bloque en lugar de
      // mostrar un error en medio del informe.
      .catch(() => setEstado('oculto'))
  }, [submissionId])

  const completas = filas.filter((f) => f.nombre.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))

  async function invitar() {
    setEnviando(true)
    setError('')
    try {
      const r = await stressTestApi.invitar360(
        submissionId,
        completas.map((f) => ({ nombre: f.nombre.trim(), email: f.email.trim() })),
      )
      setRonda({ existe: true, estado: 'abierta', venceEl: r.venceEl, evaluadores: r.invitados })
      setEstado('enviada')
    } catch (e) {
      setError(e.message)
    } finally {
      setEnviando(false)
    }
  }

  if (estado === 'oculto' || estado === 'cargando') return null

  if (estado === 'enviada' && ronda) {
    const respondieron = ronda.evaluadores.filter((e) => e.estado === 'respondido').length
    return (
      <div className="rounded-2xl border border-white/10 bg-white/3 p-6 mb-10 no-print">
        <h2 className="font-display font-bold text-white text-xl mb-1">Tu evaluación 360°</h2>
        <p className="font-body text-white/50 text-sm mb-5">
          {ronda.estado === 'cerrada'
            ? 'La ronda se cerró. Te enviamos el informe comparativo por correo.'
            : `Invitaste a ${ronda.evaluadores.length} personas. Respondieron ${respondieron}.`}
        </p>

        <div className="flex flex-col gap-2 mb-5">
          {ronda.evaluadores.map((e) => (
            <div key={e.email} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-body text-white/80 text-sm truncate">{e.nombre}</p>
                <p className="font-body text-white/35 text-xs truncate">{e.email}</p>
              </div>
              {e.estado === 'respondido' ? (
                <span className="flex items-center gap-1.5 font-body text-emerald-400 text-xs shrink-0">
                  <Check size={14} /> Respondió
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-body text-white/35 text-xs shrink-0">
                  <Clock size={14} /> Pendiente
                </span>
              )}
            </div>
          ))}
        </div>

        {ronda.estado !== 'cerrada' && (
          <p className="font-body text-white/35 text-xs">
            Tienen tiempo hasta el {fecha(ronda.venceEl)}. Cuando respondan todos —o al vencer el
            plazo— te mandamos el informe comparativo.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gold/25 bg-white/3 p-6 mb-10 no-print">
      <div className="flex items-start gap-3 mb-2">
        <UserPlus className="text-gold shrink-0 mt-0.5" size={20} />
        <div>
          <h2 className="font-display font-bold text-white text-xl">
            Sumá la mirada de tu equipo
          </h2>
          <p className="font-body text-white/55 text-sm mt-1.5 leading-relaxed">
            Lo que acabás de ver es tu propia percepción. Invitá hasta tres personas que trabajen
            con vos a responder las mismas preguntas sobre tu gestión, y te enviamos un informe que
            compara ambas miradas. Sus respuestas son anónimas: vas a ver el promedio, no quién
            dijo qué.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {filas.map((f, i) => (
          <div key={i} className="grid sm:grid-cols-2 gap-3">
            <Input
              value={f.nombre}
              onChange={(e) =>
                setFilas((fs) => fs.map((x, j) => (j === i ? { ...x, nombre: e.target.value } : x)))
              }
              placeholder={`Nombre ${i === 0 ? '' : '(opcional)'}`.trim()}
              maxLength={80}
              className={inputClass}
            />
            <Input
              type="email"
              value={f.email}
              onChange={(e) =>
                setFilas((fs) => fs.map((x, j) => (j === i ? { ...x, email: e.target.value } : x)))
              }
              placeholder="Correo"
              maxLength={120}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {error && <p role="alert" className="font-body text-rose-400 text-sm mt-5">{error}</p>}

      <div className="flex items-center justify-between gap-4 mt-7 flex-wrap">
        <p className="font-body text-white/30 text-xs">
          {completas.length === 0
            ? 'Completá al menos una persona'
            : `${completas.length} ${completas.length === 1 ? 'persona' : 'personas'} para invitar`}
        </p>
        <Button
          onClick={invitar}
          disabled={completas.length === 0 || enviando}
          className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-7 h-11 font-body font-semibold text-sm gap-2 disabled:opacity-40"
        >
          {enviando ? (
            <><Loader2 className="animate-spin" size={16} /> Enviando…</>
          ) : (
            <>Enviar invitaciones <Send size={15} /></>
          )}
        </Button>
      </div>
    </div>
  )
}
