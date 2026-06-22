import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { APP_SIGNUP_URL } from '@/lib/app-links';
import { Atmosphere } from './Atmosphere';

export const FinalCTA = () => {
  const navigate = useNavigate();
  const goToSignup = () => { window.location.href = APP_SIGNUP_URL; };

  return (
    <section id="final-cta" className="relative isolate py-12 lg:py-16 bg-brand-navy text-white overflow-hidden">
      <Atmosphere dark composition={2} />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="text-[11px] uppercase tracking-[0.22em] font-medium text-white/50 mb-5">
            Ostatni krok
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] text-white leading-[1.05] max-w-4xl">
            Twoja konkurencja analizuje ceny teraz.
            <br />
            <span className="text-[hsl(25_80%_72%)]">Ty też powinieneś.</span>
          </h2>

          <p className="mt-7 text-lg text-white/70 leading-relaxed max-w-2xl">
            Każdy dzień bez analizy to utracona marża. Dołącz do ponad 200 sprzedawców na Allegro,
            którzy każdego ranka wiedzą dokładnie, co zmienić, i robią to zanim zrobi to konkurent.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              onClick={goToSignup}
              className="
                group inline-flex items-center justify-center gap-2
                bg-accent-brand text-accent-brand-foreground
                font-semibold text-sm sm:text-base px-5 sm:px-7 py-3.5 rounded-xl
                shadow-medium hover:shadow-strong hover:bg-accent-brand-hover
                transition-all w-full sm:w-auto
              "
            >
              Wypróbuj Shoppalyzer za darmo
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              onClick={() => { navigate('/sample-report'); window.scrollTo(0, 0); }}
              className="
                group inline-flex items-center justify-center gap-1.5
                text-white font-medium text-sm sm:text-base px-5 sm:px-6 py-3.5 rounded-xl
                ring-1 ring-white/25 hover:ring-white/55 hover:bg-white/[0.04]
                transition-all w-full sm:w-auto
              "
            >
              Zobacz przykładowy raport
            </motion.button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/55">
            {['Bez karty kredytowej', 'Pierwsza analiza za darmo', 'Konfiguracja w 5 minut', 'Anuluj kiedy chcesz'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" strokeWidth={2.5} />
                <span>{t}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
