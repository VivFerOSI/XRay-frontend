import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Clock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'

const estadoColor = {
  abierta: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  cerrada: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  vencida: 'text-white/40 border-white/15 bg-white/5',
}

/** Cómo se lee cada brecha. El signo es siempre auto − terceros. */
const LECTURA = {
  alineado: { texto: 'Miradas alineadas', color: 'text-white/50' },
  sobreestima: { texto: 'Se ve mejor de lo que lo ven', color: 'text-amber-400' },
  subestima: { texto: 'Lo ven mejor de lo que se ve', color: 'text-sky-400' },
}

const fechaHora = (d) => new Date(d).toLocaleString('es-AR')
const fecha = (d) => new Date(d).toLocaleDateString('es-AR')

function Dato({ etiqueta, children }) {
  if (!children) return null
  return (
    <div>
      <p className="font-body text-[11px] uppercase tracking-wider text-white/35 mb-0.5">
        {etiqueta}
      </p>
      <p className="font-body text-white text-sm">{children}</p>
    </div>
  )
}

/**
 * Las dos miradas sobre un pilar, una encima de la otra.
 *
 * Se dibujan dos barras sobre la misma escala en vez de una sola con la
 * diferencia: lo que importa no es sólo el tamaño de la brecha sino en qué
 * nivel está cada una (dos miradas bajas y coincidentes no son buena noticia).
 */
function Pilar({ p }) {
  const lectura = LECTURA[p.lectura] ?? LECTURA.alineado
  const pct = (v) => `${Math.min(100, (v / p.maxPilar) * 100)}%`

  return (
    <div className="py-4 border-b border-white/5 last:border-0">
      <div className="flex items-baseline justify-between gap-3 mb-2.5 flex-wrap">
        <p className="font-body text-white text-sm font-semibold">{p.name}</p>
        <p className={`font-body text-xs ${lectura.color}`}>
          {lectura.texto}
          {p.lectura !== 'alineado' && (
            <span className="text-white/30"> · {p.gap > 0 ? '+' : ''}{p.gap}</span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-1.5">
        <span className="font-body text-[10px] uppercase tracking-wider text-white/35 w-20 shrink-0">
          Él / ella
        </span>
        <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
          <div className="h-full rounded-full bg-gold" style={{ width: pct(p.auto) }} />
        </div>
        <span className="font-body text-white/70 text-xs w-14 text-right shrink-0">
          {p.auto} / {p.maxPilar}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-body text-[10px] uppercase tracking-wider text-white/35 w-20 shrink-0">
          Su equipo
        </span>
        <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
          <div className="h-full rounded-full bg-sky-400" style={{ width: pct(p.terceros) }} />
        </div>
        <span className="font-body text-white/70 text-xs w-14 text-right shrink-0">
          {p.terceros} / {p.maxPilar}
        </span>
      </div>

      {/* El sangrado alinea el texto con las barras: etiqueta (w-20) más el gap. */}
      {p.bandaTerceros && (
        <p className="font-body text-white/35 text-xs mt-2 pl-[5.75rem]">
          Según su equipo: {p.bandaTerceros}
        </p>
      )}
    </div>
  )
}

/**
 * Comparativo 360° de una persona, visto desde el panel.
 *
 * Muestra quién respondió y quién no, pero nunca las respuestas de cada
 * evaluador: a los invitados se les promete que sólo se ve el promedio.
 */
export default function AdminDetalle360() {
  const { submissionId } = useParams()
  const [d, setD] = useState(null)
  const [estado, setEstado] = useState('cargando')
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .ronda360(submissionId)
      .then((data) => {
        setD(data)
        setEstado('ok')
      })
      .catch((e) => {
        setError(e.message)
        setEstado('error')
      })
  }, [submissionId])

  if (estado === 'cargando') {
    return (
      <p className="flex items-center gap-2 font-body text-white/60 text-sm">
        <Loader2 className="animate-spin" size={16} /> Cargando…
      </p>
    )
  }
  if (estado === 'error') {
    return (
      <div>
        <Link
          to="/admin/evaluaciones-360"
          className="inline-flex items-center gap-1.5 font-body text-white/40 text-xs hover:text-gold mb-5"
        >
          <ArrowLeft size={14} /> Evaluaciones 360°
        </Link>
        <p role="alert" className="font-body text-rose-400 text-sm">{error}</p>
      </div>
    )
  }

  const c = d.comparativo
  const respondieron = d.evaluadores.filter((e) => e.estado === 'respondido').length

  return (
    <div className="max-w-3xl">
      <Link
        to="/admin/evaluaciones-360"
        className="inline-flex items-center gap-1.5 font-body text-white/40 text-xs hover:text-gold mb-5"
      >
        <ArrowLeft size={14} /> Evaluaciones 360°
      </Link>

      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
        <h1 className="font-display font-bold text-white text-2xl">{d.contacto.nombre}</h1>
        <span
          className={`font-body text-[11px] px-2.5 py-1 rounded-full border ${
            estadoColor[d.estado] ?? estadoColor.vencida
          }`}
        >
          {d.estado}
        </span>
      </div>
      <p className="font-body text-white/45 text-sm mb-6">
        {c ? c.auto.assessmentTitle : d.assessmentKey} · invitada el {fecha(d.createdAt)}
      </p>

      {/* Estado de la ronda */}
      <section className="rounded-xl border border-white/10 bg-white/3 p-5 mb-4">
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <Dato etiqueta="Respondieron">
            {respondieron} de {d.evaluadores.length}
          </Dato>
          <Dato etiqueta="Vence">{fecha(d.venceEl)}</Dato>
          <Dato etiqueta="Informe enviado">
            {d.informeEnviadoEl ? fechaHora(d.informeEnviadoEl) : 'Todavía no'}
          </Dato>
        </div>

        <div className="flex flex-col gap-2 pt-4 border-t border-white/8">
          {d.evaluadores.map((e) => (
            <div key={e.email} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-body text-white/80 text-sm truncate">{e.nombre}</p>
                <p className="font-body text-white/35 text-xs truncate">{e.email}</p>
              </div>
              {e.estado === 'respondido' ? (
                <span className="flex items-center gap-1.5 font-body text-emerald-400 text-xs shrink-0">
                  <Check size={14} /> {fecha(e.respondioEl)}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-body text-white/35 text-xs shrink-0">
                  <Clock size={14} />
                  {e.recordatorios > 0
                    ? `${e.recordatorios} ${e.recordatorios === 1 ? 'recordatorio' : 'recordatorios'}`
                    : 'Pendiente'}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {!c ? (
        <p className="font-body text-white/40 text-sm py-10 text-center border border-white/10 rounded-xl">
          Todavía no respondió nadie: cuando llegue la primera respuesta aparece la comparación.
        </p>
      ) : (
        <>
          {/* Totales */}
          <section className="rounded-xl border border-white/10 bg-white/3 p-5 mb-4">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="font-body text-[11px] uppercase tracking-wider text-white/35 mb-1">
                  Su autoevaluación
                </p>
                <p className="font-display font-bold text-gold text-3xl">
                  {c.auto.total}
                  <span className="text-white/25 text-lg font-body"> / {c.maxTotal}</span>
                </p>
              </div>
              <div>
                <p className="font-body text-[11px] uppercase tracking-wider text-white/35 mb-1">
                  Promedio del equipo
                </p>
                <p className="font-display font-bold text-sky-400 text-3xl">
                  {c.totalTerceros}
                  <span className="text-white/25 text-lg font-body"> / {c.maxTotal}</span>
                </p>
              </div>
              <div>
                <p className="font-body text-[11px] uppercase tracking-wider text-white/35 mb-1">
                  Diferencia
                </p>
                <p className={`font-display font-bold text-3xl ${LECTURA[c.lecturaGeneral].color}`}>
                  {c.gapTotal > 0 ? '+' : ''}{c.gapTotal}
                </p>
              </div>
            </div>
            <p className={`font-body text-sm mt-4 pt-4 border-t border-white/8 ${LECTURA[c.lecturaGeneral].color}`}>
              {LECTURA[c.lecturaGeneral].texto} · sobre {c.evaluadores}{' '}
              {c.evaluadores === 1 ? 'respuesta' : 'respuestas'}
            </p>
          </section>

          {/* Punto ciego y fortaleza oculta */}
          {(c.puntoCiego || c.fortalezaOculta) && (
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {c.puntoCiego && (
                <section className="rounded-xl border border-amber-400/25 bg-amber-400/5 p-5">
                  <p className="flex items-center gap-2 font-body text-[11px] uppercase tracking-wider text-amber-400 mb-2">
                    <EyeOff size={14} /> Punto ciego
                  </p>
                  <p className="font-body text-white text-sm">{c.puntoCiego.name}</p>
                  <p className="font-body text-white/45 text-xs mt-1">
                    Se puntúa {c.puntoCiego.gap} puntos por encima de lo que lo ve su equipo.
                  </p>
                </section>
              )}
              {c.fortalezaOculta && (
                <section className="rounded-xl border border-sky-400/25 bg-sky-400/5 p-5">
                  <p className="flex items-center gap-2 font-body text-[11px] uppercase tracking-wider text-sky-400 mb-2">
                    <Eye size={14} /> Fortaleza oculta
                  </p>
                  <p className="font-body text-white text-sm">{c.fortalezaOculta.name}</p>
                  <p className="font-body text-white/45 text-xs mt-1">
                    Su equipo lo puntúa {Math.abs(c.fortalezaOculta.gap)} puntos por encima de su
                    propia mirada.
                  </p>
                </section>
              )}
            </div>
          )}

          {/* Pilar por pilar */}
          <section className="rounded-xl border border-white/10 bg-white/3 p-5 mb-4">
            <h2 className="font-display font-bold text-white text-lg mb-1">Pilar por pilar</h2>
            <p className="font-body text-white/40 text-xs mb-2">
              En dorado su propia mirada, en celeste el promedio de quienes lo evaluaron.
            </p>
            {c.pilares.map((p) => (
              <Pilar key={p.key} p={p} />
            ))}
          </section>

          <Link
            to={`/admin/resultados/${d.submissionId}`}
            className="inline-block font-body text-white/40 text-xs hover:text-gold"
          >
            Ver la autoevaluación completa →
          </Link>
        </>
      )}
    </div>
  )
}
