import { useEffect, useState } from 'react';

/**
 * One-time branded loading intro (Linear-style).
 * Deep navy overlay with the Shoppalyzer mark and a thin amber progress bar,
 * fades out after ~1.2s. Skips entirely on reduced motion and after the first
 * view in a session, so it never annoys on internal navigation.
 */
export const LoadingIntro = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || sessionStorage.getItem('shp_intro')) {
      setDone(true);
      return;
    }
    sessionStorage.setItem('shp_intro', '1');
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[80] grid place-items-center bg-brand-navy animate-intro-out"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-3 animate-fade-up">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-brand shadow-medium">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <circle cx="10.5" cy="10.5" r="6.5" stroke="white" strokeWidth="2.2" />
              <path d="M15.5 15.5L21 21" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M8 11l1.8 1.8L13.2 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-xl font-bold tracking-tight text-white">Shoppalyzer</span>
        </div>
        <div className="h-[3px] w-44 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-accent-brand animate-intro-fill" />
        </div>
      </div>
    </div>
  );
};
