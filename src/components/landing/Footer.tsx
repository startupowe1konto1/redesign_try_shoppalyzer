import { Linkedin, Facebook, ArrowUpRight } from 'lucide-react';
import { useWaitlist } from '@/context/WaitlistContext';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const { openWaitlist } = useWaitlist();
  const navigate = useNavigate();

  // Anchor links live on the landing page. If the target section isn't in the
  // current DOM (we're on a subpage), navigate home first, then scroll.
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }), 350);
    }
  };

  return (
    <footer className="relative bg-brand-navy text-white overflow-hidden">
      {/* Editorial decoration — faint chart fragments */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mask-fade-b">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 600" preserveAspectRatio="none">
          {/* Wide horizontal rules — FT ledger */}
          {[120, 240, 360, 480].map((y) => (
            <line key={y} x1="0" y1={y} x2="1600" y2={y} stroke="white" strokeWidth="0.5" opacity="0.05" strokeDasharray="2 8" />
          ))}
          {/* Faint sparkline */}
          <polyline
            fill="none"
            stroke="hsl(25 80% 56%)"
            strokeWidth="1.2"
            strokeOpacity="0.18"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="40,420 120,400 200,410 280,360 360,380 440,310 520,330 600,260 680,280 760,200 840,220 920,150 1000,170 1080,90"
          />
        </svg>
        <div className="absolute inset-0 bg-dots-faint opacity-[0.04]" />
      </div>

      {/* ─── BIG MARQUEE: editorial pull-statement ─── */}
      <div className="relative border-b border-white/10">
        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-end">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] font-medium text-white/50 mb-5">
                Shoppalyzer · 2026
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.1] tracking-[-0.025em] font-bold text-white">
                Inteligentna analiza
                <span className="text-[hsl(25_80%_72%)]"> konkurencji</span>,
                <br />
                dostępna dla każdego.
              </h2>
              <p className="mt-6 text-base text-white/65 max-w-md leading-relaxed">
                Rekomendacje sprzedażowe oparte na realnych danych, nie na intuicji.
              </p>
            </div>

            {/* Editorial CTA card */}
            <div className="relative">
              <div className="rounded-2xl bg-white/[0.04] backdrop-blur-sm ring-1 ring-white/10 p-7">
                <div className="text-[11px] uppercase tracking-[0.18em] font-medium text-white/50 mb-3">
                  Newsletter dla sprzedawców
                </div>
                <p className="text-base text-white/85 leading-relaxed mb-5">
                  Cotygodniowe wskazówki, raporty rynkowe i case studies, prosto na Twój e-mail.
                </p>
                <button
                  onClick={openWaitlist}
                  className="
                    group inline-flex items-center justify-center gap-2
                    bg-accent-brand text-accent-brand-foreground
                    font-semibold text-sm px-5 py-3 rounded-lg
                    transition-all hover:bg-accent-brand-hover hover:shadow-medium
                  "
                >
                  Zapisz się do newslettera
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN GRID ─── */}
      <div className="relative">
        <div className="container py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-10">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-4">
              <button
                onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
                className="block group"
              >
                <img
                  src="/shoppalyzer-logo.svg"
                  alt="Shoppalyzer"
                  className="h-9 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </button>
              <p className="mt-5 text-sm text-white/55 leading-relaxed max-w-xs">
                Pomagamy sprzedawcom e-commerce zarabiać więcej.
              </p>
            </div>

            {/* Product links */}
            <div className="col-span-1 md:col-span-2 md:col-start-6">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">
                Produkt
              </h3>
              <ul className="space-y-3 text-sm">
                <li><FooterLink onClick={() => scrollTo('#korzysci')}>Korzyści</FooterLink></li>
                <li><FooterLink onClick={() => scrollTo('#jak-to-dziala')}>Jak to działa?</FooterLink></li>
                <li><FooterLink onClick={() => scrollTo('#cennik')}>Cennik</FooterLink></li>
                <li><FooterLink onClick={() => { navigate('/sample-report'); window.scrollTo(0, 0); }}>Przykładowy raport</FooterLink></li>
              </ul>
            </div>

            {/* Legal links */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">
                Prawo
              </h3>
              <ul className="space-y-3 text-sm">
                <li><FooterLink onClick={() => { navigate('/polityka-prywatnosci'); window.scrollTo(0, 0); }}>Polityka prywatności</FooterLink></li>
                <li><FooterLink onClick={() => { navigate('/regulamin'); window.scrollTo(0, 0); }}>Regulamin</FooterLink></li>
                <li><FooterLink onClick={() => { navigate('/polityka-cookies'); window.scrollTo(0, 0); }}>Polityka cookies</FooterLink></li>
                <li><FooterLink onClick={() => { navigate('/kontakt'); window.scrollTo(0, 0); }}>Kontakt</FooterLink></li>
              </ul>
            </div>

            {/* Social */}
            <div className="col-span-2 md:col-span-2">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">
                Społeczność
              </h3>
              <div className="flex gap-2.5">
                <a
                  href="https://www.linkedin.com/company/shoppalyzer/about/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="h-10 w-10 inline-flex items-center justify-center rounded-lg ring-1 ring-white/10 text-white/65 hover:text-white hover:ring-white/30 hover:bg-white/[0.04] transition-all"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61576537945461"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="h-10 w-10 inline-flex items-center justify-center rounded-lg ring-1 ring-white/10 text-white/65 hover:text-white hover:ring-white/30 hover:bg-white/[0.04] transition-all"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="border-t border-white/10">
          <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/45">
              © 2026 Shoppalyzer. Wszelkie prawa zastrzeżone.
            </p>
            <p className="text-[11px] text-white/35 font-mono uppercase tracking-[0.18em]">
              Made in Poland · Built for Allegro
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────────────────────────────────────────── */

const FooterLink = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className="group relative text-white/65 hover:text-white transition-colors"
  >
    <span className="relative">
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full" />
    </span>
  </button>
);
