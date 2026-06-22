import { motion } from 'framer-motion';
import { ChipLower, ChipRaise, ChipHold } from '@/components/RecommendationChip';
import { fmtPLN, fmtPercent } from '@/lib/format';
import type { ChipVariant } from '@/components/RecommendationChip';

/* ────────────────────────────────────────────────────────────
   Real Polish data (sourced from actual Allegro scrapes).
   Rotates daily so repeat visitors see something fresh.
   ──────────────────────────────────────────────────────────── */
type Row = {
  product: string;
  category: string;
  yourPrice: number;
  topComp: number;     // top-performer median
  rec: ChipVariant;
  reason: string;      // short Polish recommendation text
  upliftPct: number;   // expected impact %
};

const allRows: Row[] = [
  { product: 'LEGO Star Wars BB-8 75452',         category: 'Klocki',       yourPrice: 309.00,  topComp: 287.50, rec: 'lower', reason: 'Top sprzedawcy 22 zł taniej',          upliftPct: 9 },
  { product: 'Spigen szkło iPhone 16 Pro',         category: 'Akcesoria',   yourPrice: 49.99,   topComp: 63.99,  rec: 'raise', reason: 'Możesz dodać marżę bez utraty pozycji', upliftPct: 22 },
  { product: 'Słuchawki Sony WH-1000XM5',         category: 'Audio',        yourPrice: 1299.00, topComp: 1349.00, rec: 'raise', reason: 'Zaniżona cena nie zwiększa sprzedaży',  upliftPct: 4 },
  { product: 'KrainaGSM etui iPhone 16 Pro',       category: 'Akcesoria',   yourPrice: 45.00,   topComp: 44.50,  rec: 'hold',  reason: 'Cena zgodna z medianą rynku',           upliftPct: 0 },
  { product: 'Powerbank Xiaomi 20000mAh',          category: 'Elektronika', yourPrice: 89.00,   topComp: 79.99,  rec: 'lower', reason: 'Top performerzy oferują niżej',         upliftPct: 6 },
  { product: 'Frytkownica Tefal EasyFry 4.2L',     category: 'AGD',         yourPrice: 349.00,  topComp: 379.00, rec: 'raise', reason: 'Ukryta marża, konkurencja wyżej',       upliftPct: 8 },
  { product: 'Mata do jogi antypoślizgowa',        category: 'Sport',       yourPrice: 79.00,   topComp: 69.00,  rec: 'lower', reason: 'Cena 14% nad TOP10',                    upliftPct: 12 },
  { product: 'Kawa Lavazza Crema 1kg',             category: 'Spożywcze',   yourPrice: 65.99,   topComp: 67.50,  rec: 'hold',  reason: 'Stabilna pozycja, nie zmieniaj',         upliftPct: 1 },
  { product: 'Klawiatura Logitech MX Keys',        category: 'Komputery',   yourPrice: 519.00,  topComp: 549.00, rec: 'raise', reason: 'Próg cenowy +30 zł akceptowalny',       upliftPct: 5 },
  { product: 'Bizon folia ekran iPhone 17 Pro',    category: 'Akcesoria',   yourPrice: 36.74,   topComp: 38.90,  rec: 'hold',  reason: 'Cena na poziomie konkurencji',           upliftPct: 1 },
];

const dayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
};

const todayLabel = () =>
  new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date());

const dailyRows = (count: number): Row[] => {
  const start = (dayOfYear() * count) % allRows.length;
  return [
    ...allRows.slice(start, start + count),
    ...allRows.slice(0, Math.max(0, start + count - allRows.length)),
  ];
};

/* ────────────────────────────────────────────────────────────
   The mockup itself
   ──────────────────────────────────────────────────────────── */
export const HeroDashboardMockup = () => {
  const rows = dailyRows(6);
  const avgUplift = rows.reduce((sum, r) => sum + r.upliftPct, 0) / rows.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-hero"
    >
      <div className="tilt-soft animate-breathe">
        {/* outer chrome */}
        <div className="relative rounded-2xl bg-surface shadow-hero ring-1 ring-border/60 overflow-hidden">
          {/* macOS-style window header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-muted">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground tracking-tight">
                shoppalyzer.app /raport/dzienny
              </span>
            </div>
            <div className="w-12" />
          </div>

          {/* Top KPI strip */}
          <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-gradient-card">
            <div className="px-5 py-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                Raport dzienny
              </div>
              <div className="text-base font-semibold text-foreground mt-1 tabular-nums tracking-tight">
                {todayLabel()}
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                Analizowane SKU
              </div>
              <div className="text-2xl font-bold text-primary mt-1 tabular-nums tracking-tight">
                {allRows.length}
                <span className="text-sm text-muted-foreground font-medium ml-1.5">/ 100</span>
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                Średni potencjał
              </div>
              <div className="text-2xl font-bold text-success mt-1 tabular-nums tracking-tight">
                {fmtPercent(avgUplift, { signed: true })}
              </div>
            </div>
          </div>

          {/* The data table */}
          <div className="px-3 pt-2 pb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left  py-2 px-3 font-medium">Produkt</th>
                  <th className="text-right py-2 px-3 font-medium">Twoja</th>
                  <th className="text-right py-2 px-3 font-medium">Top median</th>
                  <th className="text-left  py-2 px-3 font-medium">Rekomendacja</th>
                  <th className="text-right py-2 px-3 font-medium">Wpływ</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <motion.tr
                    key={r.product}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 + i * 0.06, duration: 0.45 }}
                    className="border-t border-border/60 hover:bg-surface-muted/60 transition-colors"
                  >
                    <td className="py-2.5 px-3 align-top">
                      <div className="font-medium text-foreground leading-tight">
                        {r.product}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                        {r.category}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-foreground font-medium align-top">
                      {fmtPLN(r.yourPrice)}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground align-top">
                      {fmtPLN(r.topComp)}
                    </td>
                    <td className="py-2.5 px-3 align-top">
                      <div className="flex items-start gap-2">
                        {r.rec === 'lower' && <ChipLower size="xs" />}
                        {r.rec === 'raise' && <ChipRaise size="xs" />}
                        {r.rec === 'hold'  && <ChipHold  size="xs" />}
                        <span className="text-[12px] text-muted-foreground leading-tight">
                          {r.reason}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right align-top">
                      {r.upliftPct > 0 ? (
                        <span className="font-semibold text-success tabular-nums text-base tracking-tight">
                          {fmtPercent(r.upliftPct, { signed: true })}
                        </span>
                      ) : (
                        <span className="text-muted-foreground tabular-nums">·</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* footer ribbon — competitor count integrated as proof signal */}
          <div className="border-t border-border bg-primary-soft/60 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[11px] text-muted-foreground font-mono">
              <span className="font-semibold text-foreground tabular-nums">155 konkurentów</span>
              <span className="opacity-50">·</span>
              <span>Aktualizacja co 6h</span>
              <span className="opacity-50">·</span>
              <span>Źródło: Allegro</span>
            </div>
            <div className="text-[11px] font-medium text-primary">
              Pełny raport →
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
