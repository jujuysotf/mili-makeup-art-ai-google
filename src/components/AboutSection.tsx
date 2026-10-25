import React, { useState } from 'react';
import { ABOUT_TEXT, BUSINESS_INFO } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, MapPin, Check, ChevronDown, ChevronUp } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  return (
    <section
      id="acerca-de"
      data-sector="SECTOR 8: Acerca de Milagros Arce"
      className="py-16 sm:py-24 bg-[#FBF4F6]/60 border-t border-b border-[#E7D5DB]/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Columna Fotos de Proceso */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <ImageWithFallback
                  src="/assets/CD-2.jpg"
                  alt="Milagros Arce trabajando en maquillaje profesional"
                  fallbackTitle="Milagros Arce en Estudio"
                  fallbackCategory="Backstage & Proceso"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Foto Secundaria Flotante */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-36 aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <ImageWithFallback
                  src="/assets/CD-13.jpg"
                  alt="Detalle de precisión en maquillaje"
                  fallbackTitle="Precisión & Técnica"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge Ciudad */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm border border-[#E7D5DB] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F4A7C1]" />
                <span className="text-xs font-bold text-[#1A1A1A]">
                  Tucumán Capital
                </span>
              </div>
            </div>
          </div>

          {/* Columna Texto & Biografía */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A7C1]" />
              <span>Conocé a la Profesional</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              {ABOUT_TEXT.headline}
            </h2>

            {/* Párrafo Principal Visible */}
            <p className="mt-4 text-sm sm:text-base text-[#5C5558] leading-relaxed">
              {ABOUT_TEXT.bio[0]}
            </p>

            {/* Botón Ver Más / Ocultar para los párrafos complementarios */}
            <div className="mt-3">
              <button
                onClick={() => setIsBioExpanded(!isBioExpanded)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1A1A1A] hover:text-[#F4A7C1] transition-colors cursor-pointer py-1"
              >
                <span>{isBioExpanded ? 'Ocultar biografía' : 'Conocer más de mi trayectoria (+)'}</span>
                {isBioExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#F4A7C1]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#F4A7C1]" />
                )}
              </button>

              {isBioExpanded && (
                <div className="mt-3 space-y-3 text-sm text-[#5C5558] leading-relaxed animate-fade-in bg-white/70 p-4 rounded-2xl border border-[#E7D5DB]/60">
                  <p>{ABOUT_TEXT.bio[1]}</p>
                  <p>{ABOUT_TEXT.bio[2]}</p>
                </div>
              )}
            </div>

            {/* Cita Destacada Breve */}
            <blockquote className="mt-5 p-4 rounded-2xl bg-white border-l-4 border-[#F4A7C1] shadow-2xs italic text-[#1A1A1A] text-xs sm:text-sm">
              {ABOUT_TEXT.quote}
              <footer className="mt-1.5 text-[11px] font-bold not-italic text-[#5C5558] tracking-wider uppercase">
                — {BUSINESS_INFO.owner} · {BUSINESS_INFO.name}
              </footer>
            </blockquote>

            {/* 3 Pilares en Fichas Compactas */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ABOUT_TEXT.features.map((feat, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white border border-[#E7D5DB] shadow-2xs">
                  <h4 className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#F4A7C1] shrink-0" />
                    <span>{feat.title}</span>
                  </h4>
                  <p className="mt-1 text-[11px] text-[#5C5558] leading-tight">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
