import {
  Shield, Database, Users, Globe, Clock, CheckCircle, Mail,
  User, CreditCard, Settings,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SubpageHero } from '@/components/landing/SubpageHero';
import { LegalSection, LegalSectionHead } from '@/components/landing/LegalSection';
import { SectionEmblem } from '@/components/landing/SectionEmblem';

const PolitykaPrywatnosci = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SubpageHero
        icon={Shield}
        label="Dokument prawny"
        title="Polityka Prywatności"
        subtitle="Shoppalyzer · ostatnia aktualizacja: 2026"
        noteIcon={Shield}
        note="Twoje dane są bezpieczne. Stosujemy zasady minimalizacji danych i przetwarzamy je wyłącznie w niezbędnym zakresie"
      />

      <div className="container mx-auto max-w-4xl px-4 py-12">

        <LegalSection icon={Shield} number="1." title="Postanowienia ogólne i definicje">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych podanych przez Użytkowników w związku z korzystaniem z platformy Shoppalyzer.</li>
            <li>Administratorem danych osobowych jest <strong className="text-foreground">Shoppalyzer</strong>, z siedzibą w Poznaniu, NIP: XXXXXXXXX, e-mail: <a href="mailto:shoppalyzer@gmail.com" className="text-primary hover:underline">shoppalyzer@gmail.com</a></li>
            <li>Shoppalyzer to platforma oferująca wsparcie MŚP e-commerce poprzez napędzaną przez AI analizę konkurencji, automatyczne insighty cenowe i rekomendacje działań.</li>
            <li>Administrator stosuje zasady minimalizacji danych, ograniczenia celu przetwarzania, poufności oraz ograniczenia czasu przechowywania do niezbędnego minimum.</li>
          </ol>
        </LegalSection>

        <LegalSection icon={Database} number="2." title="Pozyskiwanie danych z domen publicznych (Web Scraping)">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Funkcjonowanie platformy opiera się na monitoringu cen, recenzji i stanu SKU z najpopularniejszych marketplace'ów.</li>
            <li>Pobierane dane rynkowe obejmują m.in.: nazwę produktu, cenę, liczbę recenzji, średnią ocenę, dostępność i ranking popularności.</li>
            <li>Większość pozyskiwanych informacji ma charakter czysto produktowy. Jeśli zebrane zostaną dane osobowe, są przetwarzane na podstawie prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO).</li>
          </ol>
        </LegalSection>

        {/* Zakres danych — karty */}
        <section className="mb-10">
          <LegalSectionHead icon={Database} number="3." title="Zakres przetwarzanych danych" />
          <div className="ml-1 grid gap-4 md:grid-cols-3">
            {[
              { title: 'Dane rejestracyjne', desc: 'Imię, nazwisko, nazwa firmy, NIP, adres, e-mail, telefon', Icon: User },
              { title: 'Dane rozliczeniowe', desc: 'Informacje do obsługi subskrypcji, płatności i faktur VAT', Icon: CreditCard },
              { title: 'Dane techniczne', desc: 'Adres IP, data wizyty, system operacyjny, przeglądarka', Icon: Settings },
            ].map(c => (
              <div key={c.title} className="rounded-xl border border-border bg-surface p-5 shadow-soft">
                <SectionEmblem icon={c.Icon} size="sm" className="mb-3" />
                <h3 className="mb-1 text-sm font-bold text-brand-navy">{c.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <LegalSection icon={CheckCircle} number="4." title="Cele i podstawy prawne przetwarzania">
          <div className="space-y-3">
            {[
              { base: 'art. 6 ust. 1 lit. b RODO', title: 'Świadczenie usługi SaaS', desc: 'Wykonanie umowy o świadczenie usług drogą elektroniczną.' },
              { base: 'art. 6 ust. 1 lit. c RODO', title: 'Obowiązki prawne', desc: 'Wystawianie faktur oraz prowadzenie dokumentacji księgowej i podatkowej.' },
              { base: 'art. 6 ust. 1 lit. f RODO', title: 'Prawnie uzasadniony interes', desc: 'Obsługa zapytań, komunikacja techniczna, wsparcie klienta, analiza i rozwój systemu.' },
            ].map(i => (
              <div key={i.title} className="flex gap-3 rounded-xl border border-border bg-surface p-4">
                <span className="h-fit shrink-0 rounded-lg bg-accent-brand px-2 py-1 text-xs font-bold text-accent-brand-foreground">{i.base}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{i.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{i.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </LegalSection>

        <LegalSection icon={Users} number="5." title="Odbiorcy danych osobowych">
          <div className="grid gap-3 md:grid-cols-2">
            {[
              'Dostawcy technologii i hostingu',
              'Operatorzy płatności (Stripe)',
              'Dostawcy AI i analizy danych',
              'Dostawcy narzędzi ekstrakcji danych',
              'Biura rachunkowe i kancelarie prawne',
              'Podmioty świadczące wsparcie IT',
            ].map(r => (
              <div key={r} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 shrink-0 rounded-full bg-accent-brand" />
                {r}
              </div>
            ))}
          </div>
        </LegalSection>

        <LegalSection icon={Globe} number="6." title="Przekazywanie danych poza EOG">
          <p className="text-sm leading-relaxed text-muted-foreground">Z uwagi na korzystanie z globalnych usługodawców technologicznych dane osobowe mogą być przekazywane do państw trzecich, w tym do Stanów Zjednoczonych. Transfer opiera się na Standardowych Klauzulach Umownych (SCC) lub decyzjach Komisji Europejskiej zgodnych z RODO.</p>
        </LegalSection>

        <LegalSection icon={Clock} number="7." title="Okres przechowywania danych">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Dane konta: przez cały okres trwania umowy.</li>
            <li>Dane księgowe: <strong className="text-foreground">5 lat</strong> od końca roku, w którym upłynął termin płatności podatku.</li>
            <li>Logi systemowe: przez czas odpowiadający okresom przedawnienia roszczeń.</li>
          </ol>
        </LegalSection>

        {/* Prawa użytkownika */}
        <section className="mb-10">
          <LegalSectionHead icon={CheckCircle} number="8." title="Prawa Użytkownika" />
          <div className="ml-1 grid gap-3 md:grid-cols-2">
            {[
              'Prawo dostępu do danych i otrzymania kopii',
              'Prawo do sprostowania nieprawidłowych danych',
              'Prawo do usunięcia danych („prawo do bycia zapomnianym")',
              'Prawo do ograniczenia przetwarzania',
              'Prawo do przenoszenia danych',
              'Prawo do wniesienia sprzeciwu',
              'Prawo skargi do PUODO',
            ].map(r => (
              <div key={r} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-brand" />
                <span className="text-sm text-muted-foreground">{r}</span>
              </div>
            ))}
          </div>
          <div className="ml-1 mt-4 flex items-center gap-3 rounded-xl bg-brand-navy p-4">
            <Mail className="h-5 w-5 shrink-0 text-white" />
            <p className="text-sm text-white">Aby skorzystać ze swoich praw, napisz do nas: <a href="mailto:shoppalyzer@gmail.com" className="font-bold text-[hsl(25_80%_72%)] underline">shoppalyzer@gmail.com</a></p>
          </div>
        </section>

        <LegalSection icon={Shield} number="9." title="Zmiany w Polityce Prywatności">
          <p className="text-sm leading-relaxed text-muted-foreground">Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności. O każdej istotnej zmianie Użytkownicy zostaną poinformowani z wyprzedzeniem poprzez komunikat na stronie lub drogą mailową.</p>
        </LegalSection>

      </div>
    </div>
  );
};

export default PolitykaPrywatnosci;
