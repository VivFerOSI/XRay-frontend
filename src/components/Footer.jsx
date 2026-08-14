import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import logoXray from '../assets/logo-xray-blanco.png'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

const XRayLogo = () => (
  <img src={logoXray} alt="X-Ray" className="h-9 w-auto" />
)

export default function Footer() {
  return (
    <footer className="bg-navy-deep pt-16 pb-8 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <XRayLogo />
          <p className="font-display italic text-white/60 text-sm mt-4 leading-relaxed">
            "Ver a través, diagnosticar, y moverse con propósito."
          </p>
        </div>

        <div>
          <p className="font-body font-bold text-gold tracking-widest text-xs mb-5">NAVEGACIÓN</p>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'Nosotros', href: '/#quienes-somos' },
              { label: 'Servicios', href: '/servicios' },
              { label: 'Job Description', href: '/#job-description' },
              { label: 'Contacto', href: '/#contacto' },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="font-body text-white/70 hover:text-gold transition-colors duration-200 text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-body font-bold text-gold tracking-widest text-xs mb-5">CONTACTO</p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:servicios@x-ray.ar"
              className="flex items-center gap-2 font-body text-white/70 hover:text-gold transition-colors duration-200 text-sm"
            >
              <Mail size={14} />
              servicios@x-ray.ar
            </a>
            <a
              href="https://wa.me/5491176764601"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-white/70 hover:text-gold transition-colors duration-200 text-sm"
            >
              <Phone size={14} />
              +54 11 7676 4601
            </a>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.instagram.com/xraygenera/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://x.com/XRay_genera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors duration-200"
                aria-label="X / Twitter"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.622 5.906-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-body text-white/40 text-xs">
          © 2026 <span className="text-gold font-semibold">X-Ray</span> Consultoría Organizacional · Buenos Aires, Argentina
        </p>
        <p className="font-body text-white/40 text-xs">
          Eficiencia técnica · Profundidad filosófica
        </p>
      </div>
    </footer>
  )
}
