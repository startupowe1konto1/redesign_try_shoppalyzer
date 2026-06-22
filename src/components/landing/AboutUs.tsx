import { motion } from 'framer-motion';
import { Target, Eye, Sparkles, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Block = { Icon: LucideIcon; title: string; desc: string };

const blocks: Block[] = [
  {
    Icon: Target,
    title: 'Nasza misja',
    desc: 'Dać każdemu sprzedawcy na Allegro, niezależnie od wielkości firmy, dostęp do takich danych i rekomendacji, jakie wcześniej mieli tylko najwięksi gracze z własnymi działami analitycznymi. Decyzje biznesowe powinny opierać się na faktach, nie na przeczuciach.',
  },
  {
    Icon: Eye,
    title: 'Nasza wizja',
    desc: 'Chcemy, by Shoppalyzer stał się standardowym narzędziem każdego sprzedawcy na Allegro, tak naturalnym jak sprawdzanie poczty. Marzy nam się rynek, na którym sprzedawcy konkurują jakością i strategią, nie zgadywaniem.',
  },
  {
    Icon: Sparkles,
    title: 'Co nas wyróżnia',
    desc: 'Nie budujemy kolejnego ogólnego narzędzia „dla wszystkich". Skupiamy się wyłącznie na Allegro i specyfice tej platformy: cenach, ofertach, promocjach i zachowaniach kupujących. Dlatego nasze analizy są precyzyjne i od razu przekładają się na konkretne działania, a nie tylko ładne wykresy.',
  },
  {
    Icon: Users,
    title: 'Dla kogo jesteśmy',
    desc: 'Dla sprzedawców, którzy chcą rozwijać biznes na Allegro w oparciu o dane, niezależnie od tego, czy prowadzą jednoosobowy sklep, czy zarządzają szerokim portfolio. Jeśli chcesz podejmować lepsze decyzje cenowe i nie przegapić momentu, w którym tracisz przewagę, jesteśmy tu dla Ciebie.',
  },
];

export const AboutUs = () => (
  <section id="o-nas" className="relative py-24 lg:py-32 bg-surface-muted/40">
    <div className="container">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center mb-14 lg:mb-20"
      >
        <div className="text-[11px] uppercase tracking-[0.22em] font-medium text-muted-foreground mb-5">
          O nas
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-[2.85rem] font-bold tracking-[-0.025em] text-brand-navy leading-[1.1]">
          Dane zamiast intuicji.
          <br />
          <span className="text-primary">Dla każdego sprzedawcy.</span>
        </h2>
      </motion.div>

      {/* Nasza historia — featured narrative */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto mb-12 lg:mb-14 rounded-2xl bg-surface ring-1 ring-border p-7 lg:p-10"
      >
        <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-accent-brand mb-4">
          Nasza historia
        </div>
        <div className="space-y-4 text-base lg:text-lg text-foreground/85 leading-relaxed">
          <p>
            Shoppalyzer powstał z prostej obserwacji: sprzedawcy na Allegro codziennie podejmują dziesiątki decyzji
            cenowych i asortymentowych, opierając się na intuicji, zamiast na danych. Widzieliśmy, jak wiele firm,
            nawet bardzo dobrze prowadzonych, traci marżę tylko dlatego, że nie ma czasu ani narzędzi, by śledzić,
            co robi konkurencja.
          </p>
          <p>
            Zamiast kolejnego arkusza Excela, który trzeba samodzielnie aktualizować, stworzyliśmy narzędzie, które
            robi to za sprzedawcę: automatycznie i bez wysiłku.
          </p>
        </div>
      </motion.div>

      {/* Misja / Wizja / Co nas wyróżnia / Dla kogo */}
      <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto">
        {blocks.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="group relative p-7 lg:p-8 rounded-2xl bg-surface ring-1 ring-border hover:ring-primary/25 hover:shadow-medium transition-all duration-300"
          >
            <div className="
              inline-flex h-11 w-11 items-center justify-center rounded-xl
              bg-primary-soft text-primary ring-1 ring-primary/15
              group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary
              transition-all duration-300 mb-5
            ">
              <b.Icon className="h-5 w-5" strokeWidth={2} />
            </div>
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
