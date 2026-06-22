import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_LOGIN_URL, APP_SIGNUP_URL } from '@/lib/app-links';

const navLinks = [
  { label: 'Korzyści', href: '#korzysci' },
  { label: 'Jak to działa', href: '#jak-to-dziala' },
  { label: 'Cennik', href: '#cennik' },
  { label: 'FAQ', href: '#faq' },
  { label: 'O nas', href: '/o-nas' },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const goToLogin = () => { window.location.href = APP_LOGIN_URL; };
  const goToSignup = () => { window.location.href = APP_SIGNUP_URL; };
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 120);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border/80 shadow-soft'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between h-[72px] lg:h-[80px]">
          {/* Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/shoppalyzer-logo.svg"
              alt="Shoppalyzer"
              className="h-9 lg:h-10 w-auto transition-transform group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="
                  relative text-sm font-medium text-foreground/75 hover:text-foreground
                  px-3.5 py-2 rounded-lg
                  hover:bg-surface-muted transition-colors
                "
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right cluster */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={goToLogin}
              className="
                text-sm font-medium text-foreground/75 hover:text-foreground
                px-3.5 py-2 rounded-lg hover:bg-surface-muted transition-colors
              "
            >
              Zaloguj się
            </button>
            <motion.button
              whileHover={{ y: -1, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              onClick={goToSignup}
              className="
                group inline-flex items-center gap-1.5
                bg-accent-brand text-accent-brand-foreground
                font-semibold text-sm px-4 py-2 rounded-lg
                shadow-soft hover:shadow-medium hover:bg-accent-brand-hover
                transition-all
              "
            >
              Wypróbuj za darmo
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg ring-1 ring-border text-foreground/80 hover:text-foreground hover:bg-surface-muted transition-colors"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="container py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="
                    block w-full text-left py-2.5 px-3 rounded-lg
                    text-base font-medium text-foreground/85
                    hover:text-foreground hover:bg-surface-muted
                    transition-colors
                  "
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setMobileOpen(false); goToSignup(); }}
                className="
                  mt-3 w-full inline-flex items-center justify-center gap-1.5
                  bg-accent-brand text-accent-brand-foreground
                  font-semibold text-base py-3 rounded-lg shadow-soft
                "
              >
                Wypróbuj za darmo
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => { setMobileOpen(false); goToLogin(); }}
                className="
                  w-full inline-flex items-center justify-center
                  text-base font-medium text-foreground/85 py-3 rounded-lg
                  ring-1 ring-border hover:bg-surface-muted transition-colors
                "
              >
                Zaloguj się
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
