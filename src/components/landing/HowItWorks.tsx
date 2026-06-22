import { motion } from 'framer-motion';
import { Upload, ScanSearch, FileBarChart2, ArrowUpRight, Route } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const allegroUrl =
  'https://allegro.pl/pomoc/aktualnosci/pobierz-plik-z-ofertami-latwiej-zarzadzaj-sprzedaza-5Lna5EqRxSZ?srsltid=AfmBOoruKM26zkG_dpXYsNNqHujkLx67ZssI7992cQEs523pTz6Dy97p';

type Step = {
  Icon: LucideIcon;
  title: string;
  desc?: string;
  hasInstructionLink?: boolean;
};

const steps: Step[] = [
  {
    Icon: Upload,
    title: 'Wgraj swoje produkty',
    hasInstructionLink: true,
  },
  {
    Icon: ScanSearch,
    title: 'Analizujemy rynek za Ciebie',
    desc: 'Shoppalyzer automatycznie identyfikuje Twoją konkurencję na Allegro i zbiera dane o cenach, pozycjach.',
  },
  {
    Icon: FileBarChart2,
    title: 'Dostajesz gotowy raport',
    desc: 'Konkretne rekomendacje: na którym produkcie zmienić cenę, co promować, czego się pozbyć. Eksport do PDF jednym kliknięciem.',
  },
];

export const HowItWorks = () => (
  <section
    id="jak-to-dziala"
    className="relative isolate py-12 lg:py-16 bg-brand-navy text-white overflow-hidden"
  >
    {/* faint radial accent */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: 'radial-gradient(circle at 18% 0%, hsl(207 58% 32% / 0.55), transparent 48%)' }}
    />

    <div className="container relative">
      <SectionHeader
        index="02"
        label="Jak to działa"
        icon={Route}
        dark
        subtitle="Bez IT. Bez developera. Bez żadnej konfiguracji technicznej."
        className="mb-10 lg:mb-14"
      >
        Od zera do gotowego raportu
        <br />
        <span className="text-accent-brand">w 3 prostych krokach.</span>
      </SectionHeader>

      <div className="relative max-w-6xl mx-auto">
        {/* Connecting horizontal line — fades in */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          className="hidden md:block absolute top-[58px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.65, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
<div className="relative p-7 rounded-2xl bg-white/[0.04] ring-1 ring-white/10 hover:ring-accent-brand/40 hover:bg-white/[0.06] transition-all duration-300">
                {/* Icon tile */}
                <div className="
                  relative inline-flex h-12 w-12 items-center justify-center rounded-xl
                  bg-white/10 text-white ring-1 ring-white/15 mb-5
                ">
                  <s.Icon className="h-5 w-5" strokeWidth={2} />
                </div>

                <div className="text-[10px] uppercase tracking-[0.18em] font-medium text-accent-brand mb-2">
                  Krok {i + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug tracking-tight">
                  {s.title}
                </h3>

                {s.hasInstructionLink ? (
                  <p className="text-sm text-white/65 leading-relaxed">
                    Podaj bezpośredni link do oferty lub wczytaj plik CSV z ofertami sklepu. Instrukcja jak to zrobić:{' '}
                    <a
                      href={allegroUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-1
                        text-accent-brand font-medium
                        underline decoration-accent-brand/40 underline-offset-2
                        hover:decoration-accent-brand
                        transition-colors
                      "
                    >
                      Instrukcja pobierania
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </p>
                ) : (
                  <p className="text-sm text-white/65 leading-relaxed">{s.desc}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
