import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'

const inputClass =
  'bg-transparent border border-white/15 rounded-lg px-3 h-9 text-white font-body text-sm ' +
  'focus:outline-none focus:border-gold transition-colors duration-150'

const ESTADOS = [
  { value: 'abierta', label: 'Abiertas' },
  { value: 'cerrada', label: 'Cerradas' },
  { value: 'vencida', label: 'Vencidas' },
]

const estadoColor = {
  abierta: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  cerrada: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  vencida: 'text-white/40 border-white/15 bg-white/5',
}

const fecha = (d) => new Date(d).toLocaleDateString('es-AR')

/** Días que faltan para el vencimiento, en palabras. */
function plazo(venceEl, estado) {
  if (estado !== 'abierta') return null
  const dias = Math.ceil((new Date(venceEl) - Date.now()) / 86400000)
  if (dias < 0) return 'vencida'
  if (dias === 0) return 'vence hoy'
  return `${dias} ${dias === 1 ? 'día' : 'días'}`
}

/**
 * Rondas de evaluación 360° en curso y cerradas.
 *
 * Lo que importa seguir acá es el avance: cuántos de los invitados
 * respondieron y cuánto falta para que la ronda venza.
 */
export default function AdminEvaluaciones360() {
  const [filtros, setFiltros] = useState({ assessmentKey: '', estado: '' })
  const [pagina, setPagina] = useState(1)
  const [datos, setDatos] = useState(null)
  const [cuestionarios, setCuestionarios] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi.assessments().then(setCuestionarios).catch(() => setCuestionarios([]))
  }, [])

  const cargar = useCallback(async () => {
    setEstado('cargando')
    try {
      setDatos(await adminApi.rondas360({ ...filtros, pagina, porPagina: 20 }))
      setEstado('ok')
    } catch (e) {
      setError(e.message)
      setEstado('error')
    }
  }, [filtros, pagina])

  useEffect(() => {
    cargar()
  }, [cargar])

  // Al cambiar un filtro se vuelve a la primera página.
  const cambiarFiltro = (campo, valor) => {
    setPagina(1)
    setFiltros((f) => ({ ...f, [campo]: valor }))
  }

  return (
    <div className="max-w-6xl">
      <h1 className="font-display font-bold text-white text-2xl mb-2">Evaluaciones 360°</h1>
      <p className="font-body text-white/50 text-sm mb-6">
        Quién invitó a su equipo a evaluarlo, cuántos respondieron y en qué quedó la comparación.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filtros.assessmentKey}
          onChange={(e) => cambiarFiltro('assessmentKey', e.target.value)}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="" className="bg-navy-deep">Todos los cuestionarios</option>
          {cuestionarios.map((c) => (
            <option key={c.key} value={c.key} className="bg-navy-deep">{c.title}</option>
          ))}
        </select>
        <select
          value={filtros.estado}
          onChange={(e) => cambiarFiltro('estado', e.target.value)}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="" className="bg-navy-deep">Todos los estados</option>
          {ESTADOS.map((e) => (
            <option key={e.value} value={e.value} className="bg-navy-deep">{e.label}</option>
          ))}
        </select>
      </div>

      {estado === 'error' && (
        <p role="alert" className="font-body text-rose-400 text-sm mb-4">{error}</p>
      )}

      {estado === 'cargando' && (
        <p className="flex items-center gap-2 font-body text-white/60 text-sm">
          <Loader2 className="animate-spin" size={16} /> Cargando…
        </p>
      )}

      {estado === 'ok' && datos && (
        <>
          {datos.total === 0 ? (
            <p className="font-body text-white/40 text-sm py-10 text-center border border-white/10 rounded-xl">
              Todavía nadie inició una evaluación 360°.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/3">
                    {['Fecha', 'Persona', 'Cuestionario', 'Respuestas', 'Estado', 'Plazo'].map((h) => (
                      <th
                        key={h}
                        className="font-body text-[11px] uppercase tracking-wider text-white/40 px-4 py-3 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datos.items.map((r) => {
                    const completa = r.invitados > 0 && r.respondieron === r.invitados
                    return (
                      <tr
                        key={r.submissionId}
                        className="border-b border-white/5 last:border-0 hover:bg-white/3"
                      >
                        <td className="px-4 py-3 font-body text-white/50 text-xs whitespace-nowrap">
                          {fecha(r.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            to={`/admin/evaluaciones-360/${r.submissionId}`}
                            className="font-body text-white text-sm hover:text-gold"
                          >
                            {r.contacto.nombre}
                          </Link>
                          <p className="font-body text-white/40 text-xs">{r.contacto.email}</p>
                        </td>
                        <td className="px-4 py-3 font-body text-white/50 text-xs">
                          {r.assessmentKey}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`font-body font-semibold text-sm ${
                              completa ? 'text-emerald-400' : 'text-white/70'
                            }`}
                          >
                            {r.respondieron} de {r.invitados}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block font-body text-[11px] px-2 py-0.5 rounded-full border ${
                              estadoColor[r.estado] ?? estadoColor.vencida
                            }`}
                          >
                            {r.estado}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-body text-white/40 text-xs whitespace-nowrap">
                          {plazo(r.venceEl, r.estado) ?? fecha(r.venceEl)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {datos.paginas > 1 && (
            <div className="flex items-center justify-between mt-5">
              <p className="font-body text-white/40 text-xs">
                {datos.total} evaluaciones · página {datos.pagina} de {datos.paginas}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPagina((p) => Math.max(1, p - 1))}
                  disabled={datos.pagina <= 1}
                  className="p-2 rounded-lg border border-white/15 text-white/60 hover:text-gold hover:border-gold/40 disabled:opacity-30 disabled:hover:text-white/60 disabled:hover:border-white/15"
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setPagina((p) => Math.min(datos.paginas, p + 1))}
                  disabled={datos.pagina >= datos.paginas}
                  className="p-2 rounded-lg border border-white/15 text-white/60 hover:text-gold hover:border-gold/40 disabled:opacity-30 disabled:hover:text-white/60 disabled:hover:border-white/15"
                  aria-label="Página siguiente"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
