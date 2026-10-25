import React, { useState, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { PortfolioCategory, PortfolioWork } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { getPortfolioInquiryUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Sparkles,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Images,
  SlidersHorizontal,
  LayoutGrid,
} from 'lucide-react';

interface PortfolioSectionProps {
  onBookRelatedService: (serviceId?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onBookRelatedService }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('todos');
  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const carouselRef = useRef<HTMLDivElement>(null);

  const categories: { id: PortfolioCategory; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'social', label: 'Social' },
    { id: 'novia', label: 'Novias & 15' },
    { id: 'artístico', label: 'Artístico' },
    { id: 'sesión', label: 'Editorial' },
    { id: 'proceso', label: 'Proceso' },
  ];

  const visibleWorks = PORTFOLIO_DATA.filter((w) => {
    if (!w.publicar) return false;
    if (activeCategory === 'todos') return true;
    return w.category === activeCategory;
  });

  const handleOpenWork = (work: PortfolioWork) => {
    setSelectedWork(work);
    setCurrentImageIdx(0);
  };

  const handleNextImage = () => {
    if (!selectedWork) return;
    setCurrentImageIdx((prev) => (prev + 1) % selectedWork.images.length);
  };

  const handlePrevImage = () => {
    if (!selectedWork) return;
    setCurrentImageIdx((prev) => (prev - 1 + selectedWork.images.length) % selectedWork.images.length);
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
      id="trabajos"
      data-sector="SECTOR 4: Portfolio de Looks y Lightbox"
      className="py-16 sm:py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F4A7C1]" />
            <span>Galería de Trabajos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Portfolio de Looks
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#5C5558] max-w-xl mx-auto">
            Selección fotográfica de clientas reales en estudio y producciones. Toca cualquier foto para explorar todos sus ángulos.
          </p>

          {/* Filtros y Selector de Vista */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white shadow-sm'
                        : 'bg-[#FBF4F6] text-[#5C5558] hover:text-[#1A1A1A] hover:bg-white border border-[#E7D5DB]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Toggle Carrusel / Grilla */}
            <div className="flex items-center gap-1 bg-[#FBF4F6] p-1 rounded-full border border-[#E7D5DB] shrink-0">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-[#1A1A1A] text-white shadow-2xs'
                    : 'text-[#5C5558] hover:text-[#1A1A1A]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Carrusel</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#1A1A1A] text-white shadow-2xs'
                    : 'text-[#5C5558] hover:text-[#1A1A1A]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grilla</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carrusel Controls */}
        {viewMode === 'carousel' && (
          <div className="flex items-center justify-end gap-2 mb-4">
            <button
              onClick={() => scrollCarousel('left')}
              className="p-2 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] text-[#1A1A1A] hover:bg-white shadow-sm transition-all active:scale-95 cursor-pointer"
              aria-label="Anterior trabajo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="p-2 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] text-[#1A1A1A] hover:bg-white shadow-sm transition-all active:scale-95 cursor-pointer"
              aria-label="Siguiente trabajo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Contenedor de Trabajos (Carrusel o Grilla) */}
        <div
          ref={carouselRef}
          className={
            viewMode === 'carousel'
              ? 'flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-1 px-1 snap-x snap-mandatory scroll-smooth no-scrollbar'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          }
        >
          {visibleWorks.map((work) => (
            <div
              key={work.id}
              onClick={() => handleOpenWork(work)}
              className={`group relative bg-[#FBF4F6] rounded-3xl overflow-hidden border border-[#E7D5DB] hover:border-[#F4A7C1] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col ${
                viewMode === 'carousel'
                  ? 'min-w-[78%] sm:min-w-[300px] md:min-w-[340px] max-w-[360px] snap-center shrink-0'
                  : 'w-full'
              }`}
            >
              {/* Imagen principal */}
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <ImageWithFallback
                  src={work.principal}
                  alt={work.title}
                  fallbackTitle={work.title}
                  fallbackCategory={work.categoryLabel}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div className="w-full flex items-center justify-between text-white">
                    <span className="text-xs font-semibold flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-[#F4A7C1]" />
                      Abrir visor
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-medium flex items-center gap-1">
                      <Images className="w-3 h-3 text-[#F4A7C1]" />
                      {work.images.length} fotos
                    </span>
                  </div>
                </div>

                {/* Badge categoría */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[9px] font-bold tracking-wider uppercase border border-white/60 shadow-sm">
                    {work.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Pie de Foto compacto */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#F4A7C1] transition-colors line-clamp-1">
                    {work.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#5C5558] line-clamp-1">
                    {work.text}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#E7D5DB]/60 flex items-center justify-between text-[11px] text-[#1A1A1A]">
                  <span className="text-[#5C5558] flex items-center gap-1">
                    <Images className="w-3 h-3 text-[#F4A7C1]" />
                    {work.images.length} tomas
                  </span>
                  <span className="font-bold text-[#1A1A1A] group-hover:underline">
                    Ver más →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {viewMode === 'carousel' && (
          <p className="sm:hidden text-center text-xs text-[#5C5558] mt-2 flex items-center justify-center gap-1.5">
            <span>← Deslizá con el dedo para ver más fotos →</span>
          </p>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E7D5DB] flex flex-col lg:flex-row max-h-[92vh]">
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visor */}
            <div className="relative lg:w-3/5 bg-black/95 flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
              <ImageWithFallback
                src={selectedWork.images[currentImageIdx]}
                alt={`${selectedWork.title} foto ${currentImageIdx + 1}`}
                fallbackTitle={selectedWork.title}
                fallbackCategory={selectedWork.categoryLabel}
                className="max-h-[55vh] lg:max-h-[75vh] w-auto max-w-full object-contain mx-auto"
              />

              {selectedWork.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                    {currentImageIdx + 1} / {selectedWork.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Info */}
            <div className="lg:w-2/5 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto bg-white">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#5C5558] mb-1 block">
                  {selectedWork.categoryLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                  {selectedWork.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[#5C5558] leading-relaxed">
                  {selectedWork.text}
                </p>

                {/* Miniaturas */}
                {selectedWork.images.length > 1 && (
                  <div className="mt-5 pt-3.5 border-t border-[#E7D5DB]/80">
                    <span className="text-xs font-semibold text-[#1A1A1A] block mb-2">
                      Fotos de este trabajo ({selectedWork.images.length})
                    </span>
                    <div className="flex gap-2 overflow-x-auto pb-1.5">
                      {selectedWork.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIdx(idx)}
                          className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                            currentImageIdx === idx
                              ? 'border-[#1A1A1A] scale-105 shadow-md'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <ImageWithFallback
                            src={img}
                            alt=""
                            fallbackTitle="Foto"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="mt-6 pt-5 border-t border-[#E7D5DB] flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    const svcId = selectedWork.relatedServiceId || 'maquillaje-social';
                    setSelectedWork(null);
                    onBookRelatedService(svcId);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#1A1A1A] text-white font-semibold text-xs sm:text-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-colors shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Pedir un turno para este look</span>
                </button>

                <a
                  href={getPortfolioInquiryUrl(selectedWork.title, selectedWork.categoryLabel)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#FBF4F6] text-[#1A1A1A] font-semibold text-xs border border-[#E7D5DB] hover:bg-white hover:border-[#1A1A1A] transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
