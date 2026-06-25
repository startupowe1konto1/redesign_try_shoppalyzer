import { useEffect, useState } from 'react';

/**
 * TEMPORARY mobile-layout diagnostic. Renders only with ?diag=1.
 * Samples real viewport / breakpoint / hero geometry over the first seconds so
 * we can see on a real device why the hero briefly uses the desktop layout.
 */
export const DiagOverlay = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!new URLSearchParams(window.location.search).has('diag')) return;

    const t0 = performance.now();
    const findGrid = () => {
      const h1 = document.querySelector('h1');
      let el: HTMLElement | null = h1 as HTMLElement | null;
      while (el) {
        if (getComputedStyle(el).display === 'grid') return el;
        el = el.parentElement;
      }
      return null;
    };

    const sample = () => {
      const t = Math.round(performance.now() - t0);
      const grid = findGrid();
      const gcols = grid ? getComputedStyle(grid).gridTemplateColumns : 'n/a';
      const demo = document.querySelector('.select-none') as HTMLElement | null;
      const h1 = document.querySelector('h1') as HTMLElement | null;
      const vv = window.visualViewport;
      const lg = window.matchMedia('(min-width:1024px)').matches ? 'LG' : '..';
      const sm = window.matchMedia('(min-width:640px)').matches ? 'SM' : '..';
      const line = `${String(t).padStart(4)}ms iw${window.innerWidth} cw${document.documentElement.clientWidth} vv${vv ? Math.round(vv.width) : '-'} dpr${window.devicePixelRatio} ${sm}${lg} h1:${h1 ? getComputedStyle(h1).fontSize.replace('px', '') : '-'} demo:${demo ? Math.round(demo.getBoundingClientRect().width) : '-'} cols:${gcols.length > 22 ? '2col' : '1col'}`;
      setLines((prev) => [...prev, line]);
    };

    sample();
    const iv = setInterval(sample, 300);
    const stop = setTimeout(() => clearInterval(iv), 6000);
    return () => { clearInterval(iv); clearTimeout(stop); };
  }, []);

  if (lines.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.88)', color: '#0f0', font: '10px/1.35 monospace',
        padding: '6px 8px', whiteSpace: 'pre-wrap', maxHeight: '55vh', overflow: 'auto',
      }}
    >
      {lines.join('\n')}
    </div>
  );
};
