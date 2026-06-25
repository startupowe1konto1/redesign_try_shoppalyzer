import {
  Cookie, Shield, Clock, Building, Settings, Mail,
  Lock, BarChart3, CreditCard, Timer, HardDrive, Database, Bot, Cloud,
  Monitor, Globe,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SubpageHero } from '@/components/landing/SubpageHero';
import { LegalSection, LegalSectionHead } from '@/components/landing/LegalSection';
import { SectionEmblem } from '@/components/landing/SectionEmblem';

const PolitykaCookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SubpageHero
        icon={Cookie}
        label="Dokument prawny"
        title="Polityka Cookies"
        subtitle="Shoppalyzer · ostatnia aktualizacja: 2026"
        noteIcon={Cookie}
        note="Masz pełną kontrolę nad plikami cookies. Możesz je dostosować lub odrzucić w dowolnym momencie"
      />

      <div className="container mx-auto max-w-4xl px-4 py-12">

        <LegalSection icon={Cookie} number="1." title="Czym są pliki cookies?">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Pliki cookies (ciasteczka) to niewielkie pliki tekstowe, które są zapisywane na Twoim urządzeniu końcowym (komputerze, smartfonie, tablecie) podczas korzystania z platformy Shoppalyzer. Służą one do zapewnienia prawidłowego działania strony, zapamiętywania Twoich preferencji oraz zbierania danych analitycznych, które pomagają nam rozwijać nasze narzędzie.
          </p>
        </LegalSection>

        {/* Cele — karty */}
        <section className="mb-10">
          <LegalSectionHead icon={Shield} number="2." title="W jakim celu wykorzystujemy pliki cookies?" />
          <div className="ml-1 grid gap-4 md:grid-cols-2">
            {[
              { title: 'Niezbędne (Techniczne)', desc: 'Są absolutnie konieczne do prawidłowego funkcjonowania naszego dashboardu. Umożliwiają m.in. logowanie do konta, nawigację po stronie oraz utrzymanie bezpiecznej sesji użytkownika. Bez nich strona nie mogłaby działać.', Icon: Lock, required: true },
              { title: 'Funkcjonalne', desc: 'Pozwalają stronie zapamiętać wybrane przez Ciebie ustawienia (np. preferencje widoku, filtry analizowanych produktów), co znacząco ułatwia i przyspiesza codzienną pracę z narzędziem.', Icon: Settings, required: false },
              { title: 'Analityczne i Wydajnościowe', desc: 'Pomagają nam zrozumieć, w jaki sposób użytkownicy korzystają z platformy. Dzięki nim wiemy, które funkcje są najbardziej przydatne, a które wymagają optymalizacji. Zbierane dane są anonimowe.', Icon: BarChart3, required: false },
              { title: 'Bezpieczeństwo i płatności', desc: 'Wspierają procesy weryfikacji autentyczności użytkowników, zapobiegają oszustwom oraz są niezbędne do prawidłowej obsługi subskrypcji.', Icon: CreditCard, required: true },
            ].map(c => (
              <div key={c.title} className="rounded-xl border border-border bg-surface p-5 shadow-soft">
                <div className="mb-3 flex items-start justify-between">
                  <SectionEmblem icon={c.Icon} size="sm" />
                  {c.required
                    ? <span className="rounded-full bg-brand-navy px-2 py-1 text-xs font-bold text-white">Zawsze aktywne</span>
                    : <span className="rounded-full bg-accent-brand/10 px-2 py-1 text-xs font-bold text-accent-brand ring-1 ring-accent-brand/25">Opcjonalne</span>
                  }
                </div>
                <h3 className="mb-1 text-sm font-bold text-brand-navy">{c.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Czas przechowywania — karty */}
        <section className="mb-10">
          <LegalSectionHead icon={Clock} number="3." title="Rodzaje cookies ze względu na czas przechowywania" />
          <div className="ml-1 grid gap-4 md:grid-cols-2">
            {[
              { title: 'Cookies sesyjne', desc: 'Są to pliki tymczasowe, które przechowujemy w pamięci Twojej przeglądarki tylko do momentu zakończenia sesji (wylogowania się z platformy lub zamknięcia przeglądarki).', Icon: Timer },
              { title: 'Cookies stałe', desc: 'Pozostają na Twoim urządzeniu przez określony czas (zdefiniowany w parametrach pliku) lub do momentu ich ręcznego usunięcia. Służą m.in. do tego, abyś nie musiał logować się ponownie przy każdej wizycie.', Icon: HardDrive },
            ].map(c => (
              <div key={c.title} className="rounded-xl border border-border bg-surface p-5 shadow-soft">
                <SectionEmblem icon={c.Icon} size="sm" className="mb-3" />
                <h3 className="mb-1 text-sm font-bold text-brand-navy">{c.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Podmioty trzecie — karty */}
        <section className="mb-10">
          <LegalSectionHead icon={Building} number="4." title="Pliki cookies podmiotów trzecich" />
          <div className="ml-1 grid gap-4 md:grid-cols-2">
            {[
              { title: 'Supabase Inc', desc: 'Supabase to nasz dostawca backendu open-source, który obsługuje relacyjną bazę danych PostgreSQL, uwierzytelnianie użytkowników (logowanie, sesje, tokeny JWT) oraz komunikację danych w czasie rzeczywistym. Cookies i tokeny sesji Supabase są niezbędne do utrzymania bezpiecznego logowania i dostępu do Twojego konta.', Icon: Database },
              { title: 'Stripe', desc: 'W celu umożliwienia bezpiecznego procesowania płatności subskrypcyjnych, zintegrowaliśmy platformę z operatorem Stripe. Stripe stosuje własne pliki cookies w celu weryfikacji tożsamości, zapobiegania nadużyciom finansowym oraz obsługi płatności.', Icon: CreditCard },
              { title: 'Gemini (Google)', desc: 'Wykorzystujemy zaawansowane modele językowe Gemini do analizowania danych rynkowych i generowania rekomendacji. Integracja z infrastrukturą Google może wiązać się ze stosowaniem technicznych plików cookies służących autoryzacji zapytań i bezpieczeństwu danych.', Icon: Bot },
              { title: 'Vertex (Google Cloud)', desc: 'Platforma chmurowa Google, na której opieramy środowisko analityczne. Usługi Google Cloud mogą wykorzystywać pliki cookies lub podobne technologie do uwierzytelniania komunikacji oraz monitorowania wydajności i diagnostyki błędów.', Icon: Cloud },
            ].map(c => (
              <div key={c.title} className="rounded-xl border border-border bg-surface p-5 shadow-soft">
                <SectionEmblem icon={c.Icon} size="sm" className="mb-3" />
                <h3 className="mb-1 text-sm font-bold text-brand-navy">{c.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="ml-1 mt-4 rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Uwaga:</strong> Narzędzia takie jak Apify (do pobierania danych z marketplace) oraz Vertex AI (do analizy i modelowania) operują po stronie naszego serwera (backend) i nie zapisują bezpośrednio plików cookies na urządzeniu użytkownika.
          </div>
        </section>

        <LegalSection icon={Settings} number="5." title="Jak możesz zarządzać plikami cookies?">
          <div className="space-y-3">
            <div className="flex gap-3 rounded-xl border border-border bg-surface p-4">
              <SectionEmblem icon={Monitor} size="sm" />
              <div>
                <p className="mb-1 text-sm font-semibold text-foreground">Panel zgód na stronie (Cookie Banner)</p>
                <p className="text-xs leading-relaxed text-muted-foreground">Przy pierwszej wizycie na stronie Shoppalyzer zostaniesz poproszony o wyrażenie zgody na użycie ciasteczek funkcjonalnych i analitycznych. Swoje preferencje możesz w każdej chwili zmienić, używając przycisku „Zresetuj ustawienia cookies" na dole tej strony.</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-border bg-surface p-4">
              <SectionEmblem icon={Globe} size="sm" />
              <div>
                <p className="mb-1 text-sm font-semibold text-foreground">Ustawienia przeglądarki</p>
                <p className="text-xs leading-relaxed text-muted-foreground">Niezależnie od naszych ustawień, możesz zablokować automatyczną obsługę cookies lub wymusić każdorazowe informowanie o ich przesłaniu, zmieniając ustawienia swojej przeglądarki internetowej (zazwyczaj w zakładkach "Prywatność" lub "Bezpieczeństwo").</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-brand-navy p-4">
            <Mail className="h-5 w-5 shrink-0 text-white" />
            <p className="text-sm text-white">Pamiętaj: zablokowanie cookies niezbędnych może uniemożliwić korzystanie z konta na platformie. Pytania? <a href="mailto:shoppalyzer@gmail.com" className="font-bold text-[hsl(25_80%_72%)] underline">shoppalyzer@gmail.com</a></p>
          </div>

          {/* Reset cookie preferences — restores the consent banner */}
          <div className="mt-6 rounded-xl border border-border p-5">
            <p className="mb-2 text-sm font-semibold text-foreground">Chcesz zmienić swoje preferencje?</p>
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
              Możesz w każdej chwili zresetować swoje wybory dotyczące cookies. Po kliknięciu przycisku poniżej baner zgody pojawi się ponownie u dołu strony.
            </p>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('sp_cookies');
                window.dispatchEvent(new Event('shoppalyzer:open-cookie-settings'));
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              Zresetuj ustawienia cookies →
            </button>
          </div>
        </LegalSection>

      </div>
    </div>
  );
};

export default PolitykaCookies;
