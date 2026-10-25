import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Calendar,
  Clock,
  MapPin,
  Menu,
  X,
  Phone,
  Instagram,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section spy
      const sections = ['inicio', 'servicios', 'trabajos', 'videos', 'escuela', 'magazine', 'acerca-de', 'opiniones', 'contacto'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio', id: 'inicio' },
    { label: 'Servicios', href: '#servicios', id: 'servicios' },
    { label: 'Trabajos', href: '#trabajos', id: 'trabajos' },
    { label: 'Videos', href: '#videos', id: 'videos' },
    { label: 'Escuela', href: '#escuela', id: 'escuela' },
    { label: 'Magazine', href: '#magazine', id: 'magazine' },
    { label: 'Acerca de', href: '#acerca-de', id: 'acerca-de' },
    { label: 'Opiniones', href: '#opiniones', id: 'opiniones' },
    { label: 'Contacto', href: '#contacto', id: 'contacto' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      data-sector="SECTOR 1: Encabezado y Navegación"
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
    >
      {/* Top Banner Informativo (Visible en desktop) */}
      <div className="hidden lg:block bg-[#1A1A1A] text-white/90 text-xs py-1.5 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/80">
              <Clock className="w-3.5 h-3.5 text-[#F4A7C1]" />
              <span>Atención 09:00 a 22:00 hs (Todos los días)</span>
            </span>
            <span className="flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#F4A7C1]" />
              <span>Gral. Paz 1060, San Miguel de Tucumán & A Domicilio</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`https://wa.me/${BUSINESS_INFO.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/90 hover:text-[#F4A7C1] transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href={BUSINESS_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/90 hover:text-[#F4A7C1] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#F4A7C1]" />
              <span>{BUSINESS_INFO.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E7D5DB] py-2'
            : 'bg-white/90 backdrop-blur-sm border-b border-[#E7D5DB]/60 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Links Desktop */}
          <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-[#1A1A1A]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative py-1 transition-colors duration-150 cursor-pointer ${
                    isActive ? 'text-[#1A1A1A] font-semibold' : 'text-[#5C5558] hover:text-[#1A1A1A]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F4A7C1] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A1A] text-white text-sm font-semibold shadow-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar turno</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#1A1A1A] hover:bg-[#FBF4F6] transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[60px] bg-white border-b border-[#E7D5DB] shadow-xl p-6 transition-all duration-300">
          <div className="flex flex-col gap-3">
            <div className="pb-3 mb-2 border-b border-[#E7D5DB]/60 flex items-center justify-between text-xs text-[#5C5558]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#F4A7C1]" /> 09:00 a 22:00 hs
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F4A7C1]" /> Tucumán
              </span>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center justify-between py-2 text-left text-base font-medium text-[#1A1A1A] hover:text-[#F4A7C1] transition-colors"
              >
                <span>{link.label}</span>
                {activeSection === link.id && (
                  <span className="w-2 h-2 rounded-full bg-[#F4A7C1]" />
                )}
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-[#E7D5DB] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#1A1A1A] text-white font-semibold text-sm shadow hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservar turno ahora</span>
              </button>

              <div className="flex justify-center gap-6 pt-2 text-xs text-[#5C5558]">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#1A1A1A] font-medium"
                >
                  <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href={BUSINESS_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#1A1A1A]"
                >
                  <Instagram className="w-4 h-4 text-[#F4A7C1]" /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
