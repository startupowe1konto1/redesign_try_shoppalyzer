import { motion } from 'framer-motion';
import { Coffee, TrendingUp, Trash2, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ChipVariant } from '@/components/RecommendationChip';
import { SectionHeader } from './SectionHeader';
import { SectionEmblem } from './SectionEmblem';
import { Atmosphere } from './Atmosphere';

type Benefit = {
  Icon: LucideIcon;
  chip: ChipVariant;
  chipLabel: string;
  title: string;
  desc: string;
};

const benefits: Benefit[] = [
  {
    Icon: Coffee,
    chip: 'raise',
    chipLabel: 'codzienny zysk',
    title: 'Wygrywaj, zanim konkurencja wypije kawę.',
    desc: 'W dowolnym momencie, wygeneruj analizę swojej pozycji rynkowej. Sprawdzisz kto zyskuje przewagę i dlaczego.',
  },
  {
    Icon: TrendingUp,
    chip: 'raise',
    chipLabel: 'przychód +18%',
    title: 'Reaguj na podwyższony popyt z wyprzedzeniem i zwiększ przychód.',
    desc: 'Konkurent się wyprzedał? Shoppalyzer natychmiast wyłapuje tę lukę. Dostosuj cenę do wyższego popytu i zgarniaj zyski, zanim rynek zdąży zareagować.',
  },
  {
    Icon: Trash2,
    chip: 'lower',
    chipLabel: 'tnij straty',
    title: 'Mniej produktów. Więcej pieniędzy.',
    desc: 'To, że coś się sprzedaje, nie znaczy, że na siebie zarabia. Shoppalyzer pokazuje czarno na białym, które produkty absorbują Twój budżet.',
  },
  {
    Icon: FileText,
    chip: 'hold',
    chipLabel: 'white-label',
    title: 'Pokaż klientom dane, nie opinie.',
    desc: 'Pobierz raport PDF z Twoim logo (White-Label). Twarde liczby o utraconej marży i lukach rynkowych. Argument, którego nie da się podważyć.',
  },
];

export const BenefitsBento = () => (
  <section id="korzysci" className="relative isolate overflow-hidden py-12 lg:py-16">
    <Atmosphere composition={3} />
    <div className="container relative">
      {/* Section heading */}
      <SectionHeader
        index="01"
        label="Korzyści"
        icon={TrendingUp}
        subtitle="Twój automatyczny analityk Allegro. Działa za Ciebie."
        className="mb-10 lg:mb-14"
      >
        Inne narzędzia pokazują dane.
        <br />
        <span className="text-primary">Shoppalyzer mówi Ci, <span className="relative whitespace-nowrap">co zrobić.<span aria-hidden className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full bg-accent-brand/70" /></span></span>
      </SectionHeader>

      {/* Bento grid — full container width for balance */}
      <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
        {benefits.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="
              group relative p-7 lg:p-8 rounded-2xl
              bg-surface ring-1 ring-border
              hover:ring-primary/25 hover:shadow-medium
              transition-all duration-300
            "
          >
            <SectionEmblem icon={b.Icon} size="sm" className="mb-5" />

            <h3 className="text-xl font-bold tracking-tight text-foreground mb-2 leading-tight">
              {b.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {b.desc}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
