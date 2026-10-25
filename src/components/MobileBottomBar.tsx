import React from 'react';
import { Calendar } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface MobileBottomBarProps {
  onOpenBooking: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  return (
    <div
      data-sector="SECTOR 14b: Barra Móvil de Acceso Rápido"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-white/95 backdrop-blur-md border-t border-[#E7D5DB] shadow-lg flex items-center gap-2"
    >
      <a
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-sm active:scale-95 transition-all"
      >
        <WhatsAppIcon className="w-4 h-4 shrink-0" />
        <span>WhatsApp</span>
      </a>

      <button
        onClick={onOpenBooking}
        className="flex-[1.4] flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#1A1A1A] text-white font-bold text-xs shadow-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] active:scale-95 transition-all cursor-pointer"
      >
        <Calendar className="w-4 h-4 text-[#F4A7C1]" />
        <span>Reservar Turno</span>
      </button>
    </div>
  );
};
