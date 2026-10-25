import React, { useState, useEffect } from 'react';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, Sparkles } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Mostrar tooltip a los 2 segundos
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside
      data-sector="SECTOR 14: Botón Flotante WhatsApp"
      aria-label="Contacto por WhatsApp"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto select-none"
    >
      {/* Globo de Diálogo de Milagros (sin mini botón redundante) */}
      {showTooltip && (
        <div className="relative bg-white rounded-2xl p-4 shadow-2xl border border-[#E7D5DB] max-w-xs animate-fade-in-up cursor-pointer group">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-2.5 right-2.5 text-[#5C5558] hover:text-[#1A1A1A] p-1 rounded-full hover:bg-[#FBF4F6] transition-colors cursor-pointer z-10"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 pr-4"
          >
            <div className="w-9 h-9 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#F4A7C1] transition-colors">
              <Sparkles className="w-4 h-4 text-[#F4A7C1]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <span>Milagros Arce</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </p>
              <p className="text-[11px] text-[#5C5558] mt-1 leading-snug group-hover:text-[#1A1A1A] transition-colors">
                ¿Tenés dudas o querés consultar por una fecha? ¡Escribime directo acá por WhatsApp!
              </p>
            </div>
          </a>

          {/* Triángulo inferior del globo que apunta al botón circular */}
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-b border-r border-[#E7D5DB] rotate-45" />
        </div>
      )}

      {/* Botón Flotante Circular: Únicamente el ícono oficial de WhatsApp sin texto alguno */}
      <a
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Escribir por WhatsApp a Milagros Arce"
        title="WhatsApp"
      >
        <WhatsAppIcon className="w-14 h-14 drop-shadow-sm" />
      </a>
    </aside>
  );
};
