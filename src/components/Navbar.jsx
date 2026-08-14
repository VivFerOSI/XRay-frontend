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
import logoXray from '../assets/logo-xray-blanco.png'

const XRayLogo = () => (
  <img src={logoXray} alt="X-Ray" className="h-14 w-auto" />
)

const navLinks = [
  { label: 'Nosotros', href: '/#quienes-somos' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Job Description', href: '/job-description' },
  { label: 'Comunidad Ubuntu', href: '/comunidad-ubuntu' },
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
                <Link to="/#contacto">Contacto</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
