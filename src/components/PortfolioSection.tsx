import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { PortfolioCategory, PortfolioWork } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { getPortfolioInquiryUrl } from '../utils/whatsapp';
import {
  Sparkles,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MessageCircle,
  Images,
} from 'lucide-react';

interface PortfolioSectionProps {
  onBookRelatedService: (serviceId?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onBookRelatedService }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('todos');
  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const categories: { id: PortfolioCategory; label: string }[] = [
    { id: 'todos', label: 'Todos los trabajos' },
    { id: 'social', label: 'Social Glam' },
    { id: 'novia', label: 'Novias & 15 Años' },
    { id: 'artístico', label: 'Artístico & Color' },
    { id: 'sesión', label: 'Sesión & Editorial' },
    { id: 'proceso', label: 'Proceso & Backstage' },
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

  return (
    <section id="trabajos" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F4A7C1]" />
            <span>Portfolio Exclusivo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Trabajos Realizados
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5C5558]">
            Fotografías reales de clientas, novias y producciones realizadas por Milagros Arce en Tucumán.
          </p>

          {/* Filtros */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
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
        </div>

        {/* Grilla de Trabajos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleWorks.map((work) => (
            <div
              key={work.id}
              onClick={() => handleOpenWork(work)}
              className="group relative bg-[#FBF4F6] rounded-3xl overflow-hidden border border-[#E7D5DB] hover:border-[#F4A7C1] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Imagen principal */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <ImageWithFallback
                  src={work.principal}
                  alt={work.title}
                  fallbackTitle={work.title}
                  fallbackCategory={work.categoryLabel}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay al pasar el mouse */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="w-full flex items-center justify-between text-white">
                    <span className="text-xs font-semibold flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-[#F4A7C1]" />
                      Ver galería completa
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-medium flex items-center gap-1">
                      <Images className="w-3 h-3 text-[#F4A7C1]" />
                      {work.images.length} fotos
                    </span>
                  </div>
                </div>

                {/* Badge de categoría */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[10px] font-bold tracking-wider uppercase border border-white/60 shadow-sm">
                    {work.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Contenido inferior */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#1A1A1A] group-hover:text-[#F4A7C1] transition-colors line-clamp-1">
                    {work.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#5C5558] line-clamp-2 leading-relaxed">
                    {work.text}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E7D5DB]/60 flex items-center justify-between text-xs text-[#1A1A1A]">
                  <span className="text-[11px] font-semibold text-[#5C5558] flex items-center gap-1">
                    <Images className="w-3.5 h-3.5 text-[#F4A7C1]" />
                    {work.images.length} tomas exclusivas
                  </span>
                  <span className="text-xs font-semibold text-[#1A1A1A] group-hover:underline">
                    Ver más →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal para ver Trabajo Completo */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E7D5DB] flex flex-col lg:flex-row max-h-[92vh]">
            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visor de Fotos */}
            <div className="relative lg:w-3/5 bg-black/95 flex items-center justify-center min-h-[320px] lg:min-h-[520px]">
              <ImageWithFallback
                src={selectedWork.images[currentImageIdx]}
                alt={`${selectedWork.title} foto ${currentImageIdx + 1}`}
                fallbackTitle={selectedWork.title}
                fallbackCategory={selectedWork.categoryLabel}
                className="max-h-[60vh] lg:max-h-[75vh] w-auto max-w-full object-contain mx-auto"
              />

              {/* Controles de Foto Siguiente / Anterior */}
              {selectedWork.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 p-2.5 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 p-2.5 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
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

            {/* Panel de Información del Look */}
            <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#5C5558] mb-1.5 block">
                  {selectedWork.categoryLabel}
                </span>
                <h3 className="text-2xl font-bold text-[#1A1A1A]">
                  {selectedWork.title}
                </h3>
                <p className="mt-3 text-sm text-[#5C5558] leading-relaxed">
                  {selectedWork.text}
                </p>

                {/* Tira de Miniaturas */}
                {selectedWork.images.length > 1 && (
                  <div className="mt-6 pt-4 border-t border-[#E7D5DB]/80">
                    <span className="text-xs font-semibold text-[#1A1A1A] block mb-2.5">
                      Ángulos y tomas ({selectedWork.images.length})
                    </span>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {selectedWork.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIdx(idx)}
                          className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
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

              {/* Acciones */}
              <div className="mt-8 pt-6 border-t border-[#E7D5DB] flex flex-col gap-3">
                <button
                  onClick={() => {
                    const svcId = selectedWork.relatedServiceId || 'maquillaje-social';
                    setSelectedWork(null);
                    onBookRelatedService(svcId);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#1A1A1A] text-white font-semibold text-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-colors shadow-sm"
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
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Consultar este look por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
