import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader2, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { adminApi } from '@/lib/adminApi'

const inputClass =
  'border-0 border-b-2 border-white/15 rounded-none bg-transparent shadow-none ' +
  'focus-visible:ring-0 focus-visible:border-gold text-white placeholder:text-white/25 ' +
  'font-body h-12 px-0 transition-colors duration-200'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  async function entrar(e) {
    e.preventDefault()
    setError('')
    setEnviando(true)
    try {
      await adminApi.login(email.trim(), password)
      navigate(location.state?.from ?? '/admin/cuestionarios', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="min-h-screen bg-navy-deep flex items-center justify-center px-6">
      <form onSubmit={entrar} className="w-full max-w-sm">
        <p className="font-display font-bold text-white text-2xl mb-1">
          X<span className="text-gold">-</span>RAY
        </p>
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-gold mb-10">
          Administración
        </p>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-body text-[11px] text-white/40 tracking-widest uppercase">
              Usuario
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="servicios1@x-ray.ar"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-body text-[11px] text-white/40 tracking-widest uppercase">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="font-body text-rose-400 text-sm mt-6">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={!email.trim() || !password || enviando}
          className="bg-gold text-white hover:bg-gold/90 border-0 rounded-full px-8 h-12 font-body font-semibold text-sm gap-2 mt-10 w-full disabled:opacity-40"
        >
          {enviando ? (
            <><Loader2 className="animate-spin" size={16} /> Entrando…</>
          ) : (
            <>Entrar <LogIn size={16} /></>
          )}
        </Button>
      </form>
    </main>
  )
}
