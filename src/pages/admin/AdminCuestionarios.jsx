import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, Pencil } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'

export default function AdminCuestionarios() {
  const [estado, setEstado] = useState('cargando')
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .assessments()
      .then((d) => {
        setItems(d)
        setEstado('ok')
      })
      .catch((e) => {
        setError(e.message)
        setEstado('error')
      })
  }, [])

  return (
    <div className="max-w-4xl">
      <h1 className="font-display font-bold text-white text-2xl mb-2">Cuestionarios</h1>
      <p className="font-body text-white/50 text-sm mb-8">
        Editá las preguntas y los textos de devolución. Los cambios se ven en el sitio al instante.
      </p>

      {estado === 'cargando' && (
        <p className="flex items-center gap-2 font-body text-white/60 text-sm">
          <Loader2 className="animate-spin" size={16} /> Cargando…
        </p>
      )}

      {estado === 'error' && (
        <p role="alert" className="font-body text-rose-400 text-sm">{error}</p>
      )}

      {estado === 'ok' && (
        <div className="flex flex-col gap-3">
          {items.map((a) => (
            <Link
              key={a.key}
              to={`/admin/cuestionarios/${a.key}`}
              className="group rounded-xl border border-white/10 bg-white/3 p-5 hover:border-gold/40 transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-body font-semibold text-white text-sm mb-1">{a.title}</p>
                  <p className="font-body text-white/45 text-xs">
                    {a.pilares} pilares · {a.preguntas} preguntas
                    {!a.activo && <span className="text-amber-400"> · inactivo</span>}
                  </p>
                  <p className="font-body text-white/30 text-xs mt-1.5">
                    Última edición: {new Date(a.updatedAt).toLocaleString('es-AR')}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 font-body text-xs text-white/40 group-hover:text-gold transition-colors shrink-0">
                  <Pencil size={14} /> Editar
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
