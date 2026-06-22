import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight scroll-reveal hook for bespoke entrances (e.g. the dark steps).
 * Existing sections keep their framer-motion whileInView; use this where a
 * plain IntersectionObserver reveal is simpler. Respects reduced motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18, ...opts },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, shown };
}
