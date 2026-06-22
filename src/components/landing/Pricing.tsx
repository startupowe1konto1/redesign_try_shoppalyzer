import { motion } from 'framer-motion';
import { Check, Minus, Sparkles, ArrowRight, Clock, Plus, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { APP_SIGNUP_URL } from '@/lib/app-links';
import { cn } from '@/lib/utils';
import { SectionHeader } from './SectionHeader';
import { Atmosphere } from './Atmosphere';

type Tier = {
  name: string;
  status: 'active' | 'soon';
  price?: string;
  unit?: string;
  tagline: string;
  cta: string;
  features: { included: boolean; text: string }[];
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: 'Starter',
    status: 'active',
    price: '0',
    unit: 'PLN',
    tagline: 'Dla pojedynczych sprzedawców, którzy chcą sprawdzić swoją pozycję.',
    cta: 'Zacznij za darmo',
    highlight: true,
    features: [
      { included: true,  text: '3 analizy / miesiąc' },
      { included: true,  text: 'Pełna analiza: oś cenowa, „Co zrobić", „Ty vs zwycięzcy"' },
      { included: true,  text: 'Kontekst rynku i lista konkurentów' },
      { included: true,  text: 'Historia analiz' },
      { included: false, text: 'Eksport PDF' },
      { included: false, text: 'Batch CSV' },
    ],
  },
  {
    name: 'Pro',
    status: 'soon',
    tagline: 'Dla rosnących sklepów, które działają na danych.',
    cta: 'Skontaktuj się',
    features: [
      { included: true, text: 'Większy limit analiz' },
      { included: true, text: 'Wszystko ze Starter' },
      { included: true, text: 'Eksport raportów PDF' },
      { included: true, text: 'Batch CSV — wiele ofert naraz' },
      { included: true, text: 'Monitoring i alerty cenowe' },
    ],
  },
  {
    name: 'Agencja',
    status: 'soon',
    tagline: 'Dla agencji i konsultantów wielu sklepów.',
    cta: 'Skontaktuj się',
    features: [
      { included: true, text: 'Duży, elastyczny limit analiz' },
      { included: true, text: 'Wszystko z Pro' },
      { included: true, text: 'Masowy batch CSV' },
      { included: true, text: 'White-label PDF' },
      { included: true, text: 'Panel wielu klientów' },
      { included: true, text: 'Wsparcie priorytetowe' },
    ],
  },
];

export const Pricing = () => {
  const navigate = useNavigate();
  const goToSignup = () => { window.location.href = APP_SIGNUP_URL; };
  const goToContact = () => { navigate('/kontakt'); window.scrollTo(0, 0); };

  return (
    <section id="cennik" className="relative isolate overflow-hidden py-12 lg:py-16">
      <Atmosphere composition={3} />
      <div className="container relative">
        <SectionHeader
          index="03"
          label="Cennik"
          icon={Tag}
          subtitle="Zacznij od darmowych analiz. Wyższe plany już wkrótce."
          className="mb-10 lg:mb-14"
        >
          Sprawdź za darmo.
          <br />
          <span className="text-primary">Zapłać, kiedy zobaczysz korzyści.</span>
        </SectionHeader>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {tiers.map((tier, i) => {
            const soon = tier.status === 'soon';
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className={cn(
                  'relative flex flex-col rounded-2xl p-7 lg:p-8 transition-all duration-300',
                  tier.highlight
                    ? 'bg-surface ring-2 ring-primary/40 shadow-medium'
                    : 'bg-surface ring-1 ring-border hover:ring-primary/25 hover:shadow-medium',
                  soon && 'opacity-[0.92]',
                )}
              >
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  {tier.highlight ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] bg-success text-success-foreground px-3 py-1.5 rounded-full shadow-soft">
                      <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                      Dostępny teraz
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] bg-surface-muted text-muted-foreground ring-1 ring-border px-3 py-1.5 rounded-full shadow-soft">
                      <Clock className="h-3 w-3" strokeWidth={2.5} />
                      Wkrótce
                    </span>
                  )}
                </div>

                {/* Tier name */}
                <div className="text-[11px] uppercase tracking-[0.18em] font-medium mb-3 text-muted-foreground">
                  {tier.name}
                </div>

                {/* Price / soon */}
                {soon ? (
                  <div className="flex items-baseline mb-3 h-[60px]">
                    <span className="text-2xl font-bold text-muted-foreground/70">Dostępne wkrótce</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1.5 mb-3 h-[60px]">
                    <span className="text-5xl font-bold tabular-nums tracking-tighter text-foreground">{tier.price}</span>
                    <span className="text-sm font-medium text-muted-foreground">{tier.unit}</span>
                  </div>
                )}

                {/* Tagline */}
                <p className="text-sm leading-relaxed mb-7 text-muted-foreground">{tier.tagline}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((fe) => (
                    <li key={fe.text} className="flex items-start gap-2.5 text-sm">
                      {fe.included ? (
                        <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                          <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                        </span>
                      ) : (
                        <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground/50">
                          <Minus className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                      )}
                      <span className={fe.included ? 'text-foreground' : 'text-muted-foreground/55 line-through'}>
                        {fe.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  onClick={soon ? goToContact : goToSignup}
                  className={cn(
                    'group inline-flex items-center justify-center gap-1.5 font-semibold text-sm py-3 rounded-lg transition-all duration-300',
                    tier.highlight
                      ? 'bg-accent-brand text-accent-brand-foreground hover:bg-accent-brand-hover shadow-medium'
                      : 'bg-transparent text-foreground ring-1 ring-border hover:ring-foreground/40 hover:bg-surface-muted',
                  )}
                >
                  {tier.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Add-on: doładowania analiz */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 lg:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-surface ring-1 ring-border px-6 py-5"
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary ring-1 ring-primary/15">
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-brand-navy tracking-tight">Dodatkowe analizy — pakiet doładowań</h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground bg-surface-muted ring-1 ring-border px-2 py-0.5 rounded-full">
                <Clock className="h-2.5 w-2.5" strokeWidth={2.5} />
                Wkrótce
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">
              Wyczerpałeś limit w swoim planie? Dokup paczkę analiz bez zmiany abonamentu i analizuj dalej.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
