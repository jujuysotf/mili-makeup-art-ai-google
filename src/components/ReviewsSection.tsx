import React from 'react';
import { REVIEWS_DATA } from '../data/content';
import { Star, MessageSquareHeart, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="opiniones" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#F4A7C1]" />
            <span>Experiencias Reales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Opiniones de Nuestras Clientas
          </h2>
          <p className="mt-3 text-base text-[#5C5558]">
            La tranquilidad de verte radiante en tus eventos más especiales.
          </p>
        </div>

        {/* Tarjetas de Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FBF4F6] rounded-3xl p-7 border border-[#E7D5DB] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Estrellas */}
                <div className="flex items-center gap-1 mb-4 text-[#F4A7C1]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#F4A7C1]" />
                  ))}
                </div>

                {/* Cita */}
                <p className="text-sm sm:text-base text-[#1A1A1A] leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Autor y Servicio */}
              <div className="mt-6 pt-5 border-t border-[#E7D5DB]/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#1A1A1A]">
                    {rev.author}
                  </h4>
                  <span className="text-xs text-[#5C5558] flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[#F4A7C1]" />
                    {rev.service}
                  </span>
                </div>

                {rev.date && (
                  <span className="text-[11px] text-[#5C5558]/70">
                    {rev.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
