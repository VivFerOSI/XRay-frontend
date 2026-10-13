import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Loader2, Plus, Save, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { adminApi } from '@/lib/adminApi'
import ControlesOrden from './ControlesOrden'

const campo =
  'w-full bg-white/4 border border-white/10 rounded-lg px-3 py-2.5 text-white font-body text-sm ' +
  'focus:outline-none focus:border-gold transition-colors duration-150 resize-y'

const numero =
  'w-16 bg-white/4 border border-white/10 rounded px-2 py-1 text-white font-body text-xs ' +
  'focus:outline-none focus:border-gold text-center'

/** Textarea que crece con el contenido, para no editar textos largos en una ranura. */
function Texto({ value, onChange, filas = 2, ...props }) {
  return (
    <textarea
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      rows={filas}
      className={campo}
      {...props}
    />
  )
}

/** Mueve un elemento dentro de un array, en el lugar. */
function mover(lista, desde, hacia) {
  const [item] = lista.splice(desde, 1)
  lista.splice(hacia, 0, item)
}

export default function AdminEditarCuestionario() {
  const { key } = useParams()
  const [def, setDef] = useState(null)
  const [estado, setEstado] = useState('cargando')
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [sucio, setSucio] = useState(false)
  const [abierto, setAbierto] = useState(null)

  useEffect(() => {
    adminApi
      .assessment(key)
      .then((d) => {
        setDef(d)
        setEstado('ok')
      })
      .catch((e) => {
        setError(e.message)
        setEstado('error')
      })
  }, [key])

  // Avisa si se va con cambios sin guardar: el editor tiene mucho texto y
  // perderlo por cerrar la pestaña sería costoso.
  useEffect(() => {
    if (!sucio) return
    const handler = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [sucio])

  /** Aplica un cambio sobre una copia profunda y marca el formulario como sucio. */
  function editar(fn) {
    setDef((actual) => {
      const copia = structuredClone(actual)
      fn(copia)
      return copia
    })
    setSucio(true)
    setGuardado(false)
    setError('')
  }

  async function guardar() {
    setGuardando(true)
    setError('')
    try {
      await adminApi.guardarAssessment(key, def)
      // El backend renumera las preguntas al guardar: se relee para que la
      // pantalla muestre los mismos números que quedaron almacenados.
      setDef(await adminApi.assessment(key))
      setSucio(false)
      setGuardado(true)
      setTimeout(() => setGuardado(false), 3000)
    } catch (e) {
      setError(e.message)
    } finally {
      setGuardando(false)
    }
  }

  if (estado === 'cargando') {
    return (
      <p className="flex items-center gap-2 font-body text-white/60 text-sm">
        <Loader2 className="animate-spin" size={16} /> Cargando…
      </p>
    )
  }
  if (estado === 'error') {
    return <p role="alert" className="font-body text-rose-400 text-sm">{error}</p>
  }

  const totalPreguntas = def.pilares.reduce((n, p) => n + p.questions.length, 0)

  return (
    <div className="max-w-3xl pb-28">
      <Link
        to="/admin/cuestionarios"
        className="inline-flex items-center gap-1.5 font-body text-white/40 text-xs hover:text-gold mb-5"
      >
        <ArrowLeft size={14} /> Cuestionarios
      </Link>

      <h1 className="font-display font-bold text-white text-2xl mb-1">{def.title}</h1>
      <p className="font-body text-white/45 text-sm mb-8">
        {def.pilares.length} pilares · {totalPreguntas} afirmaciones · puntaje de{' '}
        {totalPreguntas} a {totalPreguntas * 5}
      </p>

      {/* Textos generales */}
      <section className="rounded-xl border border-white/10 bg-white/3 p-5 mb-5">
        <h2 className="font-body font-semibold text-white text-sm mb-4">Presentación</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-[11px] uppercase tracking-wider text-white/40">Título</span>
            <Texto value={def.title} filas={1} onChange={(v) => editar((d) => { d.title = v })} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-[11px] uppercase tracking-wider text-white/40">
              Texto de la pantalla inicial
            </span>
            <Texto value={def.intro} filas={3} onChange={(v) => editar((d) => { d.intro = v })} />
          </label>
        </div>
      </section>

      {/* Pilares */}
      {def.pilares.map((pilar, iPilar) => {
        const expandido = abierto === pilar.key
        const minPilar = pilar.questions.length
        const maxPilar = pilar.questions.length * 5
        return (
          <section key={pilar.key} className="rounded-xl border border-white/10 bg-white/3 mb-3 overflow-hidden">
            <div className="flex items-center gap-2 pr-4">
              <button
                onClick={() => setAbierto(expandido ? null : pilar.key)}
                className="flex-1 flex items-center justify-between gap-3 p-5 text-left hover:bg-white/3 min-w-0"
              >
                <span className="font-body font-semibold text-white text-sm truncate">{pilar.name}</span>
                <span className="font-body text-white/35 text-xs shrink-0">
                  {pilar.questions.length} afirmaciones · {expandido ? 'ocultar' : 'editar'}
                </span>
              </button>
              <ControlesOrden
                indice={iPilar}
                total={def.pilares.length}
                etiqueta="pilar"
                onSubir={() => editar((d) => mover(d.pilares, iPilar, iPilar - 1))}
                onBajar={() => editar((d) => mover(d.pilares, iPilar, iPilar + 1))}
                onEliminar={
                  def.pilares.length > 1
                    ? () => {
                        if (!confirm(`¿Eliminar el pilar "${pilar.name}" y sus ${pilar.questions.length} afirmaciones?`)) return
                        editar((d) => { d.pilares.splice(iPilar, 1) })
                        setAbierto(null)
                      }
                    : null
                }
              />
            </div>

            {expandido && (
              <div className="px-5 pb-5 flex flex-col gap-5 border-t border-white/8 pt-5">
                <label className="flex flex-col gap-1.5">
                  <span className="font-body text-[11px] uppercase tracking-wider text-white/40">
                    Nombre del pilar
                  </span>
                  <Texto
                    value={pilar.name}
                    filas={1}
                    onChange={(v) => editar((d) => { d.pilares[iPilar].name = v })}
                  />
                </label>

                <div>
                  <p className="font-body text-[11px] uppercase tracking-wider text-white/40 mb-2">
                    Afirmaciones
                  </p>
                  <div className="flex flex-col gap-3">
                    {pilar.questions.map((q, iQ) => (
                      <div key={iQ} className="flex gap-2 items-start">
                        <span className="font-body text-gold text-xs pt-3 w-5 shrink-0 text-right">{q.id}</span>
                        <Texto
                          value={q.text}
                          onChange={(v) => editar((d) => { d.pilares[iPilar].questions[iQ].text = v })}
                        />
                        <div className="pt-1.5">
                          <ControlesOrden
                            indice={iQ}
                            total={pilar.questions.length}
                            etiqueta="afirmación"
                            onSubir={() => editar((d) => mover(d.pilares[iPilar].questions, iQ, iQ - 1))}
                            onBajar={() => editar((d) => mover(d.pilares[iPilar].questions, iQ, iQ + 1))}
                            onEliminar={
                              pilar.questions.length > 1
                                ? () => editar((d) => { d.pilares[iPilar].questions.splice(iQ, 1) })
                                : null
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      editar((d) => {
                        d.pilares[iPilar].questions.push({ id: 0, text: '' })
                      })
                    }
                    className="mt-3 inline-flex items-center gap-1.5 font-body text-xs text-white/45 hover:text-gold transition-colors"
                  >
                    <Plus size={14} /> Agregar afirmación
                  </button>
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                    <p className="font-body text-[11px] uppercase tracking-wider text-white/40">
                      Devolución según el puntaje
                    </p>
                    <p className="font-body text-white/30 text-[11px]">
                      Con {pilar.questions.length} afirmaciones, el rango va de {minPilar} a {maxPilar}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {pilar.bands.map((banda, iB) => (
                      <div key={iB} className="rounded-lg border border-white/8 p-4">
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="font-body text-white/35 text-xs">De</span>
                          <input
                            type="number"
                            value={banda.min}
                            onChange={(e) => editar((d) => { d.pilares[iPilar].bands[iB].min = Number(e.target.value) })}
                            className={numero}
                            aria-label="Puntaje mínimo"
                          />
                          <span className="font-body text-white/35 text-xs">a</span>
                          <input
                            type="number"
                            value={banda.max}
                            onChange={(e) => editar((d) => { d.pilares[iPilar].bands[iB].max = Number(e.target.value) })}
                            className={numero}
                            aria-label="Puntaje máximo"
                          />
                          <span className="font-body text-white/35 text-xs">puntos</span>
                        </div>
                        <div className="flex flex-col gap-3">
                          <Texto
                            value={banda.title}
                            filas={1}
                            placeholder="Título de la banda"
                            onChange={(v) => editar((d) => { d.pilares[iPilar].bands[iB].title = v })}
                          />
                          {banda.bullets ? (
                            banda.bullets.map((b, iBu) => (
                              <div key={iBu} className="flex gap-2.5">
                                <span className="text-gold text-sm pt-2.5">•</span>
                                <Texto
                                  value={b}
                                  onChange={(v) =>
                                    editar((d) => { d.pilares[iPilar].bands[iB].bullets[iBu] = v })
                                  }
                                />
                              </div>
                            ))
                          ) : (
                            <Texto
                              value={banda.text}
                              filas={4}
                              onChange={(v) => editar((d) => { d.pilares[iPilar].bands[iB].text = v })}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        )
      })}

      <button
        type="button"
        onClick={() =>
          editar((d) => {
            const nuevaKey = `pilar${Date.now().toString(36)}`
            d.pilares.push({
              key: nuevaKey,
              name: 'Pilar nuevo',
              questions: [{ id: 0, text: '' }],
              bands: [
                { min: 4, max: 5, title: 'Alto', text: '' },
                { min: 3, max: 3, title: 'Medio', text: '' },
                { min: 2, max: 2, title: 'Bajo', text: '' },
                { min: 1, max: 1, title: 'Muy bajo', text: '' },
              ],
            })
            setAbierto(nuevaKey)
          })
        }
        className="inline-flex items-center gap-1.5 font-body text-xs text-white/45 hover:text-gold transition-colors mb-5"
      >
        <Plus size={14} /> Agregar pilar
      </button>

      {/* Niveles globales */}
      <section className="rounded-xl border border-white/10 bg-white/3 mb-3 overflow-hidden">
        <button
          onClick={() => setAbierto(abierto === '__global' ? null : '__global')}
          className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-white/3"
        >
          <span className="font-body font-semibold text-white text-sm">Resultado general</span>
          <span className="font-body text-white/35 text-xs shrink-0">
            {def.globalBands.length} niveles · {abierto === '__global' ? 'ocultar' : 'editar'}
          </span>
        </button>

        {abierto === '__global' && (
          <div className="px-5 pb-5 flex flex-col gap-4 border-t border-white/8 pt-5">
            <p className="font-body text-white/30 text-[11px]">
              Con {totalPreguntas} afirmaciones, el rango va de {totalPreguntas} a {totalPreguntas * 5}
            </p>
            {def.globalBands.map((g, iG) => (
              <div key={g.level} className="rounded-lg border border-white/8 p-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="font-body text-white/35 text-xs">De</span>
                  <input
                    type="number"
                    value={g.min}
                    onChange={(e) => editar((d) => { d.globalBands[iG].min = Number(e.target.value) })}
                    className={numero}
                    aria-label="Puntaje mínimo"
                  />
                  <span className="font-body text-white/35 text-xs">a</span>
                  <input
                    type="number"
                    value={g.max}
                    onChange={(e) => editar((d) => { d.globalBands[iG].max = Number(e.target.value) })}
                    className={numero}
                    aria-label="Puntaje máximo"
                  />
                  <span className="font-body text-white/35 text-xs">puntos</span>
                </div>
                <div className="flex flex-col gap-3">
                  <Texto value={g.title} filas={1} placeholder="Título"
                    onChange={(v) => editar((d) => { d.globalBands[iG].title = v })} />
                  <Texto value={g.perfil} filas={1} placeholder="Perfil"
                    onChange={(v) => editar((d) => { d.globalBands[iG].perfil = v })} />
                  <Texto value={g.text} filas={3} placeholder="Descripción"
                    onChange={(v) => editar((d) => { d.globalBands[iG].text = v })} />
                  <Texto value={g.closing} filas={3} placeholder="Llamado a la acción"
                    onChange={(v) => editar((d) => { d.globalBands[iG].closing = v })} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Barra de guardado */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-navy-deep/95 backdrop-blur border-t border-white/10 px-6 lg:px-10 py-4">
        <div className="max-w-3xl flex items-center justify-between gap-4">
          <p className="font-body text-xs min-w-0">
            {error ? (
              <span role="alert" className="text-rose-400 flex items-start gap-1.5">
                <TriangleAlert size={14} className="shrink-0 mt-0.5" /> {error}
              </span>
            ) : guardado ? (
              <span className="text-emerald-400 flex items-center gap-1.5"><Check size={14} /> Guardado</span>
            ) : sucio ? (
              <span className="text-amber-400">Hay cambios sin guardar</span>
            ) : (
              <span className="text-white/30">Sin cambios</span>
            )}
          </p>
          <Button
            onClick={guardar}
            disabled={!sucio || guardando}
            className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-6 h-10 font-body font-semibold text-xs gap-2 disabled:opacity-40 shrink-0"
          >
            {guardando ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  )
}
