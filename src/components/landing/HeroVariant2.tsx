import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroDashboardMockup } from './HeroDashboardMockup';
import { HeroDecoration } from './HeroDecoration';
import { APP_SIGNUP_URL } from '@/lib/app-links';

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

export const HeroVariant2 = () => {
  const navigate = useNavigate();
  const goToSignup = () => { window.location.href = APP_SIGNUP_URL; };

  return (
    <section className="relative isolate overflow-hidden bg-gradient-hero pt-20 pb-24 lg:pt-28 lg:pb-32">
      <HeroDecoration />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12, delayChildren: 0.05 }}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 mb-7"
            >
              <Clock className="h-3.5 w-3.5 text-accent-brand" strokeWidth={2.5} />
              <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-foreground/70">
                Sprzedawcy odzyskują 6+ godzin tygodniowo
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="text-[1.875rem] sm:text-4xl md:text-5xl lg:text-[3.6rem] xl:text-[4rem] font-bold leading-[1.05] tracking-[-0.025em] text-brand-navy break-words"
            >
              6 godzin w&nbsp;Excelu tygodniowo.
              <br />
              <span className="text-primary">Ile to kosztuje Twój biznes?</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-7 text-lg leading-relaxed text-muted-foreground max-w-xl"
            >
              Każda godzina spędzona na ręcznym sprawdzaniu cen to godzina, której nie poświęcasz
              na rozwój sklepu. Shoppalyzer dostarcza gotową analizę każdego ranka. Co przepricować,
              co promować, czego się pozbyć. Ty tylko czytasz i działasz.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                onClick={goToSignup}
                className="group inline-flex items-center justify-center gap-2 bg-accent-brand text-accent-brand-foreground font-semibold text-sm sm:text-base px-5 sm:px-7 py-3.5 rounded-xl shadow-medium hover:shadow-strong transition-shadow w-full sm:w-auto"
              >
                Odzyskaj swój czas. Zacznij za darmo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                onClick={() => { navigate('/sample-report'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center justify-center gap-1.5 text-foreground font-medium text-sm sm:text-base px-5 sm:px-6 py-3.5 rounded-xl ring-1 ring-border hover:ring-foreground/30 hover:bg-surface-muted transition-all w-full sm:w-auto"
              >
                Zobacz przykładowy raport
                <ChevronRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
            >
              {['Bez karty kredytowej', 'Konfiguracja w 5 minut', 'Pierwsze 100 SKU gratis'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-success" strokeWidth={2.5} />
                  <span>{t}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>

          <div className="relative hidden md:block lg:pl-4">
            <HeroDashboardMockup />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
};
