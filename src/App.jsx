import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Autoevaluacion from './pages/Autoevaluacion'
import JobDescriptionPage from './pages/JobDescriptionPage'
import ComunidadUbuntu from './pages/ComunidadUbuntu'
import GimnasioLiderazgo from './pages/GimnasioLiderazgo'

function App() {
  return (
    <div className="min-h-screen">
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/job-description" element={<JobDescriptionPage />} />
        <Route path="/comunidad-ubuntu" element={<ComunidadUbuntu />} />
        <Route path="/gimnasio-liderazgo" element={<GimnasioLiderazgo />} />
        <Route path="/autoevaluacion" element={<Autoevaluacion />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
