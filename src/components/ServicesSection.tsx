import React, { useState, useRef } from 'react';
import { useAutoCarousel } from '../utils/useAutoCarousel';
import { SERVICES_DATA } from '../data/services';
import { ServiceCategory, ServiceItem } from '../types';
import { getServiceInquiryUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Clock,
  Sparkles,
  Home,
  Check,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory | 'todos'>('todos');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const carouselRef = useRef<HTMLDivElement>(null);
  useAutoCarousel(carouselRef, viewMode === 'carousel');

  const categories: { id: ServiceCategory | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'novias', label: 'Novias' },
    { id: 'producciones', label: 'Producciones' },
    { id: 'formacion', label: 'Formación' },
  ];

  const filteredServices = activeTab === 'todos'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeTab);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.85;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="servicios"
      data-sector="SECTOR 3: Catálogo de Servicios"
      className="py-16 sm:py-24 bg-[#FBF4F6]/70 border-t border-b border-[#E7D5DB]/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F4A7C1]" />
            <span>Propuestas de Maquillaje</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Servicios Exclusivos
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#5C5558] max-w-xl mx-auto">
            Tarjetas optimizadas y sin sobrecarga de texto. Podés expandir los detalles de cada look o deslizar para explorar.
          </p>

          {/* Filtros de Categorías y Selector de Vista */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {categories.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
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

            {/* Switch de Modo Vista (Carrusel vs Grilla) */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#E7D5DB] shrink-0">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-[#1A1A1A] text-white shadow-2xs'
                    : 'text-[#5C5558] hover:text-[#1A1A1A]'
                }`}
                title="Ver de a una, deslizando"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Deslizar</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#1A1A1A] text-white shadow-2xs'
                    : 'text-[#5C5558] hover:text-[#1A1A1A]'
                }`}
                title="Vista grilla completa"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grilla</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carrusel Controls (en modo carrusel) */}
        {viewMode === 'carousel' && (
          <div className="flex items-center justify-end gap-2 mb-4">
            <button
              onClick={() => scrollCarousel('left')}
              className="p-2 rounded-full bg-white border border-[#E7D5DB] text-[#1A1A1A] hover:bg-[#FBF4F6] shadow-sm transition-all active:scale-95 cursor-pointer"
              aria-label="Anterior servicio"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="p-2 rounded-full bg-white border border-[#E7D5DB] text-[#1A1A1A] hover:bg-[#FBF4F6] shadow-sm transition-all active:scale-95 cursor-pointer"
              aria-label="Siguiente servicio"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Contenedor de Tarjetas (Carrusel Swipeable o Grilla) */}
        <div
          ref={carouselRef}
          className={
            viewMode === 'carousel'
              ? 'flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-1 px-1 snap-x snap-mandatory scroll-smooth no-scrollbar'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          }
        >
          {filteredServices.map((service) => {
            const isExpanded = !!expandedCards[service.id];

            return (
              <div
                key={service.id}
                className={`bg-white rounded-3xl p-5 sm:p-6 border border-[#E7D5DB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-[#F4A7C1] ${
                  viewMode === 'carousel'
                    ? 'min-w-[85%] sm:min-w-[340px] md:min-w-[360px] max-w-[380px] snap-center shrink-0'
                    : 'w-full'
                }`}
              >
                <div>
                  {/* Header de Tarjeta */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#5C5558]">
                      {service.categoryLabel}
                    </span>
                    {service.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] text-[10px] font-bold text-[#1A1A1A]">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Nombre del Servicio */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] group-hover:text-[#F4A7C1] transition-colors leading-tight">
                    {service.name}
                  </h3>

                  {/* Ocasión breve */}
                  <p className="text-xs text-[#5C5558] mt-1 line-clamp-1 italic">
                    {service.occasion}
                  </p>

                  {/* Métricas: Duración & Modalidad */}
                  <div className="mt-3.5 pt-3 border-t border-[#E7D5DB]/60 flex items-center justify-between text-xs text-[#1A1A1A]">
                    <span className="flex items-center gap-1.5 font-semibold bg-[#FBF4F6] px-2.5 py-1 rounded-full border border-[#E7D5DB]/60">
                      <Clock className="w-3.5 h-3.5 text-[#F4A7C1]" />
                      <span>{service.durationMinutes} min</span>
                    </span>

                    <span className="flex items-center gap-1 text-[11px] text-[#5C5558]">
                      <Home className="w-3.5 h-3.5 text-[#F4A7C1]" />
                      <span>Estudio / Domicilio</span>
                    </span>
                  </div>

                  {/* Descripción compacta */}
                  <p className="mt-3 text-xs sm:text-sm text-[#5C5558] leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  {/* Botón Ver Más / Ocultar Detalles (Sin saturar la tarjeta) */}
                  <div className="mt-3">
                    <button
                      onClick={() => toggleExpand(service.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1A1A1A] hover:text-[#F4A7C1] transition-colors cursor-pointer py-1"
                    >
                      <span>{isExpanded ? 'Ocultar detalles' : 'Ver qué incluye'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#F4A7C1]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#F4A7C1]" />
                      )}
                    </button>

                    {/* Detalle Desplegable con Animación */}
                    {isExpanded && (
                      <div className="mt-2.5 pt-2.5 border-t border-[#E7D5DB]/60 space-y-1.5 animate-fade-in bg-[#FBF4F6]/50 p-3 rounded-2xl">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block">
                          Incluye en tu sesión:
                        </span>
                        <ul className="space-y-1">
                          {service.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-xs text-[#5C5558]">
                              <Check className="w-3.5 h-3.5 text-[#F4A7C1] shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Acciones de la Tarjeta */}
                <div className="mt-5 pt-4 border-t border-[#E7D5DB]/60 flex flex-col gap-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#1A1A1A] text-white font-semibold text-xs sm:text-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-all duration-200 cursor-pointer shadow-sm active:scale-98"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reservar turno</span>
                  </button>

                  <a
                    href={getServiceInquiryUrl(service.name, service.durationMinutes)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-xs text-[#5C5558] hover:text-[#1A1A1A] hover:bg-[#FBF4F6] transition-colors font-medium"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicador de Swipe en Móvil cuando está en modo carrusel */}
        {viewMode === 'carousel' && (
          <p className="sm:hidden text-center text-xs text-[#5C5558] mt-2 flex items-center justify-center gap-1.5">
            <span>← Deslizá con el dedo para ver más servicios →</span>
          </p>
        )}
      </div>
    </section>
  );
};
