import React, { useEffect, useRef, useState } from 'react';
import { VIDEO_SHOWCASE } from '../data/portfolio';
import { Instagram, Video, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

type PublicReel = {
  id: string;
  title: string;
  badge?: string;
  description?: string;
  url?: string;
  src?: string;
};

function toInstagramEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    if (!parsed.hostname.includes('instagram.com')) return null;
    parsed.search = '';
    parsed.hash = '';
    let path = parsed.pathname.replace(/\/+$/, '');
    if (!path) return null;
    // Instagram embed suele preferir /reel/ en lugar de /reels/
    path = path.replace(/^\/reels\//, '/reel/');
    // /embed (sin /captioned) muestra menos texto debajo del video
    return `https://www.instagram.com${path}/embed`;
  } catch {
    return null;
  }
}

export const VideoReelsSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [reels, setReels] = useState<PublicReel[]>(VIDEO_SHOWCASE.reels as PublicReel[]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/reels')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data || !Array.isArray(data.reels) || data.reels.length === 0) return;
        setReels(data.reels);
      })
      .catch(() => {
        // Se mantiene el fallback local
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    const node = carouselRef.current;
    if (!node) return;
    const card = node.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(node).columnGap || getComputedStyle(node).gap) || 16;
    const step = card ? card.offsetWidth + gap : node.clientWidth * 0.85;
    node.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="videos"
      data-sector="SECTOR: Videos y Reels (entre Servicios y Portfolio)"
      className="py-16 sm:py-24 bg-[#1A1A1A] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#F4A7C1] mb-2.5">
              <Video className="w-3.5 h-3.5" />
              <span>Backstage & Video</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Trabajos en Video
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-white/70 max-w-lg">
              Reels de @mili_makeupart. Usá las flechas o deslizá para ver más.
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

        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-[#F4A7C1]/60 shadow-sm transition-all active:scale-95 cursor-pointer"
            aria-label="Reel anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-[#F4A7C1]/60 shadow-sm transition-all active:scale-95 cursor-pointer"
            aria-label="Reel siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {reels.map((reel) => {
            const embedUrl = reel.url ? toInstagramEmbedUrl(reel.url) : null;
            return (
              <article
                key={reel.id}
                className="min-w-[min(86vw,320px)] w-[min(86vw,320px)] sm:min-w-[300px] sm:w-[300px] md:min-w-[320px] md:w-[320px] shrink-0 snap-center rounded-2xl overflow-hidden bg-black border border-white/10"
              >
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={reel.title || 'Reel de Instagram'}
                    className="w-full border-0 block bg-black"
                    style={{ height: 720 }}
                    loading="lazy"
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : reel.src ? (
                  <video
                    src={reel.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full aspect-[9/16] max-h-[720px] object-cover bg-black"
                  >
                    Tu navegador no soporta video.
                  </video>
                ) : (
                  <div className="h-[320px] flex items-center justify-center text-xs text-white/50 px-4 text-center">
                    Agregá un link de Instagram en la gestión de reels.
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <p className="md:hidden text-center text-xs text-white/50 mt-2">
          ← Deslizá para ver más reels →
        </p>
      </div>
    </section>
  );
};
