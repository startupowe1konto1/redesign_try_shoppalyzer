import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CookiePrefs {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
}

export const CookieConsent = () => {
  const navigate = useNavigate();
  const [visible, setBanner] = useState(false);
  const [modal, setModal] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sp_cookies');
    if (saved) {
      // Consent already given — initialize chosen analytics, but render nothing
      const prefs: CookiePrefs = JSON.parse(saved);
      setFunctional(prefs.functional);
      setAnalytics(prefs.analytics);
      if (prefs.functional) initFunctional();
      if (prefs.analytics) initAnalytics();
    } else {
      setBanner(true);
    }

    // Allow other parts of the app (e.g. /polityka-cookies "Reset preferences" link)
    // to re-open the consent banner without a full reload.
    const reopen = () => setBanner(true);
    window.addEventListener('shoppalyzer:open-cookie-settings', reopen);
    return () => window.removeEventListener('shoppalyzer:open-cookie-settings', reopen);
  }, []);

  const initFunctional = () => {
    // Placeholder for functional cookies (Supabase session preferences, view filters).
    // Add real initialization here when functional features go live.
  };

  // Google Tag Manager container — only injected after the user grants
  // analytics consent. Was previously loaded unconditionally in index.html,
  // which violated GDPR/ePrivacy. Idempotent: skips if already loaded.
  const GTM_ID = 'GTM-T2WC3R6P';

  const initAnalytics = () => {
    if (typeof window === 'undefined') return;
    if ((window as unknown as { _gtmLoaded?: boolean })._gtmLoaded) return;

    // dataLayer + gtm.start (the snippet GTM ships)
    (window as unknown as { dataLayer?: unknown[] }).dataLayer =
      (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });

    // Inject the GTM script tag
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(s);

    // Inject the <noscript> fallback iframe for non-JS clients (rare for SPAs
    // but matches the original GTM install snippet).
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.appendChild(noscript);

    (window as unknown as { _gtmLoaded?: boolean })._gtmLoaded = true;
  };

  const save = (prefs: CookiePrefs) => {
    localStorage.setItem('sp_cookies', JSON.stringify(prefs));
    setBanner(false);
    setModal(false);
    if (prefs.functional) initFunctional();
    if (prefs.analytics) initAnalytics();
  };

  const acceptAll = () => save({ necessary: true, functional: true, analytics: true });
  const rejectOptional = () => save({ necessary: true, functional: false, analytics: false });
  const savePrefs = () => save({ necessary: true, functional, analytics });

  return (
    <>
      {/* BANER */}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4">
          <div className="w-full max-w-3xl rounded-t-2xl p-6 relative" style={{ background: '#1E4D72' }}>
            <button
              onClick={rejectOptional}
              className="absolute top-3 right-4 text-white/70 hover:text-white text-xl font-bold leading-none bg-transparent border-none cursor-pointer"
              title="Zamknij (odrzuć opcjonalne)"
              aria-label="Zamknij baner cookies"
            >
              ×
            </button>
            <h3 className="text-white font-bold text-base mb-2">Dbamy o Twój komfort pracy w Shoppalyzer</h3>
            <p className="text-white/85 text-sm leading-relaxed mb-4">
              Wykorzystujemy pliki cookies, aby nasz system działał stabilnie i bezpiecznie (ciasteczka niezbędne). Za Twoją zgodą my oraz nasi partnerzy (m.in. Supabase Inc i Stripe) chcemy używać dodatkowych plików cookies, aby analizować ruch w aplikacji i zapamiętywać Twoje preferencje biznesowe. Szczegóły w{' '}
              <button onClick={() => { navigate('/polityka-prywatnosci'); window.scrollTo(0, 0); }} className="underline text-orange-400">Polityce Prywatności</button>.
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={acceptAll} className="px-5 py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: '#E8843A' }}>Akceptuję wszystkie</button>
              <button onClick={rejectOptional} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white border border-white/40 bg-transparent">Odrzuć opcjonalne</button>
              <button onClick={() => { setBanner(false); setModal(true); }} className="px-5 py-2.5 rounded-lg text-sm text-white/75 underline bg-transparent border-none">Dostosuj ustawienia</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative">
            <button
              onClick={() => { setModal(false); setBanner(true); }}
              className="absolute top-4 right-5 text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none bg-transparent border-none cursor-pointer"
              title="Zamknij"
              aria-label="Zamknij ustawienia cookies"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-1" style={{ color: '#1E4D72' }}>Zarządzanie ustawieniami prywatności</h3>
            <p className="text-sm text-gray-500 mb-5">Możesz dostosować swoje preferencje poniżej.</p>

            {/* Niezbędne */}
            <div className="border border-gray-200 rounded-xl p-4 mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold" style={{ color: '#1E4D72' }}>Niezbędne</span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: '#e5f3ff', color: '#1E4D72' }}>Zawsze aktywne</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">Kluczowe dla logowania do dashboardu, bezpiecznej sesji i procesowania płatności Stripe. Bez nich aplikacja nie będzie działać.</p>
            </div>

            {/* Funkcjonalne */}
            <div className="border border-gray-200 rounded-xl p-4 mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold" style={{ color: '#1E4D72' }}>Funkcjonalne</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={functional} onChange={e => setFunctional(e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-400 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">Pozwalają zapamiętać Twoje filtry i ustawienia widoku, dzięki czemu nie konfigurujesz ich przy każdym logowaniu.</p>
            </div>

            {/* Analityczne */}
            <div className="border border-gray-200 rounded-xl p-4 mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold" style={{ color: '#1E4D72' }}>Analityczne</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={analytics} onChange={e => setAnalytics(e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-400 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">Supabase Inc to nasz dostawca backendu. Zarządza bazą danych, sesją logowania i strumieniowaniem danych w czasie rzeczywistym. Pliki analityczne pomagają nam monitorować stabilność połączeń i optymalizować zapytania do bazy.</p>
            </div>

            <button onClick={savePrefs} className="w-full py-3 rounded-lg text-sm font-bold text-white mt-2" style={{ background: '#E8843A' }}>Zapisz moje preferencje</button>
          </div>
        </div>
      )}

    </>
  );
};
