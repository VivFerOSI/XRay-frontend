import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ResultadoStressTest from '@/components/ResultadoStressTest'
import Invitar360 from '@/components/Invitar360'
import { stressTestApi } from '@/lib/stressTestApi'

/**
 * Informe permanente del Stress Test: `/autoevaluacion/resultado/:id`.
 * Es el enlace que va en el correo de devolución, para volver a ver el
 * diagnóstico completo (con radar y descarga en PDF) cuando quieras.
 */
export default function ResultadoCompartido() {
  const { id } = useParams()
  const [state, setState] = useState('loading') // loading|ok|error
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    stressTestApi
      .submission(id)
      .then((d) => {
        setData(d)
        setState('ok')
        window.scrollTo(0, 0)
      })
      .catch((e) => {
        setError(e.message)
        setState('error')
      })
  }, [id])

  return (
    <main className="relative bg-navy-deep min-h-screen overflow-hidden">
      <div className="absolute -top-24 -right-40 w-120 h-120 rounded-full bg-navy-mid/20 blur-3xl pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-8 pt-36 pb-28">

        {state === 'loading' && (
          <div className="flex items-center gap-3 text-white/60 font-body">
            <Loader2 className="animate-spin" size={18} /> Cargando tu informe…
          </div>
        )}

        {state === 'error' && (
          <div className="no-print">
            <h1 className="font-display font-bold text-white text-2xl mb-3">No encontramos ese informe</h1>
            <p className="font-body text-white/60 text-sm mb-8">
              {error} El enlace puede estar incompleto o el informe ya no estar disponible.
            </p>
            <Button
              asChild
              className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm"
            >
              <Link to="/autoevaluacion">Hacer la autoevaluación</Link>
            </Button>
          </div>
        )}

        {state === 'ok' && data && (
          <>
            <ResultadoStressTest
              result={data.result}
              nombreEmprendimiento={data.nombreEmprendimiento}
              fecha={data.createdAt}
            />
            <Invitar360 submissionId={data.id} />
          </>
        )}
      </div>
    </main>
  )
}
