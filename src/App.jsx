import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Autoevaluacion from './pages/Autoevaluacion'

function App() {
  return (
    <div className="min-h-screen">
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/autoevaluacion" element={<Autoevaluacion />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
