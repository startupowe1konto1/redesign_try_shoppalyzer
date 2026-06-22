import { useReveal } from '@/hooks/useReveal';

type AtmosphereProps = {
  variant?: 'hero' | 'section';
  dark?: boolean;
  composition?: 1 | 2 | 3;
  className?: string;
};

const LINE_FADE = {
  WebkitMaskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
  maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
} as const;

/** Subtle flowing "growth" lines in different directions per section. */
const COMPOSITIONS: Record<number, { d: string; o: number; w: number }[]> = {
  1: [
    { d: 'M0,150 C 220,142 360,150 540,128 C 720,106 840,116 1000,96', o: 1, w: 1.4 },
    { d: 'M0,86 C 240,80 460,94 700,74 C 850,62 940,68 1000,60', o: 0.6, w: 1 },
    { d: 'M0,252 C 260,244 520,258 760,238 C 880,228 950,233 1000,226', o: 0.5, w: 1 },
  ],
  2: [
    { d: 'M0,84 C 220,96 360,86 540,112 C 720,136 840,124 1000,154', o: 1, w: 1.4 },
    { d: 'M0,168 C 240,178 460,166 700,192 C 850,208 940,200 1000,214', o: 0.55, w: 1 },
    { d: 'M0,40 C 260,50 520,36 760,62 C 880,74 950,66 1000,82', o: 0.45, w: 1 },
  ],
  3: [
    { d: 'M0,120 C 200,86 400,156 600,112 C 790,72 900,134 1000,94', o: 1, w: 1.4 },
    { d: 'M0,210 C 220,186 460,220 700,182 C 860,158 940,174 1000,152', o: 0.6, w: 1 },
    { d: 'M0,300 C 260,290 520,308 760,286 C 900,272 960,278 1000,270', o: 0.4, w: 1 },
  ],
};

/**
 * Signature background motif. Hero: aurora glow + two rising lines placed low
 * (behind subtitle/CTAs). Sections: a subtle composition of flowing lines in a
 * chosen direction. Lines draw themselves in on view; reduced-motion shows them
 * statically. Always behind content (-z-10), never covering it.
 */
export const Atmosphere = ({ variant = 'section', dark = false, composition = 1, className = '' }: AtmosphereProps) => {
  const { ref, shown } = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const stroke = dark ? '#ffffff' : 'hsl(207 58% 28%)';

  if (variant === 'hero') {
    return (
      <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary-soft/50" />
        <div
          className="absolute left-[6%] top-[-140px] h-[480px] w-[480px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(207 58% 30% / 0.16), transparent 70%)' }}
        />
        <div
          className="absolute right-[2%] top-[-100px] h-[520px] w-[520px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(25 80% 56% / 0.12), transparent 70%)' }}
        />
        <svg
          className={`atmosphere-lines absolute inset-x-0 top-[300px] h-[340px] w-full ${shown ? 'play' : ''}`}
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          style={LINE_FADE}
        >
          <g fill="none" stroke={stroke} strokeLinecap="round">
            <path pathLength={100} d="M0,165 C 180,120 360,180 540,120 C 720,60 860,108 1000,52" strokeOpacity={0.12} strokeWidth="1.4" />
            <path pathLength={100} d="M0,175 C 180,132 360,190 540,132 C 720,72 860,120 1000,64" strokeOpacity={0.05} strokeWidth="1" />
          </g>
        </svg>
      </div>
    );
  }

  const lines = COMPOSITIONS[composition] ?? COMPOSITIONS[1];
  const base = dark ? 0.13 : 0.14;

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className={`atmosphere-lines absolute inset-x-0 top-0 h-[300px] w-full ${shown ? 'play' : ''}`}
        viewBox="0 0 1000 320"
        preserveAspectRatio="none"
        style={LINE_FADE}
      >
        <g fill="none" stroke={stroke} strokeLinecap="round">
          {lines.map((l, i) => (
            <path key={i} pathLength={100} d={l.d} strokeOpacity={base * l.o} strokeWidth={l.w} />
          ))}
        </g>
      </svg>
    </div>
  );
};
