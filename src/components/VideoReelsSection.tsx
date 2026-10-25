import React from 'react';
import { VIDEO_SHOWCASE } from '../data/portfolio';
import { BUSINESS_INFO } from '../data/content';
import { Instagram, Video, Play, ExternalLink, Sparkles } from 'lucide-react';

export const VideoReelsSection: React.FC = () => {
  return (
    <section id="videos" className="py-20 lg:py-24 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#F4A7C1] mb-3">
              <Video className="w-3.5 h-3.5" />
              <span>Backstage & Producciones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Últimos Trabajos en Video
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl">
              Mira el detrás de escena, la técnica de aplicación de piel y las transformaciones en movimiento.
            </p>
          </div>

          <a
            href={VIDEO_SHOWCASE.instagramReelsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F4A7C1] to-[#E7D5DB] text-[#1A1A1A] font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all self-start md:self-auto shrink-0 cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-[#1A1A1A]" />
            <span>Ver todos los Reels en Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#1A1A1A]/70" />
          </a>
        </div>

        {/* Grilla de Videos Locales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VIDEO_SHOWCASE.reels.map((reel) => (
            <div
              key={reel.id}
              className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#F4A7C1]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Contenedor de Video */}
              <div className="relative aspect-video sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
                <video
                  src={reel.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  Tu navegador no soporta reproducción directa de video.
                </video>

                {/* Badge sobre video */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#F4A7C1] text-xs font-semibold flex items-center gap-1.5 border border-white/10">
                    <Sparkles className="w-3 h-3 text-[#F4A7C1]" />
                    {reel.badge}
                  </span>
                </div>
              </div>

              {/* Info inferior */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">
                  {reel.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                  {reel.description}
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-white/60">
                    @mili_makeupart · San Miguel de Tucumán
                  </span>
                  <a
                    href={BUSINESS_INFO.instagramReels}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4A7C1] font-semibold hover:underline flex items-center gap-1"
                  >
                    Abrir en Reels →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
