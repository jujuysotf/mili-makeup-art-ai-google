import React from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Instagram,
  Facebook,
  Phone,
  MapPin,
  Clock,
  Heart,
  Calendar,
} from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer
      data-sector="SECTOR 12: Pie de Página"
      className="bg-[#1A1A1A] text-white pt-16 pb-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Columna 1: Marca y descripción */}
          <div className="space-y-4">
            <div className="bg-white/90 p-2.5 rounded-xl inline-block">
              <Logo size="md" showSubtitle={false} />
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Studio de maquillaje profesional y atención personalizada por <strong className="text-white font-medium">{BUSINESS_INFO.owner}</strong> en San Miguel de Tucumán y a domicilio.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F4A7C1] text-[#1A1A1A] text-xs font-bold hover:bg-white transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reservar turno online</span>
              </button>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Secciones
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <a href="#inicio" className="hover:text-[#F4A7C1] transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-[#F4A7C1] transition-colors">Servicios de Maquillaje</a>
              </li>
              <li>
                <a href="#videos" className="hover:text-[#F4A7C1] transition-colors">Reels & Backstage</a>
              </li>
              <li>
                <a href="#trabajos" className="hover:text-[#F4A7C1] transition-colors">Trabajos Realizados</a>
              </li>
              <li>
                <a href="#escuela" className="hover:text-[#F4A7C1] transition-colors">Escuela de Maquillaje</a>
              </li>
              <li>
                <a href="#magazine" className="hover:text-[#F4A7C1] transition-colors">Magazine & Tips</a>
              </li>
              <li>
                <a href="#acerca-de" className="hover:text-[#F4A7C1] transition-colors">Acerca de Milagros Arce</a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-[#F4A7C1] transition-colors">Ubicación & FAQs</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información & Horarios */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Atención
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F4A7C1] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.schedule}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4A7C1] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <WhatsAppIcon className="w-4 h-4 shrink-0 mt-0.5" />
                <span>WhatsApp: {BUSINESS_INFO.phoneDisplay}</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Redes Sociales
            </h4>
            <p className="text-xs text-white/70 mb-4">
              Seguinos en Instagram para ver las publicaciones del día a día y tutoriales:
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={BUSINESS_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#F4A7C1]" />
                <span className="font-semibold">{BUSINESS_INFO.instagramHandle}</span>
              </a>

              {/* Redes de ejemplo con etiqueta interna como requiere el documento */}
              <a
                href={BUSINESS_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/80 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Facebook Oficial</span>
              </a>

              <a
                href={BUSINESS_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/80 transition-colors"
              >
                <span className="w-4 h-4 flex items-center justify-center font-bold text-pink-400 text-xs">tt</span>
                <span>TikTok Oficial</span>
              </a>
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.name} · Milagros Arce. Todos los derechos reservados. San Miguel de Tucumán.
          </p>
          <p className="flex items-center gap-1">
            Diseñado con <Heart className="w-3.5 h-3.5 text-[#F4A7C1] fill-current" /> para realzar tu belleza.
          </p>
        </div>
      </div>
    </footer>
  );
};
