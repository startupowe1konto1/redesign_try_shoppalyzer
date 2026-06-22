import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, FileSearch, Network, Sparkles, Check, ArrowRight, Loader2 } from 'lucide-react';
import { fmtPLN } from '@/lib/format';

/* ── Timing (ms per phase) ── */
const PHASE_MS = [4800, 6000, 9000];

const STEPS = [
  { label: 'Wklej link', icon: '🔗' },
  { label: 'Analiza',    icon: '🔍' },
  { label: 'Raport',     icon: '📊' },
];

type Dir = 'raise' | 'lower' | 'hold';

type Product = {
  url: string;
  title: string;
  category: string;
  yourPrice: number;
  priceMin: number;
  priceMax: number;
  /** 0 = taniej (lewo), 0.5 = poziom rynku, 1 = drożej (prawo) */
  position: number;
  dir: Dir;
  verdict: string;
  sellers: number;
  sales30: number;
  actionTitle: string;
  action: string;
};

/* Three rotating products — distinct verdicts, actionable (non-price-only) advice */
const PRODUCTS: Product[] = [
  {
    url: 'allegro.pl/oferty-produktu/sluchawka-prysznicowa-ecovand-aqua-stop',
    title: 'Słuchawka prysznicowa EcoVand Aqua Stop 4-funkcyjna',
    category: 'Łazienka',
    yourPrice: 59.95,
    priceMin: 50.96,
    priceMax: 104.95,
    position: 0.5,
    dir: 'hold',
    verdict: 'Twoja cena jest na poziomie rynku',
    sellers: 3,
    sales30: 116,
    actionTitle: 'Kilku sprzedawców dominuje rynek',
    action: 'Top 3 odpowiada za 100% widocznej sprzedaży. Pobij lidera logistyką (Smart!) albo celuj w długi ogon — nie w samą cenę.',
  },
  {
    url: 'allegro.pl/oferty-produktu/sony-wh-1000xm5-czarne-bezprzewodowe',
    title: 'Sony WH-1000XM5 słuchawki bezprzewodowe ANC',
    category: 'Audio',
    yourPrice: 1349.0,
    priceMin: 1199.0,
    priceMax: 1399.0,
    position: 0.82,
    dir: 'lower',
    verdict: 'Twoja cena jest powyżej rynku',
    sellers: 12,
    sales30: 240,
    actionTitle: 'Lider zgarnia ranking najniższą ceną',
    action: 'Zamiast ciąć marżę, dorzuć darmową dostawę i Smart! — odzyskasz pozycję bez wchodzenia w wojnę cenową.',
  },
  {
    url: 'allegro.pl/oferty-produktu/spigen-szklo-hartowane-iphone-16-pro',
    title: 'Spigen szkło hartowane iPhone 16 Pro (2 szt.)',
    category: 'Akcesoria GSM',
    yourPrice: 49.99,
    priceMin: 45.0,
    priceMax: 79.0,
    position: 0.24,
    dir: 'raise',
    verdict: 'Masz pole do podwyżki',
    sellers: 6,
    sales30: 89,
    actionTitle: 'Dwóch konkurentów wyprzedało zapas',
    action: 'Podnieś cenę o ~8% i przejmij popyt teraz, zanim wrócą do oferty. Takie okno trwa zwykle 3–5 dni.',
  },
];

const dirColor: Record<Dir, string> = {
  raise: 'text-success',
  lower: 'text-danger',
  hold: 'text-primary',
};
const dirDot: Record<Dir, string> = {
  raise: 'bg-success',
  lower: 'bg-danger',
  hold: 'bg-primary',
};
const dirSoft: Record<Dir, string> = {
  raise: 'border-success/25 bg-success-soft',
  lower: 'border-danger/25 bg-danger-soft',
  hold: 'border-primary/20 bg-primary-soft',
};

const fmtZl = (n: number) => n.toFixed(2).replace('.', ',');

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

/* ═══════════ Phase 0 — Paste link ═══════════ */
function PhaseInput({ product }: { product: Product }) {
  const full = product.url;
  const [typed, setTyped] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setTyped('');
    setClicked(false);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(t);
        setTimeout(() => setClicked(true), 500);
      }
    }, 38);
    return () => clearInterval(t);
  }, [full]);

  const history = [
    { name: 'tablet-blow-blacktab10-128-gb', ok: true },
    { name: 'pralka-whirlpool-ffb-9258-9kg', ok: false },
    { name: 'lego-ninjago-71851-smok-mech', ok: true },
  ];

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="w-full space-y-4">
      <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-muted-foreground">
        Krok 1 — Nowa analiza
      </p>

      {/* Input + button */}
      <div className="rounded-xl border border-border bg-surface-muted p-4 space-y-3">
        <p className="text-[12px] font-semibold text-foreground">Wklej link do produktu lub oferty na Allegro</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center rounded-lg border border-border bg-surface px-3 py-2.5 min-w-0">
            <span className="text-[11px] font-mono text-foreground truncate">
              {typed}
              <span className="inline-block w-[1px] h-3 align-middle bg-primary ml-0.5 animate-pulse" />
            </span>
          </div>
          <motion.span
            animate={clicked ? { scale: [1, 0.92, 1] } : {}}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-1 rounded-lg bg-brand-navy text-white text-[12px] font-semibold px-3.5 py-2.5 shrink-0"
          >
            Analizuj
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.span>
        </div>
      </div>

      {/* History glimpse */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-medium">Historia</p>
        {history.map((h) => (
          <div key={h.name} className="flex items-center justify-between rounded-lg border border-border/70 bg-surface px-3 py-2">
            <span className="text-[11px] font-mono text-muted-foreground truncate max-w-[200px]">
              …/{h.name}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                h.ok ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'
              }`}
            >
              {h.ok ? 'Gotowe' : 'Błąd'}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════ Phase 1 — Analysis ═══════════ */
const ANALYSIS = [
  { Icon: Search, label: 'Znaleziono stronę porównania', sub: 'Odkrywanie URL agregacji ofert' },
  { Icon: FileSearch, label: 'Pobrano dane ze strony', sub: 'Pobieranie ofert i cen' },
  { Icon: Network, label: 'Parsowanie ofert sprzedawców', sub: 'Identyfikacja konkurentów' },
  { Icon: Sparkles, label: 'Silnik rekomendacji', sub: 'Generowanie wniosków AI' },
];

function PhaseAnalysis({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(0);
    const t = setInterval(() => {
      setActive((a) => (a < ANALYSIS.length ? a + 1 : a));
    }, 1250);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="w-full space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-muted-foreground">
          Krok 2 — Trwa analiza produktu
        </p>
        <p className="text-[11px] text-muted-foreground mt-1 truncate">{product.title}</p>
      </div>

      <div className="rounded-xl border border-border bg-surface-muted p-4 space-y-3.5">
        {ANALYSIS.map((s, i) => {
          const done = i < active;
          const running = i === active;
          return (
            <div key={s.label} className="flex items-start gap-3">
              <span
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  done ? 'bg-success text-white' : running ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground/40'
                }`}
              >
                {done ? (
                  <Check className="h-3 w-3" strokeWidth={3} />
                ) : running ? (
                  <Loader2 className="h-3 w-3 animate-spin" strokeWidth={2.5} />
                ) : (
                  <s.Icon className="h-3 w-3" strokeWidth={2} />
                )}
              </span>
              <div className={`transition-opacity ${i <= active ? 'opacity-100' : 'opacity-40'}`}>
                <p className={`text-[12px] font-medium leading-tight ${done || running ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.label}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-muted-foreground text-center">Może zająć od 30 sekund do 5 minut</p>
    </motion.div>
  );
}

/* ═══════════ Phase 2 — Report ═══════════ */
function PhaseReport({ product }: { product: Product }) {
  const p = product;
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="w-full space-y-3">
      <div>
        <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-muted-foreground">
          Twoja oferta · {p.category}
        </p>
        <h4 className="text-[13px] font-bold text-foreground leading-snug mt-1 line-clamp-2">{p.title}</h4>
      </div>

      {/* Price-position card */}
      <div className={`rounded-xl border p-4 ${dirSoft[p.dir]}`}>
        <p className={`text-[12px] font-bold ${dirColor[p.dir]}`}>{p.verdict}</p>

        {/* Slider */}
        <div className="mt-4 mb-1">
          <div className="relative h-1.5 rounded-full bg-foreground/10">
            {/* market-level center tick */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-px bg-foreground/25" />
            <motion.span
              initial={{ left: '50%', opacity: 0 }}
              animate={{ left: `${p.position * 100}%`, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full ring-4 ring-surface ${dirDot[p.dir]}`}
            />
          </div>
          <div className="flex justify-between mt-2 text-[9px] uppercase tracking-wider text-muted-foreground">
            <span>← taniej</span>
            <span className="font-semibold text-foreground tabular-nums">{fmtPLN(p.yourPrice)}</span>
            <span>drożej →</span>
          </div>
        </div>
      </div>

      {/* Actionable recommendation */}
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent-brand/15 text-accent-brand">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
          </span>
          <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-accent-brand">Co zrobić — wg priorytetu</p>
        </div>
        <p className="text-[12px] font-bold text-foreground leading-tight">{p.actionTitle}</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">{p.action}</p>
      </div>

      {/* Market context KPIs */}
      <div className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border overflow-hidden">
        <div className="px-2.5 py-2.5 bg-gradient-card">
          <p className="text-[8px] uppercase tracking-wider text-muted-foreground">Zakres cen</p>
          <p className="text-[12px] font-bold tabular-nums text-foreground mt-0.5 leading-tight">
            {fmtZl(p.priceMin)}–{fmtZl(p.priceMax)}
          </p>
        </div>
        <div className="px-2.5 py-2.5 bg-gradient-card">
          <p className="text-[8px] uppercase tracking-wider text-muted-foreground">Sprzedawcy</p>
          <p className="text-base font-bold tabular-nums text-foreground mt-0.5">{p.sellers}</p>
        </div>
        <div className="px-2.5 py-2.5 bg-gradient-card">
          <p className="text-[8px] uppercase tracking-wider text-muted-foreground">Sprzedaż 30 dni</p>
          <p className="text-base font-bold tabular-nums text-foreground mt-0.5">
            {p.sales30} <span className="text-[10px] font-medium text-muted-foreground">szt.</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════ Step bar ═══════════ */
function StepBar({ phase }: { phase: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {STEPS.map((s, i) => (
        <div key={i} className="flex items-center gap-0.5 flex-1">
          <div className={`flex items-center gap-1 transition-all duration-500
            ${i === phase ? 'opacity-100' : i < phase ? 'opacity-45' : 'opacity-20'}`}>
            <span className="text-[11px]">{s.icon}</span>
            <span className={`text-[9px] font-semibold uppercase tracking-wider whitespace-nowrap
              ${i === phase ? 'text-primary' : 'text-muted-foreground'}`}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="flex-1 h-px mx-1.5 rounded-full"
              style={{ background: i < phase ? 'hsl(207 58% 28% / 0.35)' : 'hsl(40 14% 88%)' }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════ Main ═══════════ */
const PHASES = [PhaseInput, PhaseAnalysis, PhaseReport];

export const ServiceFlowAnimation = () => {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [productIdx, setProductIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const scheduleNext = useCallback((curPhase: number, curProd: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const nextPhase = (curPhase + 1) % PHASES.length;
      const nextProd = nextPhase === 0 ? (curProd + 1) % PRODUCTS.length : curProd;
      setPhase(nextPhase); setProductIdx(nextProd); setElapsed(0);
      scheduleNext(nextPhase, nextProd);
    }, PHASE_MS[curPhase]);
  }, []);

  useEffect(() => {
    if (prefersReduced || !visible) { if (timerRef.current) clearTimeout(timerRef.current); return; }
    scheduleNext(phase, productIdx);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, prefersReduced]);

  useEffect(() => {
    if (!visible || prefersReduced) return;
    const s = performance.now(); let r: number;
    const run = (n: number) => { setElapsed(Math.min((n - s) / PHASE_MS[phase], 1)); r = requestAnimationFrame(run); };
    r = requestAnimationFrame(run); return () => cancelAnimationFrame(r);
  }, [phase, visible, prefersReduced]);

  const PhaseComponent = PHASES[phase];
  const product = PRODUCTS[productIdx];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="select-none"
      aria-hidden="true"
    >
      <div>
        <div className="relative rounded-2xl bg-surface shadow-hero ring-1 ring-border/60 overflow-hidden">

          {/* macOS window bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-muted">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
            </div>
            <div className="flex items-center gap-1.5">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-success"
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-[10px] text-muted-foreground tracking-tight">
                shoppalyzer.app / analizy
              </span>
            </div>
            <div className="w-12" />
          </div>

          {/* Content */}
          <div className="p-5 min-h-[440px] flex flex-col">
            <StepBar phase={phase} />

            {/* Phase progress indicator */}
            <div className="h-0.5 rounded-full bg-muted mb-5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary/40"
                style={{ width: `${elapsed * 100}%` }}
              />
            </div>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                <PhaseComponent key={phase} product={product} />
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-primary-soft/60 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-success"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span>Analiza na żywo · Źródło: Allegro</span>
            </div>
            <span className="text-[10px] font-medium text-primary">Shoppalyzer AI</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
