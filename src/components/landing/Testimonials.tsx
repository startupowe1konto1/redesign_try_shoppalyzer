import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { Atmosphere } from './Atmosphere';

const testimonials = [
  {
    initials: 'MK',
    quote:
      'To, co wyróżnia Shoppalyzer, to unikalne połączenie analizy trendów rynkowych z generatywnymi rekomendacjami AI. Narzędzie samo śledzi konkurencję na marketplaceach i podpowiada mi, które SKU warto teraz promować, a które usunąć z oferty.',
    name: 'Marta K.',
    role: 'właścicielka sklepu modowego',
  },
  {
    initials: 'PW',
    quote:
      'Przed poznaniem Shoppalyzera spędzałem kilka godzin w tygodniu w Excelu oraz na ofertach konkurencji. Teraz otwieram raport przy porannej kawie i wiem co zrobić. Shoppalyzer zwrócił się wielokrotnie.',
    name: 'Piotr W.',
    role: 'manager sklepu ze sprzętem sportowym',
  },
  {
    initials: 'AN',
    quote:
      'Jako właścicielka niewielkiego sklepu ze sprzętem muzycznym zawsze miałem problem z narzędziami, które były zbyt skomplikowane, albo zbyt drogie. Shoppalyzer to zmienił – za rozsądne pieniądze dostaję proste rekomendacje, które z łatwością wdrażam w życie. To nie jest tylko monitoring, to mój osobisty doradca',
    name: 'Anna N.',
    role: 'właścicielka sklepu ze sprzętem muzycznym',
  },
];

const Stars = () => (
  <div className="flex gap-0.5" role="img" aria-label="5 z 5 gwiazdek">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-3.5 w-3.5 fill-accent-brand text-accent-brand" />
    ))}
  </div>
);

export const Testimonials = () => (
  <section className="relative isolate overflow-hidden py-12 lg:py-16 bg-surface-muted/40">
    <Atmosphere composition={1} />
    <div className="container relative">
      <SectionHeader
        index="04"
        label="Opinie"
        icon={Star}
        subtitle="Dołącz do setek sklepów, które podjęły mądrzejsze decyzje dzięki Shoppalyzerowi."
        className="mb-10 lg:mb-14"
      >
        Sprzedawcy na Allegro
        <br />
        <span className="text-primary">już to wiedzą.</span>
      </SectionHeader>

      <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.initials}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="
              relative flex flex-col p-7 rounded-2xl
              bg-surface ring-1 ring-border
              hover:ring-primary/25 hover:shadow-medium
              transition-all duration-300
            "
          >
            {/* Decorative quote mark */}
            <Quote
              aria-hidden
              className="absolute top-6 right-6 h-7 w-7 text-primary/15"
              fill="currentColor"
              strokeWidth={0}
            />

            <Stars />

            <blockquote className="mt-4 text-[15px] text-foreground leading-relaxed flex-1">
              {t.quote}
            </blockquote>

            <figcaption className="mt-6 pt-5 border-t border-border flex items-center gap-3">
              <span className="
                inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                bg-primary text-primary-foreground
                font-semibold text-xs tracking-tight
              ">
                {t.initials}
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground tracking-tight">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);
