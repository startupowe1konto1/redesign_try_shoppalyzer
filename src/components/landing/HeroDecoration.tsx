/**
 * Faint, monochrome chart-fragment background.
 * Replaces the AI-fingerprint blob backgrounds.
 *
 * Quiet sparklines, candlestick fragments, dotted gridlines.
 * Signals "data product" without screaming.
 */
export const HeroDecoration = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden mask-fade-radial"
    >
      {/* faint dotted grid */}
      <div className="absolute inset-0 bg-dots-faint opacity-[0.4]" />

      {/* horizontal rule guides — the FT/editorial accent */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
      >
        {/* Top-left sparkline — price trending up */}
        <g transform="translate(40, 120)" opacity="0.18">
          <polyline
            fill="none"
            stroke="hsl(207 58% 28%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0,50 30,42 60,46 90,38 120,30 150,33 180,24 210,28 240,18 270,22 300,12"
          />
          <line x1="0" y1="60" x2="320" y2="60" stroke="hsl(207 14% 60%)" strokeWidth="0.5" strokeDasharray="2 4" />
        </g>

        {/* Mid-left candlestick fragment */}
        <g transform="translate(80, 460)" opacity="0.10">
          {[0, 18, 36, 54, 72, 90, 108, 126].map((x, i) => {
            const heights = [38, 24, 32, 14, 28, 18, 26, 20];
            const tops    = [12, 22, 14, 30, 18, 28, 16, 22];
            return (
              <g key={i} transform={`translate(${x}, 0)`}>
                <line x1="6" y1={tops[i] - 4} x2="6" y2={tops[i] + heights[i] + 4} stroke="hsl(207 64% 14%)" strokeWidth="0.8" />
                <rect x="2" y={tops[i]} width="8" height={heights[i]} fill="hsl(207 58% 28%)" />
              </g>
            );
          })}
        </g>

        {/* Right sparkline — competitor curve */}
        <g transform="translate(1180, 220)" opacity="0.12">
          <polyline
            fill="none"
            stroke="hsl(25 80% 56%)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0,40 25,30 50,38 75,18 100,28 125,12 150,22 175,4 200,16 225,2"
          />
          <circle cx="225" cy="2" r="3" fill="hsl(25 80% 56%)" />
        </g>

        {/* Bottom-right faint axis */}
        <g transform="translate(1100, 640)" opacity="0.10">
          <line x1="0" y1="0" x2="380" y2="0" stroke="hsl(207 14% 40%)" strokeWidth="0.6" strokeDasharray="2 6" />
          {[0, 95, 190, 285, 380].map((x, i) => (
            <text
              key={i}
              x={x}
              y="14"
              fontSize="9"
              fontFamily="Geist Mono, monospace"
              fill="hsl(207 14% 50%)"
              textAnchor="middle"
            >
              {['Pn', 'Wt', 'Śr', 'Czw', 'Pt'][i]}
            </text>
          ))}
        </g>

        {/* Center-faint percentage callout */}
        <g transform="translate(960, 110)" opacity="0.08">
          <text
            fontSize="120"
            fontFamily="Newsreader, serif"
            fontWeight="300"
            fill="hsl(207 64% 14%)"
            fontStyle="italic"
          >
            +18%
          </text>
        </g>
      </svg>
    </div>
  );
};
