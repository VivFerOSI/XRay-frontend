import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2, Mail, MessageCircle, Phone } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'

const nivelColor = {
  alto: 'text-emerald-400',
  medio: 'text-lime-400',
  bajo: 'text-amber-400',
  muyBajo: 'text-rose-400',
}

function barraColor(score, max) {
  const pct = score / max
  if (pct >= 0.84) return 'bg-emerald-500'
  if (pct >= 0.64) return 'bg-lime-500'
  if (pct >= 0.44) return 'bg-amber-500'
  return 'bg-rose-500'
}

function Dato({ etiqueta, children }) {
  if (!children) return null
  return (
    <div>
      <p className="font-body text-[11px] uppercase tracking-wider text-white/35 mb-0.5">{etiqueta}</p>
      <p className="font-body text-white text-sm">{children}</p>
    </div>
  )
}

export default function AdminDetalleResultado() {
  const { id } = useParams()
  const [d, setD] = useState(null)
  const [estado, setEstado] = useState('cargando')
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .submission(id)
      .then((data) => {
        setD(data)
        setEstado('ok')
      })
      .catch((e) => {
        setError(e.message)
        setEstado('error')
      })
  }, [id])

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

  const maxPilar = Math.round(d.result.maxTotal / d.result.pilares.length)
  const tel = (d.contacto.telefono ?? '').replace(/[^0-9]/g, '')

  return (
    <div className="max-w-3xl">
      <Link
        to="/admin/resultados"
        className="inline-flex items-center gap-1.5 font-body text-white/40 text-xs hover:text-gold mb-5"
      >
        <ArrowLeft size={14} /> Resultados
      </Link>

      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
        <h1 className="font-display font-bold text-white text-2xl">{d.contacto.nombre}</h1>
        <p className="font-body text-white/40 text-xs">
          {new Date(d.createdAt).toLocaleString('es-AR')}
        </p>
      </div>
      <p className="font-body text-white/45 text-sm mb-6">
        {d.result.assessmentTitle}
        {d.tiene360 && (
          <>
            {' · '}
            <Link
              to={`/admin/evaluaciones-360/${d.id}`}
              className="text-gold hover:underline"
            >
              ver su evaluación 360°
            </Link>
          </>
        )}
      </p>

      {/* Contacto */}
      <section className="rounded-xl border border-white/10 bg-white/3 p-5 mb-4">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Dato etiqueta="Organización">{d.organizacion.nombre}</Dato>
          <Dato etiqueta="Sector">{d.organizacion.sector}</Dato>
          <Dato etiqueta="Antigüedad">{d.organizacion.antiguedad}</Dato>
          <Dato etiqueta="Equipo">{d.organizacion.tamanoEquipo}</Dato>
        </div>
        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/8">
          <a
            href={`mailto:${d.contacto.email}`}
            className="inline-flex items-center gap-1.5 font-body text-xs text-white/60 hover:text-gold"
          >
            <Mail size={14} /> {d.contacto.email}
          </a>
          {d.contacto.telefono && (
            <>
              <a
                href={`tel:${d.contacto.telefono}`}
                className="inline-flex items-center gap-1.5 font-body text-xs text-white/60 hover:text-gold"
              >
                <Phone size={14} /> {d.contacto.telefono}
              </a>
              <a
                href={`https://wa.me/${tel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-xs text-white/60 hover:text-gold"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </>
          )}
        </div>
      </section>

      {/* Puntaje */}
      <section className="rounded-xl border border-gold/30 bg-white/3 p-5 mb-4">
        <p className="font-display font-bold text-gold text-3xl mb-1">
          {d.result.total}
          <span className="font-body text-white/35 text-lg"> / {d.result.maxTotal}</span>
        </p>
        <p className="font-body font-semibold text-white text-sm">{d.result.global.title}</p>
        <p className="font-body text-gold text-xs mt-0.5">{d.result.global.perfil}</p>

        <div className="flex flex-col gap-3 mt-5">
          {d.result.pilares.map((p) => (
            <div key={p.key}>
              <div className="flex justify-between items-baseline gap-3 mb-1">
                <span className="font-body text-white/70 text-xs">{p.name}</span>
                <span className="font-body text-white/50 text-xs shrink-0">
                  {p.score}/{maxPilar} · {p.bandTitle}
                </span>
              </div>
              <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${barraColor(p.score, maxPilar)}`}
                  style={{ width: `${(p.score / maxPilar) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-white/8">
          <Dato etiqueta="Norte elegido">{d.norteLabel}</Dato>
        </div>
      </section>

      {/* Historial */}
      {d.historial.length > 1 && (
        <section className="rounded-xl border border-white/10 bg-white/3 p-5 mb-4">
          <h2 className="font-body font-semibold text-white text-sm mb-1">
            Historial de esta persona
          </h2>
          <p className="font-body text-white/40 text-xs mb-4">
            {d.historial.length} evaluaciones con el mismo correo.
          </p>
          <div className="flex flex-col gap-1">
            {d.historial.map((h) => {
              const fila = (
                <>
                  <span className="font-body text-white/50 text-xs w-24 shrink-0">
                    {new Date(h.createdAt).toLocaleDateString('es-AR')}
                  </span>
                  <span className="font-body text-white/60 text-xs flex-1 truncate">
                    {h.assessmentKey}
                  </span>
                  <span className={`font-body font-semibold text-xs ${nivelColor[h.globalLevel] ?? 'text-white'}`}>
                    {h.totalScore}
                  </span>
                </>
              )
              return h.esActual ? (
                <div key={h.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/6">
                  {fila}
                  <span className="font-body text-gold text-[10px] uppercase tracking-wider shrink-0">
                    Viendo
                  </span>
                </div>
              ) : (
                <Link
                  key={h.id}
                  to={`/admin/resultados/${h.id}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  {fila}
                  <span className="w-12 shrink-0" />
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Respuestas */}
      <section className="rounded-xl border border-white/10 bg-white/3 p-5 mb-10">
        <h2 className="font-body font-semibold text-white text-sm mb-1">Respuestas</h2>
        <p className="font-body text-white/40 text-xs mb-4">
          Escala de 1 ({d.escala[0]?.label}) a {d.escala.length} ({d.escala.at(-1)?.label}).
        </p>
        <div className="flex flex-col gap-2.5">
          {d.respuestas.map((r) => (
            <div key={r.id} className="flex gap-3 items-start">
              <span className="font-body text-white/30 text-xs w-5 shrink-0 text-right pt-0.5">
                {r.id}
              </span>
              <p className="font-body text-white/65 text-xs leading-relaxed flex-1">
                {r.texto}
                {r.reverse && (
                  <span className="text-amber-400/70" title="Puntaje invertido"> (inversa)</span>
                )}
              </p>
              <span className="font-body font-semibold text-gold text-sm w-5 shrink-0 text-center">
                {r.valor ?? '—'}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
