import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { ServiceFlowAnimation } from './ServiceFlowAnimation';
import { Atmosphere } from './Atmosphere';
import { APP_SIGNUP_URL } from '@/lib/app-links';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0 },
};

export const HeroVariant1 = () => {
  const navigate = useNavigate();
  const goToSignup = () => { window.location.href = APP_SIGNUP_URL; };

  return (
    <section className="relative isolate overflow-hidden pt-24 pb-20 lg:pt-28 lg:pb-28">
      {/* Atmosphere: aurora glow + signature growth lines */}
      <Atmosphere variant="hero" />

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-16">
          {/* ─── Copy: entrance animation (transform-only, no layout shift) ─── */}
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
            className="min-w-0 mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left"
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[2.4rem] sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.04] tracking-[-0.03em] text-brand-navy"
            >
              Allegro nie powie Ci,
              <br />
              gdzie tracisz pieniądze.
              <br />
              <span className="text-primary">Shoppalyzer już tak.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground lg:mx-0"
            >
              Twój automatyczny analityk Allegro. Zamiast godzin w&nbsp;Excelu,
              dostajesz gotowe rekomendacje sprzedażowe.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={goToSignup}
                className="
                  group inline-flex items-center justify-center gap-2
                  bg-accent-brand text-accent-brand-foreground
                  font-semibold text-sm sm:text-base px-7 py-3.5 rounded-xl
                  shadow-medium hover:shadow-strong hover:bg-accent-brand-hover
                  transition-all w-full sm:w-auto
                "
              >
                Wypróbuj Shoppalyzer za darmo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => { navigate('/sample-report'); window.scrollTo(0, 0); }}
                className="
                  group inline-flex items-center justify-center gap-1.5
                  text-foreground font-medium text-sm sm:text-base px-6 py-3.5 rounded-xl
                  bg-surface ring-1 ring-border hover:ring-foreground/30 hover:bg-surface-muted
                  transition-all w-full sm:w-auto
                "
              >
                Zobacz przykładowy raport
                <ChevronRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              {['Bez karty kredytowej', 'Pierwsza analiza za darmo', 'Anuluj kiedy chcesz'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-success" strokeWidth={2.5} />
                  <span>{t}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Product demo: fixed width, gentle fade-in (no movement) ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-w-0 max-w-full mx-auto w-full sm:max-w-xl lg:mx-0 lg:max-w-none"
          >
            <ServiceFlowAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
