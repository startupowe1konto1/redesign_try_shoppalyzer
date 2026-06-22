import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { APP_SIGNUP_URL } from '@/lib/app-links';

/**
 * Persistent primary CTA. Appears after the user scrolls past ~70% of the
 * first viewport, and hides again when the bottom FinalCTA section is visible
 * (so we never show two competing CTAs at once).
 */
export const StickyCTA = () => {
  const [show, setShow] = useState(false);
  const goToSignup = () => { window.location.href = APP_SIGNUP_URL; };

  useEffect(() => {
    const finalCta = document.getElementById('final-cta');

    let finalVisible = false;

    const update = () => {
      // Defer to the cookie-consent banner: it lives at the same bottom edge,
      // so don't show the sticky CTA until consent has been handled (banner gone).
      const consentGiven = !!localStorage.getItem('sp_cookies');
      const scrolledEnough = window.scrollY > window.innerHeight * 0.7;
      setShow(consentGiven && scrolledEnough && !finalVisible);
    };

    let observer: IntersectionObserver | undefined;
    if (finalCta) {
      observer = new IntersectionObserver(
        ([entry]) => { finalVisible = entry.isIntersecting; update(); },
        { threshold: 0 },
      );
      observer.observe(finalCta);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      observer?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pointer-events-none sm:px-6 sm:pb-5"
        >
          <div className="container pointer-events-auto">
            <div className="
              flex items-center justify-between gap-4
              rounded-2xl bg-brand-navy text-white shadow-strong
              ring-1 ring-white/10
              px-4 py-3 sm:px-6 sm:py-4
            ">
              <span className="hidden sm:block text-sm font-medium text-white/85">
                Zacznij analizować Allegro już dziś — pierwsza analiza za darmo.
              </span>
              <button
                onClick={goToSignup}
                className="
                  group inline-flex items-center justify-center gap-2 w-full sm:w-auto
                  bg-accent-brand text-accent-brand-foreground
                  font-semibold text-sm px-5 py-3 rounded-xl
                  shadow-medium hover:bg-accent-brand-hover
                  transition-colors
                "
              >
                Wypróbuj za darmo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
