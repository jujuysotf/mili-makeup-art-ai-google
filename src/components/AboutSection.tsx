import React from 'react';
import { ABOUT_TEXT, BUSINESS_INFO } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, Heart, Award, MapPin, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="acerca-de" className="py-20 lg:py-28 bg-[#FBF4F6]/50 border-t border-b border-[#E7D5DB]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Columna Fotos de Proceso */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Foto Principal de Proceso */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="/assets/CD-2.jpg"
                  alt="Milagros Arce trabajando en maquillaje profesional"
                  fallbackTitle="Milagros Arce en Estudio"
                  fallbackCategory="Backstage & Proceso"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Foto Secundaria Superpuesta */}
              <div className="hidden sm:block absolute -bottom-8 -right-8 w-44 aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <ImageWithFallback
                  src="/assets/CD-13.jpg"
                  alt="Detalle de precisión en maquillaje"
                  fallbackTitle="Precisión & Técnica"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge de Ciudad */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#E7D5DB] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F4A7C1]" />
                <span className="text-xs font-bold text-[#1A1A1A]">
                  San Miguel de Tucumán
                </span>
              </div>
            </div>
          </div>

          {/* Columna Texto & Biografía */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A7C1]" />
              <span>Conocé a la Profesional</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              {ABOUT_TEXT.headline}
            </h2>

            <div className="mt-6 space-y-4 text-base text-[#5C5558] leading-relaxed">
              {ABOUT_TEXT.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Cita Destacada */}
            <blockquote className="mt-6 p-5 rounded-2xl bg-white border-l-4 border-[#F4A7C1] shadow-sm italic text-[#1A1A1A] text-sm sm:text-base">
              {ABOUT_TEXT.quote}
              <footer className="mt-2 text-xs font-bold not-italic text-[#5C5558] tracking-wider uppercase">
                — {BUSINESS_INFO.owner} · Creadora de {BUSINESS_INFO.name}
              </footer>
            </blockquote>

            {/* Pilares */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ABOUT_TEXT.features.map((feat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-[#E7D5DB]">
                  <h4 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#F4A7C1] shrink-0" />
                    <span>{feat.title}</span>
                  </h4>
                  <p className="mt-1.5 text-xs text-[#5C5558] leading-normal">
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
