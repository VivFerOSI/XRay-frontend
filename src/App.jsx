import { lazy, Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Autoevaluacion from './pages/Autoevaluacion'
import ResultadoCompartido from './pages/ResultadoCompartido'
import EvaluacionTercero from './pages/EvaluacionTercero'
import JobDescriptionPage from './pages/JobDescriptionPage'
import ComunidadUbuntu from './pages/ComunidadUbuntu'
import GimnasioLiderazgo from './pages/GimnasioLiderazgo'
import { ADMIN_VISIBLE } from './lib/flags'

// El panel se carga sólo cuando se entra: es código que la mayoría de las
// visitas nunca usa y no tiene por qué viajar en el bundle del sitio.
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminCuestionarios = lazy(() => import('./pages/admin/AdminCuestionarios'))
const AdminEditarCuestionario = lazy(() => import('./pages/admin/AdminEditarCuestionario'))
const AdminResultados = lazy(() => import('./pages/admin/AdminResultados'))
const AdminDetalleResultado = lazy(() => import('./pages/admin/AdminDetalleResultado'))
const AdminEvaluaciones360 = lazy(() => import('./pages/admin/AdminEvaluaciones360'))
const AdminDetalle360 = lazy(() => import('./pages/admin/AdminDetalle360'))

/** Sitio público: navbar y pie alrededor de cada página. */
function SitioPublico() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

function Cargando() {
  return <div className="min-h-screen bg-navy-deep" />
}

function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<Cargando />}>
        <Routes>
          {/* Panel de administración: sin la navegación del sitio.
              Mientras no esté publicado, las rutas no existen y /admin cae en
              el sitio: que se dibuje el login ya delataría que el panel está. */}
          {ADMIN_VISIBLE && (
            <>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/cuestionarios" replace />} />
                <Route path="cuestionarios" element={<AdminCuestionarios />} />
                <Route path="cuestionarios/:key" element={<AdminEditarCuestionario />} />
                <Route path="resultados" element={<AdminResultados />} />
                <Route path="resultados/:id" element={<AdminDetalleResultado />} />
                <Route path="evaluaciones-360" element={<AdminEvaluaciones360 />} />
                <Route path="evaluaciones-360/:submissionId" element={<AdminDetalle360 />} />
              </Route>
            </>
          )}

          {/* Sitio público */}
          <Route element={<SitioPublico />}>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/job-description" element={<JobDescriptionPage />} />
            <Route path="/comunidad-ubuntu" element={<ComunidadUbuntu />} />
            <Route path="/gimnasio-liderazgo" element={<GimnasioLiderazgo />} />
            <Route path="/autoevaluacion" element={<Autoevaluacion />} />
            <Route path="/autoevaluacion/resultado/:id" element={<ResultadoCompartido />} />
            <Route path="/autoevaluacion/:key" element={<Autoevaluacion />} />
            <Route path="/evaluacion/:token" element={<EvaluacionTercero />} />
          </Route>

          {/* Atajos para repartir en flyers y mensajes: más cortos de leer y de
              dictar que la ruta real, que además nombra al cuestionario de la
              Persona Evaluada por su clave interna (`lider`). */}
          <Route path="/evaluador" element={<Navigate to="/autoevaluacion/evaluador" replace />} />
          <Route path="/persona-evaluada" element={<Navigate to="/autoevaluacion/lider" replace />} />
          <Route path="/emprendedor" element={<Navigate to="/autoevaluacion" replace />} />

          {/* Cualquier otra dirección va al inicio. Firebase sirve el index
              para todo, así que sin esto una URL mal escrita —o /admin con el
              panel todavía sin publicar— deja la pantalla en blanco. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
