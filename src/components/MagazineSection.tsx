import React, { useState } from 'react';
import { MAGAZINE_ARTICLES } from '../data/content';
import { MagazineArticle } from '../types';
import { BookOpen, Clock, ArrowRight, X, Sparkles } from 'lucide-react';

export const MagazineSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle | null>(null);

  return (
    <section
      id="magazine"
      data-sector="SECTOR 7: Magazine y Consejos"
      className="py-16 sm:py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#F4A7C1]" />
            <span>Magazine & Belleza</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Consejos de Cuidado & Tips
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5C5558] max-w-xl mx-auto">
            Guías breves para preparar tu piel, entender cada acabado y disfrutar al máximo de tu sesión.
          </p>
        </div>

        {/* Grilla / Carrusel Deslizable */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory">
          {MAGAZINE_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="min-w-[85%] sm:min-w-0 bg-[#FBF4F6] rounded-3xl p-5 sm:p-6 border border-[#E7D5DB] hover:border-[#F4A7C1] hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group snap-center shrink-0"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#5C5558] mb-3">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-[#1A1A1A] bg-white px-2.5 py-0.5 rounded-full border border-[#E7D5DB]">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-[#F4A7C1]" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] group-hover:text-[#F4A7C1] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-[#5C5558] leading-relaxed line-clamp-2">
                  {article.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E7D5DB]/80 flex items-center justify-between text-xs font-bold text-[#1A1A1A] group-hover:text-[#F4A7C1]">
                <span>Leer nota rápida</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        <p className="sm:hidden text-center text-xs text-[#5C5558] mt-2">
          ← Deslizá para ver más notas →
        </p>
      </div>

      {/* Modal Lectura */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E7D5DB] max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#5C5558] hover:text-[#1A1A1A] hover:bg-[#FBF4F6] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#5C5558] mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FBF4F6] text-[#1A1A1A] border border-[#E7D5DB]">
                {selectedArticle.category}
              </span>
              <span>· {selectedArticle.readTime}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] leading-tight">
              {selectedArticle.title}
            </h3>

            <div className="mt-5 space-y-3.5 text-xs sm:text-sm text-[#5C5558] leading-relaxed border-t border-[#E7D5DB] pt-5">
              {selectedArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E7D5DB] flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-colors"
              >
                Cerrar nota
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
