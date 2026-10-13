import { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ClipboardList, LogOut, Radar, Users } from 'lucide-react'
import { adminApi, getToken, onSesionVencida } from '@/lib/adminApi'

/**
 * Marco del panel: barra lateral y control de sesión.
 *
 * Sin token válido redirige al login; si el backend rechaza el token mientras
 * se navega (venció, se reinició el servidor), `onSesionVencida` trae de vuelta
 * acá sin que la pantalla quede a medio cargar.
 */
export default function AdminLayout() {
  const [autenticado, setAutenticado] = useState(() => !!getToken())
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => onSesionVencida(() => setAutenticado(false)), [])

  if (!autenticado) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  const salir = () => {
    adminApi.logout()
    setAutenticado(false)
    navigate('/admin/login', { replace: true })
  }

  const items = [
    { to: '/admin/cuestionarios', label: 'Cuestionarios', icon: ClipboardList },
    { to: '/admin/resultados', label: 'Resultados', icon: Users },
    { to: '/admin/evaluaciones-360', label: 'Evaluaciones 360°', icon: Radar },
  ]

  return (
    <div className="min-h-screen bg-navy-deep flex flex-col lg:flex-row">
      <aside className="lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-navy-deep">
        <div className="p-6 lg:p-7">
          <p className="font-display font-bold text-white text-xl">
            X<span className="text-gold">-</span>RAY
          </p>
          <p className="font-body text-[10px] tracking-[0.2em] uppercase text-gold mt-1">
            Administración
          </p>
        </div>

        <nav className="flex lg:flex-col gap-1 px-3 pb-3 lg:pb-0 overflow-x-auto">
          {items.map(({ to, label, icon: Icon }) => {
            const activo = location.pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-body text-sm whitespace-nowrap transition-colors duration-150 ${
                  activo
                    ? 'bg-white/8 text-gold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 mt-auto lg:pt-6">
          <button
            onClick={salir}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-body text-sm text-white/45 hover:text-white hover:bg-white/5 transition-colors duration-150 w-full"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  )
}
