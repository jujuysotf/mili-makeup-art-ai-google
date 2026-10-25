import React from 'react';
import { VIDEO_SHOWCASE } from '../data/portfolio';
import { BUSINESS_INFO } from '../data/content';
import { Instagram, Video, ExternalLink, Sparkles } from 'lucide-react';

export const VideoReelsSection: React.FC = () => {
  return (
    <section
      id="videos"
      data-sector="SECTOR 5: Videos y Reels"
      className="py-16 sm:py-24 bg-[#1A1A1A] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#F4A7C1] mb-2.5">
              <Video className="w-3.5 h-3.5" />
              <span>Backstage & Video</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Trabajos en Video
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-white/70 max-w-lg">
              Mirá el proceso de preparación de piel y la fijación en vivo.
            </p>
          </div>

          <a
            href={VIDEO_SHOWCASE.instagramReelsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F4A7C1] to-[#E7D5DB] text-[#1A1A1A] font-bold text-xs shadow-md hover:opacity-95 transition-all self-start md:self-auto shrink-0 cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-[#1A1A1A]" />
            <span>Ver Reels en Instagram</span>
            <ExternalLink className="w-3 h-3 text-[#1A1A1A]/70" />
          </a>
        </div>

        {/* Carrusel Swipeable en móvil / Grilla en desktop */}
        <div className="flex md:grid md:grid-cols-2 gap-5 sm:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory">
          {VIDEO_SHOWCASE.reels.map((reel) => (
            <div
              key={reel.id}
              className="min-w-[85%] sm:min-w-[340px] md:min-w-0 bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#F4A7C1]/50 transition-all duration-300 flex flex-col justify-between snap-center shrink-0"
            >
              <div className="relative aspect-video sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
                <video
                  src={reel.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  Tu navegador no soporta video.
                </video>

                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#F4A7C1] text-[10px] font-semibold flex items-center gap-1 border border-white/10">
                    <Sparkles className="w-3 h-3 text-[#F4A7C1]" />
                    {reel.badge}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="text-base font-bold text-white line-clamp-1">
                  {reel.title}
                </h3>
                <p className="mt-1 text-xs text-white/70 line-clamp-2">
                  {reel.description}
                </p>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-white/50 text-[11px]">
                    @mili_makeupart · Tucumán
                  </span>
                  <a
                    href={BUSINESS_INFO.instagramReels}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4A7C1] font-semibold hover:underline flex items-center gap-1 text-[11px]"
                  >
                    Ver en Instagram →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="md:hidden text-center text-xs text-white/50 mt-2">
          ← Deslizá para ver los videos →
        </p>
      </div>
    </section>
  );
};
