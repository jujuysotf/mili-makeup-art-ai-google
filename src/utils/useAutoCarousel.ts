import { RefObject, useEffect } from 'react';

export function useAutoCarousel(
  ref: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  intervalMs = 4500,
) {
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let paused = false;
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);

    const timer = window.setInterval(() => {
      if (paused || document.hidden) return;
      const node = ref.current;
      if (!node) return;

      const maxScroll = node.scrollWidth - node.clientWidth;
      if (maxScroll <= 8) return;

      const card = node.firstElementChild as HTMLElement | null;
      const gap = Number.parseFloat(getComputedStyle(node).columnGap) || 0;
      const step = card ? card.offsetWidth + gap : node.clientWidth * 0.85;
      const atEnd = node.scrollLeft + step >= maxScroll - 8;

      if (atEnd) {
        node.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        node.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, intervalMs);

    return () => {
      window.clearInterval(timer);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
    };
  }, [ref, enabled, intervalMs]);
}
