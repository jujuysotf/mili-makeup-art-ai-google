import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import { ServiceCategory, ServiceItem } from '../types';
import { getServiceInquiryUrl } from '../utils/whatsapp';
import {
  Clock,
  Sparkles,
  Home,
  Check,
  Calendar,
  MessageCircle,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory | 'todos'>('todos');

  const categories: { id: ServiceCategory | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todos los servicios' },
    { id: 'eventos', label: 'Eventos & Fiestas' },
    { id: 'novias', label: 'Novias' },
    { id: 'producciones', label: 'Producciones & Arte' },
    { id: 'formacion', label: 'Formación & Peinado' },
  ];

  const filteredServices = activeTab === 'todos'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeTab);

  return (
    <section id="servicios" className="py-20 lg:py-28 bg-[#FBF4F6]/60 border-t border-b border-[#E7D5DB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F4A7C1]" />
            <span>Catálogo Profesional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Servicios de Maquillaje
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5C5558]">
            Elegí la propuesta perfecta para tu ocasión. Atención en estudio en General Paz 1060 o a domicilio en San Miguel de Tucumán.
          </p>

          {/* Filtros por Categoría */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white shadow-sm'
                      : 'bg-white text-[#5C5558] border border-[#E7D5DB] hover:text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grilla de Tarjetas de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7D5DB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-[#F4A7C1]"
            >
              <div>
                {/* Header Card: Categoría y Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#5C5558]">
                    {service.categoryLabel}
                  </span>
                  {service.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] text-[10px] font-bold text-[#1A1A1A]">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#F4A7C1] transition-colors">
                  {service.name}
                </h3>

                {/* Ocasión sugerida */}
                <p className="text-xs text-[#5C5558] mt-1 italic">
                  Para: {service.occasion}
                </p>

                {/* Info de Duración y Modalidad */}
                <div className="mt-4 pt-3 border-t border-[#E7D5DB]/60 flex items-center justify-between text-xs text-[#1A1A1A]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#F4A7C1]" />
                    <span>{service.durationMinutes} minutos aprox.</span>
                  </span>

                  <span className="flex items-center gap-1 text-[#5C5558]">
                    <Home className="w-3.5 h-3.5 text-[#F4A7C1]" />
                    <span>Estudio o Domicilio</span>
                  </span>
                </div>

                {/* Descripción breve */}
                <p className="mt-4 text-xs sm:text-sm text-[#5C5558] leading-relaxed">
                  {service.description}
                </p>

                {/* Qué incluye */}
                <div className="mt-5 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Qué incluye:
                  </p>
                  <ul className="space-y-1.5">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#5C5558]">
                        <Check className="w-3.5 h-3.5 text-[#F4A7C1] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="mt-8 pt-5 border-t border-[#E7D5DB]/60 flex flex-col gap-2.5">
                <button
                  onClick={() => onSelectService(service)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#1A1A1A] text-white font-semibold text-xs sm:text-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-all duration-200 cursor-pointer shadow-sm active:scale-98"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reservar este servicio</span>
                </button>

                <a
                  href={getServiceInquiryUrl(service.name, service.durationMinutes)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs text-[#5C5558] hover:text-[#1A1A1A] hover:bg-[#FBF4F6] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Consultar detalles por WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
