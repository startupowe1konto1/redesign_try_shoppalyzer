import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;          // ms
  format?: (n: number) => string;
  className?: string;
  /** Wrapping element. Default: <span>. */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Animates a number from `from` → `to` once when the element enters the viewport.
 * Honors prefers-reduced-motion (snaps to final value).
 */
export const CountUp = ({
  to,
  from = 0,
  duration = 1100,
  format = (n) => Math.round(n).toString(),
  className = '',
  as = 'span',
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const reduced = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(to);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to, from, duration]);

  const Component = motion[as as keyof typeof motion] as typeof motion.span;
  return (
    <Component ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {format(value)}
    </Component>
  );
};
