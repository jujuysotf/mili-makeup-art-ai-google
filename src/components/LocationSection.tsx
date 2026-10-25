import React, { useState } from 'react';
import { BUSINESS_INFO, FAQS_DATA } from '../data/content';
import {
  MapPin,
  Home,
  Navigation,
  Clock,
  ChevronDown,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <section
      id="ubicacion"
      data-sector="SECTOR 10: Ubicación Google Maps y FAQs"
      className="py-20 lg:py-28 bg-[#FBF4F6]/50 border-t border-[#E7D5DB]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#F4A7C1]" />
            <span>Estudio & Atención a Domicilio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Ubicación & Modalidades
          </h2>
          <p className="mt-3 text-base text-[#5C5558]">
            Encontranos en nuestro estudio en San Miguel de Tucumán o coordiná tu servicio a domicilio.
          </p>
        </div>

        {/* Bloque Mapa y Detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Mapa Embebido */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-[#E7D5DB] shadow-sm min-h-[380px] relative">
            <iframe
              src={BUSINESS_INFO.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Milimakeupart en General Paz 1060, San Miguel de Tucumán"
              className="w-full h-full"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-[#E7D5DB] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F4A7C1]" />
              <span className="text-xs font-bold text-[#1A1A1A]">
                {BUSINESS_INFO.shortAddress}
              </span>
            </div>
          </div>

          {/* Tarjeta de Información de Atención */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-8 border border-[#E7D5DB] shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">
                  ¿Cómo atendemos?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#5C5558] leading-relaxed">
                  Para brindarte la mayor tranquilidad y un acabado perfecto, ofrecemos dos opciones adaptadas a tu evento:
                </p>
              </div>

              {/* Modalidad 1: Estudio */}
              <div className="p-4 rounded-2xl bg-[#FBF4F6] border border-[#E7D5DB]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-[#1A1A1A] border border-[#E7D5DB] shrink-0">
                    <MapPin className="w-4 h-4 text-[#F4A7C1]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">
                      En el Estudio (Tucumán Capital)
                    </h4>
                    <p className="mt-1 text-xs text-[#5C5558] leading-relaxed">
                      {BUSINESS_INFO.address}. Espacio climatizado, equipado con espejos con luz neutra, sillón ergonómico y esterilización completa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modalidad 2: A Domicilio */}
              <div className="p-4 rounded-2xl bg-[#FBF4F6] border border-[#E7D5DB]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-[#1A1A1A] border border-[#E7D5DB] shrink-0">
                    <Home className="w-4 h-4 text-[#F4A7C1]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">
                      Servicio a Domicilio / Hotel
                    </h4>
                    <p className="mt-1 text-xs text-[#5C5558] leading-relaxed">
                      Milagros se traslada con su valija profesional completa a tu domicilio en San Miguel de Tucumán y alrededores para que disfrutes de tu previa sin traslados.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#5C5558]">
                <Clock className="w-4 h-4 text-[#F4A7C1] shrink-0" />
                <span>Horarios: <strong>09:00 a 22:00 hs</strong> (Lunes a Domingo con turno previo)</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7D5DB]">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#1A1A1A] text-white text-xs sm:text-sm font-semibold hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Cómo llegar en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Sección de Preguntas Frecuentes (FAQs) */}
        <div className="max-w-3xl mx-auto pt-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#F4A7C1]" />
              <span>Dudas Comunes</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              Preguntas Frecuentes
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E7D5DB] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#1A1A1A] hover:text-[#F4A7C1] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#5C5558] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#F4A7C1]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C5558] leading-relaxed border-t border-[#E7D5DB]/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
