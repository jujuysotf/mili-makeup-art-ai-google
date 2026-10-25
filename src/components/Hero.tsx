import React from 'react';
import { BUSINESS_INFO } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';
import { Calendar, Sparkles, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  return (
    <section
      id="inicio"
      data-sector="SECTOR 2: Portada y Hero"
      className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden bg-white"
    >
      {/* Decorative background subtle gradients */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#FBF4F6] rounded-full filter blur-3xl opacity-70 pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#F4E3E8] rounded-full filter blur-3xl opacity-50 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Columna Texto */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tag superior */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F4A7C1] animate-pulse" />
              <span>Maquillaje Profesional · San Miguel de Tucumán</span>
            </div>

            {/* Titular */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.15]">
              Realzamos tu belleza con{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#1A1A1A] italic font-serif">piel luminosa</span>
                <span className="absolute bottom-1.5 left-0 w-full h-3 bg-[#F4A7C1]/50 -z-0 rounded-sm" />
              </span>{' '}
              y fijación que dura toda la noche.
            </h1>

            {/* Subtítulo */}
            <p className="mt-6 text-lg sm:text-xl text-[#5C5558] max-w-2xl leading-relaxed">
              Atención personalizada por <strong className="text-[#1A1A1A] font-semibold">{BUSINESS_INFO.owner}</strong>. Maquillaje social, novias, quinceañeras y producciones en estudio o en la comodidad de tu casa.
            </p>

            {/* Call To Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1A1A1A] text-white font-semibold text-base shadow-lg shadow-black/10 hover:bg-[#F4A7C1] hover:text-[#1A1A1A] active:scale-98 transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Reservar turno</span>
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FBF4F6] text-[#1A1A1A] font-semibold text-base border border-[#E7D5DB] hover:bg-white hover:border-[#1A1A1A] transition-all duration-200 cursor-pointer"
              >
                <span>Ver servicios</span>
                <ArrowRight className="w-4 h-4 text-[#5C5558]" />
              </button>
            </div>

            {/* Insignias de confianza */}
            <div className="mt-12 pt-8 border-t border-[#E7D5DB]/80 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#5C5558]">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#F4A7C1] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1A1A] font-semibold">Estudio & Domicilio</strong>
                  <span>Gral. Paz 1060 o tu casa</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#F4A7C1] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1A1A] font-semibold">Horario Amplio</strong>
                  <span>09:00 a 22:00 hs</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#F4A7C1] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1A1A] font-semibold">Técnica Blindada</strong>
                  <span>Piel HD de larga duración</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Imagen Principal */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Marco fotográfico con esquinas elegantes */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="/assets/20250823_125100.jpg"
                  alt="Maquillaje Milimakeupart por Milagros Arce"
                  fallbackTitle="Milimakeupart Look"
                  fallbackCategory="Novias & Gala"
                  className="w-full h-full object-cover"
                />

                {/* Badge flotante sobre la imagen */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-[#5C5558] block">
                      Estilismo Profesional
                    </span>
                    <span className="text-sm font-bold text-[#1A1A1A]">
                      Look Novia & Social Glam
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#F4A7C1]" />
                    Mili Arce
                  </span>
                </div>
              </div>

              {/* Tarjeta flotante complementaria */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#E7D5DB] items-center gap-3 max-w-xs animate-bounce-subtle">
                <div className="w-10 h-10 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] flex items-center justify-center text-[#1A1A1A] shrink-0">
                  <MapPin className="w-5 h-5 text-[#F4A7C1]" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-[#1A1A1A]">San Miguel de Tucumán</p>
                  <p className="text-[#5C5558]">General Paz 1060 & a Domicilio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
