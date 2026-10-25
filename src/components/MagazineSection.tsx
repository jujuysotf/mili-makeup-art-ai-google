import React, { useState } from 'react';
import { MAGAZINE_ARTICLES } from '../data/content';
import { MagazineArticle } from '../types';
import { BookOpen, Clock, ArrowRight, X, Sparkles } from 'lucide-react';

export const MagazineSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle | null>(null);

  return (
    <section id="magazine" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4F6] border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#F4A7C1]" />
            <span>Magazine & Belleza</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Consejos & Notas de Belleza
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5C5558]">
            Tips prácticos para preparar tu piel, entender cada técnica y aprovechar al máximo tu sesión de maquillaje.
          </p>
        </div>

        {/* Grilla de Artículos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MAGAZINE_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-[#FBF4F6] rounded-3xl p-7 border border-[#E7D5DB] hover:border-[#F4A7C1] hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#5C5558] mb-3">
                  <span className="font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#F4A7C1]" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#F4A7C1] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#5C5558] leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7D5DB]/80 flex items-center justify-between text-xs font-semibold text-[#1A1A1A] group-hover:text-[#F4A7C1]">
                <span>Leer nota completa</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal Lectura de Artículo */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E7D5DB] max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#5C5558] hover:text-[#1A1A1A] hover:bg-[#FBF4F6] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#5C5558] mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FBF4F6] text-[#1A1A1A] border border-[#E7D5DB]">
                {selectedArticle.category}
              </span>
              <span>· {selectedArticle.readTime}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-tight">
              {selectedArticle.title}
            </h3>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#5C5558] leading-relaxed border-t border-[#E7D5DB] pt-6">
              {selectedArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7D5DB] flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs sm:text-sm font-semibold hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-colors"
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
