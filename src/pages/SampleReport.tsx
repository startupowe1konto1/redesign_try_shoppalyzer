import { useState } from 'react';
import {
  ArrowLeft, Download, Loader2, ArrowRight, ArrowUpRight, Check, Minus,
  Sparkles, Truck, Clock, Shield, Package, Tag, Star, FileSpreadsheet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { HeroDecoration } from '@/components/landing/HeroDecoration';
import { APP_SIGNUP_URL } from '@/lib/app-links';
import {
  PRODUCT, BAND, pct, ACTIONS, LONG_TERM, HYGIENE, GAP_ROWS, KPIS, INSIGHTS, COMPETITORS, zl,
  type IconKey, type Advantage,
} from '@/data/sample-report';

const ICONS: Record<IconKey, LucideIcon> = {
  tag: Tag, truck: Truck, clock: Clock, sparkles: Sparkles,
  shield: Shield, package: Package, star: Star, check: Check,
};

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

const advStyles: Record<Advantage, string> = {
  worse: 'text-danger',
  better: 'text-success',
  equal: 'text-muted-foreground',
};

const SampleReport = () => {
  const navigate = useNavigate();
  const goToSignup = () => { window.location.href = APP_SIGNUP_URL; };
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleExportPDF = async () => {
    setPdfLoading(true);
    try {
      const { generateReportPdf } = await import('@/lib/pdf/report-pdf');
      generateReportPdf();
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setPdfLoading(false);
    }
  };

  const equalFactors = GAP_ROWS.filter((r) => r.advantage === 'equal');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-hero pointer-events-none -z-10" />
      <HeroDecoration />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 relative z-10">

        {/* ── Header ── */}
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }} className="mb-10 max-w-3xl">
          <motion.button
            variants={fadeUp}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 mb-7 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Wróć na stronę główną
          </motion.button>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-brand-navy leading-[1.05] mb-5">
            Gotowe rekomendacje,
            <span className="text-primary block mt-1">zamiast godzin w Excelu.</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-medium">{PRODUCT.category}</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-xl md:text-2xl font-bold text-brand-navy tracking-tight mt-2">
            {PRODUCT.title}
          </motion.h2>
        </motion.div>

        {/* Toolbar (PDF) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex justify-end mb-6">
          <button
            onClick={handleExportPDF}
            disabled={pdfLoading}
            className="inline-flex items-center justify-center gap-2 bg-brand-navy text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md hover:bg-brand-navy/90 transition-all disabled:opacity-60"
          >
            {pdfLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Pobieranie…</> : <><Download className="h-4 w-4" /> Eksportuj PDF</>}
          </button>
        </motion.div>

        <div className="space-y-6">

          {/* ── 1. Twoja oferta — oś cenowa ── */}
          <Section title="Twoja oferta" eyebrow="Pozycja cenowa">
            <p className="text-lg font-bold text-danger">{PRODUCT.verdict}</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{PRODUCT.verdictNote}</p>

            <div className="mt-8 mb-2">
              <div className="relative h-2 rounded-full bg-foreground/10">
                <div className="absolute top-0 h-full rounded-full bg-success/30" style={{ left: `${pct(BAND.floor)}%`, width: `${pct(BAND.ceiling) - pct(BAND.floor)}%` }} />
                <div className="absolute -top-1 h-4 w-0.5 bg-success" style={{ left: `${pct(BAND.suggested)}%` }} />
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-danger ring-4 ring-surface" style={{ left: `${pct(BAND.yours)}%` }} />
              </div>
              <div className="relative h-10 mt-2 text-[11px]">
                <span className="absolute left-0 text-muted-foreground uppercase tracking-wider">← taniej</span>
                <span className="absolute right-0 text-muted-foreground uppercase tracking-wider">drożej →</span>
                <span className="absolute -translate-x-1/2 text-success font-semibold text-center leading-tight" style={{ left: `${pct(BAND.suggested)}%` }}>
                  sugestia<br />{zl(BAND.suggested)}
                </span>
                <span className="absolute -translate-x-1/2 text-danger font-bold text-center leading-tight" style={{ left: `${pct(BAND.yours)}%` }}>
                  Ty teraz<br />{zl(BAND.yours)}
                </span>
              </div>
            </div>
          </Section>

          {/* ── 2. Co zrobić — wg priorytetu ── */}
          <Section title="Co zrobić — wg priorytetu" eyebrow="Plan działania">
            <div className="space-y-3">
              {ACTIONS.map((a, i) => {
                const Icon = ICONS[a.icon];
                return (
                  <div key={a.title} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-brand text-accent-brand-foreground text-[12px] font-bold tabular-nums">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-[14px] font-bold text-brand-navy leading-snug">{a.title}</p>
                      <p className="text-[12px] text-muted-foreground mt-1">{a.evidence}</p>
                    </div>
                    <Icon className="h-4 w-4 text-muted-foreground/40 shrink-0 mt-1" />
                  </div>
                );
              })}

              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface-muted/60 p-4">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Star className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-bold text-brand-navy leading-snug">{LONG_TERM.title}</p>
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-primary bg-primary-soft px-2 py-0.5 rounded-full whitespace-nowrap">długoterminowe</span>
                  </div>
                  <p className="text-[12px] text-muted-foreground mt-1">{LONG_TERM.evidence}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-warning/30 bg-warning-soft px-4 py-3">
                <ArrowUpRight className="h-4 w-4 text-[hsl(38_92%_30%)] shrink-0 mt-0.5" />
                <p className="text-[12px] text-[hsl(38_92%_28%)] leading-relaxed">{HYGIENE}</p>
              </div>
            </div>
          </Section>

          {/* ── 3. Ty vs zwycięzcy ── */}
          <Section title="Ty vs zwycięzcy" eyebrow="Czynnik po czynniku">
            <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
              Porównanie z kohortą sprzedawców, którzy realnie sprzedają ten produkt (top sprzedaży).
            </p>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-left border-collapse min-w-[460px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-3 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/70">Czynnik</th>
                    <th className="py-2 px-3 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/70">Ty</th>
                    <th className="py-2 px-3 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/70">Zwycięzcy</th>
                    <th className="py-2 pl-3 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/70 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {GAP_ROWS.map((r) => {
                    const Icon = ICONS[r.icon];
                    return (
                      <tr key={r.factor} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 pr-3">
                          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand-navy">
                            <Icon className="h-3.5 w-3.5 text-muted-foreground/50" /> {r.factor}
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 text-[13px] tabular-nums ${r.advantage === 'worse' ? 'text-danger font-semibold' : 'text-foreground'}`}>{r.yours}</td>
                        <td className="py-2.5 px-3 text-[13px] tabular-nums text-foreground">{r.winners}</td>
                        <td className="py-2.5 pl-3 text-right">
                          {r.advantage === 'equal' ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                              <Minus className="h-3 w-3" /> na równi
                            </span>
                          ) : (
                            <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${advStyles[r.advantage]}`}>
                              <ArrowUpRight className="h-3 w-3 rotate-90" /> luka
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {equalFactors.length > 0 && (
              <p className="text-[12px] text-muted-foreground mt-3 flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
                Na równi: {equalFactors.map((fac) => fac.factor.toLowerCase()).join(', ')}.
              </p>
            )}
          </Section>

          {/* ── 4. Kontekst rynku ── */}
          <Section title="Kontekst rynku" eyebrow="Struktura popytu">
            <div className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border overflow-hidden mb-5">
              {KPIS.map((k) => (
                <div key={k.label} className="px-3 py-4 bg-gradient-card text-center">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">{k.label}</p>
                  <p className="text-lg md:text-xl font-bold tabular-nums text-brand-navy mt-1">{k.value}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2.5">
              {INSIGHTS.map((ins) => (
                <li key={ins} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-brand shrink-0" />
                  <span className="text-[13px] text-foreground/85 leading-relaxed">{ins}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* ── 5. Konkurenci ── */}
          <Section title="Konkurenci" eyebrow="Wg sprzedaży 30 dni">
            <div className="space-y-2">
              {COMPETITORS.map((c) => (
                <div key={c.seller} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${c.you ? 'border-danger/30 bg-danger-soft' : 'border-border bg-surface'}`}>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-semibold truncate ${c.you ? 'text-danger' : 'text-brand-navy'}`}>
                      {c.seller}{c.you && <span className="ml-1.5 text-[10px] uppercase tracking-wider font-bold">← to Ty</span>}
                    </p>
                    {c.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {c.badges.map((b) => (
                          <span key={b} className="text-[9px] font-medium text-muted-foreground bg-muted rounded px-1.5 py-0.5">{b}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[14px] font-bold tabular-nums text-brand-navy">{zl(c.price)}</p>
                    <p className="text-[11px] text-muted-foreground tabular-nums">{c.sales} szt.</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 6. Teaser Pro: CSV → batch → PDF ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-primary/20 bg-primary-soft/50 p-6 lg:p-7"
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <FileSpreadsheet className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-primary">Wkrótce w planie Pro</span>
                <h3 className="text-lg font-bold text-brand-navy tracking-tight mt-1">Analizuj cały asortyment naraz</h3>
                <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl leading-relaxed">
                  Wgraj plik CSV z linkami swoich ofert, a Shoppalyzer wygeneruje raport zbiorczy dla każdego produktu
                  i pozwoli pobrać wszystko jako jeden PDF — gotowy pod klienta lub własną analizę.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── 7. CTA (styl FinalCTA z landingu) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative mt-8 rounded-3xl bg-brand-navy text-white overflow-hidden px-6 py-12 lg:px-12 lg:py-16 text-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.025em] leading-[1.1]">
              Twoja konkurencja analizuje ceny teraz.
              <span className="block text-[hsl(25_80%_72%)] mt-1">Ty też powinieneś.</span>
            </h2>
            <p className="mt-5 text-base lg:text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
              Sprawdź dowolny produkt z Allegro i dostań taką analizę w kilka minut. Pierwsza analiza za darmo.
            </p>
            <motion.button
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              onClick={goToSignup}
              className="group mt-8 inline-flex items-center justify-center gap-2 bg-accent-brand text-accent-brand-foreground font-semibold text-base px-7 py-3.5 rounded-xl shadow-medium hover:shadow-strong hover:bg-accent-brand-hover transition-all"
            >
              Wypróbuj Shoppalyzer za darmo
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

const Section = ({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-medium p-6 lg:p-7"
  >
    <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-1.5">{eyebrow}</div>
    <h3 className="text-lg lg:text-xl font-bold text-brand-navy tracking-tight mb-4">{title}</h3>
    {children}
  </motion.section>
);

export default SampleReport;
