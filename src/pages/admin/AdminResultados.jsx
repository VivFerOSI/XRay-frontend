import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { adminApi } from '@/lib/adminApi'

const nivelColor = {
  alto: 'text-emerald-400',
  medio: 'text-lime-400',
  bajo: 'text-amber-400',
  muyBajo: 'text-rose-400',
}

const inputClass =
  'bg-transparent border border-white/15 rounded-lg px-3 h-9 text-white font-body text-sm ' +
  'focus:outline-none focus:border-gold transition-colors duration-150'

export default function AdminResultados() {
  const [filtros, setFiltros] = useState({ assessmentKey: '', desde: '', hasta: '' })
  const [pagina, setPagina] = useState(1)
  const [datos, setDatos] = useState(null)
  const [cuestionarios, setCuestionarios] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [error, setError] = useState('')
  const [descargando, setDescargando] = useState(false)

  useEffect(() => {
    adminApi.assessments().then(setCuestionarios).catch(() => setCuestionarios([]))
  }, [])

  const cargar = useCallback(async () => {
    setEstado('cargando')
    try {
      setDatos(await adminApi.submissions({ ...filtros, pagina, porPagina: 20 }))
      setEstado('ok')
    } catch (e) {
      setError(e.message)
      setEstado('error')
    }
  }, [filtros, pagina])

  useEffect(() => {
    cargar()
  }, [cargar])

  // Al cambiar un filtro se vuelve a la primera página: quedarse en la 3 de un
  // resultado que ahora tiene una sola página muestra una tabla vacía.
  const cambiarFiltro = (campo, valor) => {
    setPagina(1)
    setFiltros((f) => ({ ...f, [campo]: valor }))
  }

  async function descargar() {
    setDescargando(true)
    try {
      await adminApi.descargarCsv(filtros)
    } catch (e) {
      setError(e.message)
    } finally {
      setDescargando(false)
    }
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <h1 className="font-display font-bold text-white text-2xl">Resultados</h1>
        <Button
          onClick={descargar}
          disabled={descargando || !datos?.total}
          className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-5 h-10 font-body font-semibold text-xs gap-2 disabled:opacity-40"
        >
          {descargando ? <Loader2 className="animate-spin" size={14} /> : <Download size={14} />}
          Exportar a Excel
        </Button>
      </div>
      <p className="font-body text-white/50 text-sm mb-6">
        Cada persona que completó una autoevaluación, con sus datos y su puntaje.
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
        <label className="flex items-center gap-2 font-body text-xs text-white/40">
          Desde
          <input type="date" value={filtros.desde} onChange={(e) => cambiarFiltro('desde', e.target.value)} className={inputClass} />
        </label>
        <label className="flex items-center gap-2 font-body text-xs text-white/40">
          Hasta
          <input type="date" value={filtros.hasta} onChange={(e) => cambiarFiltro('hasta', e.target.value)} className={inputClass} />
        </label>
      </div>

      {estado === 'error' && <p role="alert" className="font-body text-rose-400 text-sm mb-4">{error}</p>}

      {estado === 'cargando' && (
        <p className="flex items-center gap-2 font-body text-white/60 text-sm">
          <Loader2 className="animate-spin" size={16} /> Cargando…
        </p>
      )}

      {estado === 'ok' && datos && (
        <>
          {datos.total === 0 ? (
            <p className="font-body text-white/40 text-sm py-10 text-center border border-white/10 rounded-xl">
              No hay resultados con esos filtros.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/3">
                    {['Fecha', 'Persona', 'Organización', 'Cuestionario', 'Puntaje'].map((h) => (
                      <th key={h} className="font-body text-[11px] uppercase tracking-wider text-white/40 px-4 py-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datos.items.map((s) => (
                    <tr key={s.id} className="border-b border-white/5 last:border-0 hover:bg-white/3">
                      <td className="px-4 py-3 font-body text-white/50 text-xs whitespace-nowrap">
                        {new Date(s.createdAt).toLocaleDateString('es-AR')}
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/admin/resultados/${s.id}`} className="font-body text-white text-sm hover:text-gold">
                          {s.nombreContacto}
                        </Link>
                        <p className="font-body text-white/40 text-xs">{s.email}</p>
                      </td>
                      <td className="px-4 py-3 font-body text-white/60 text-sm">
                        {s.nombreEmprendimiento || <span className="text-white/25">—</span>}
                      </td>
                      <td className="px-4 py-3 font-body text-white/50 text-xs">{s.assessmentKey}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Link to={`/admin/resultados/${s.id}`} className="hover:opacity-80">
                          <span className={`font-body font-semibold text-sm ${nivelColor[s.globalLevel] ?? 'text-white'}`}>
                            {s.totalScore}
                          </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {datos.paginas > 1 && (
            <div className="flex items-center justify-between mt-5">
              <p className="font-body text-white/40 text-xs">
                {datos.total} resultados · página {datos.pagina} de {datos.paginas}
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
