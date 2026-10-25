import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../data/content';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle, X, Sparkles } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Tooltip / Globo de ayuda */}
      {showTooltip && (
        <div className="relative bg-white rounded-2xl p-3.5 shadow-2xl border border-[#E7D5DB] max-w-xs animate-fade-in-up">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-[#5C5558] hover:text-[#1A1A1A] p-0.5"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-2.5 pr-4">
            <div className="w-7 h-7 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#F4A7C1]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1A1A]">
                ¡Hola! Soy Milagros Arce ✨
              </p>
              <p className="text-[11px] text-[#5C5558] mt-0.5 leading-snug">
                ¿Tenés dudas o querés consultar por una fecha? ¡Escribime acá por WhatsApp!
              </p>
            </div>
          </div>
          {/* Triángulo inferior del globo */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-[#E7D5DB] rotate-45" />
        </div>
      )}

      {/* Botón flotante verde de WhatsApp */}
      <a
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 group relative"
        aria-label="Escribir por WhatsApp a Milagros Arce"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </div>
  );
};
