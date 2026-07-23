import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Maneja el scroll en cada navegación:
 *  - Si la URL tiene un hash (ej. /#contacto), hace scroll a esa sección.
 *    Reintenta unos instantes porque la página destino puede seguir montándose
 *    (ej. venís de /servicios y navegás a una sección del home).
 *  - Si no hay hash, vuelve al tope de la página.
 *
 * Va montado una sola vez en App, así funciona para TODOS los links del sitio
 * sin tener que manejar el scroll link por link.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      let tries = 0
      const scroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else if (tries++ < 12) {
          setTimeout(scroll, 60)
        }
      }
      scroll()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, key])

  return null
}
