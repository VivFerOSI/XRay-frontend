import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const XRayLogo = () => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9">
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
        <circle cx="18" cy="18" r="17" stroke="#C8922A" strokeWidth="1.5" />
        <line x1="6" y1="6" x2="30" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="6" x2="6" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
    <span className="font-display font-bold text-white text-xl tracking-wide">X-Ray</span>
  </div>
)

const navLinks = [
  { label: 'Nosotros', href: '/#quienes-somos' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Job Description', href: '/#job-description' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setSheetOpen(false)
  }, [location])

  const handleAnchorClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.slice(2)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-navy-deep shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <XRayLogo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="font-body text-white hover:text-gold transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-gold bg-transparent text-white hover:bg-gold hover:text-white hover:border-gold font-body text-sm"
          >
            <Link
              to="/#contacto"
              onClick={(e) => handleAnchorClick(e, '/#contacto')}
            >
              Contacto
            </Link>
          </Button>
        </div>

        {/* Mobile: Sheet drawer */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 hover:text-white"
              aria-label="Abrir menú"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-navy-deep border-white/10 w-72"
            showCloseButton={true}
          >
            <SheetHeader className="pb-6">
              <SheetTitle className="text-white font-display text-lg">
                <XRayLogo />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-5 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="font-body text-white hover:text-gold transition-colors duration-200 text-base"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                variant="outline"
                className="rounded-full border-gold bg-transparent text-white hover:bg-gold hover:text-white hover:border-gold font-body mt-4"
              >
                <Link
                  to="/#contacto"
                  onClick={(e) => handleAnchorClick(e, '/#contacto')}
                >
                  Contacto
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
