import { ArrowLeft, Shield, Database, Users, Globe, Clock, CheckCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

const Section = ({ icon, number, title, children }: { icon: React.ReactNode; number: string; title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: '#e5f3ff' }}>
        <span style={{ color: '#1E4D72' }}>{icon}</span>
      </div>
      <h2 className="text-xl font-bold" style={{ color: '#1E4D72' }}>{number}. {title}</h2>
    </div>
    <div className="pl-13 ml-1 border-l-2 pl-6" style={{ borderColor: '#E8843A' }}>
      {children}
    </div>
  </section>
);

const PolitykaPrywatnosci = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1E4D72, #102D45)' }} className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
<button
            onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
            style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: 'white', background: 'transparent', borderRadius: '8px', padding: '8px 16px', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}
          >
            <ArrowLeft className="h-4 w-4" />
            Wróć na stronę główną
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white">Polityka Prywatności</h1>
              <p className="text-white/70 mt-1 text-sm">Shoppalyzer Sp. z o.o. · ostatnia aktualizacja: 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlight bar */}
      <div style={{ background: '#E8843A' }} className="py-3 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-white text-sm font-medium text-center">
            🔒 Twoje dane są bezpieczne. Stosujemy zasady minimalizacji danych i przetwarzamy je wyłącznie w niezbędnym zakresie
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">

        <Section icon={<Shield className="h-5 w-5" />} number="1" title="Postanowienia ogólne i definicje">
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych podanych przez Użytkowników w związku z korzystaniem z platformy Shoppalyzer.</li>
            <li>Administratorem danych osobowych jest <strong className="text-foreground">Shoppalyzer Sp. z o.o.</strong>, z siedzibą w Poznaniu, NIP: XXXXXXXXX, e-mail: <a href="mailto:shoppalyzer@gmail.com" className="text-primary hover:underline">shoppalyzer@gmail.com</a></li>
            <li>Shoppalyzer to platforma oferująca wsparcie MŚP e-commerce poprzez napędzaną przez AI analizę konkurencji, automatyczne insighty cenowe i rekomendacje działań.</li>
            <li>Administrator stosuje zasady minimalizacji danych, ograniczenia celu przetwarzania, poufności oraz ograniczenia czasu przechowywania do niezbędnego minimum.</li>
          </ol>
        </Section>

        <Section icon={<Database className="h-5 w-5" />} number="2" title="Pozyskiwanie danych z domen publicznych (Web Scraping)">
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>Funkcjonowanie platformy opiera się na monitoringu cen, recenzji i stanu SKU z najpopularniejszych marketplace'ów.</li>
            <li>Pobierane dane rynkowe obejmują m.in.: nazwę produktu, cenę, liczbę recenzji, średnią ocenę, dostępność i ranking popularności.</li>
            <li>Większość pozyskiwanych informacji ma charakter czysto produktowy. Jeśli zebrane zostaną dane osobowe, są przetwarzane na podstawie prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO).</li>
          </ol>
        </Section>

        {/* Zakres danych — karty */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: '#e5f3ff' }}>
              <Database className="h-5 w-5" style={{ color: '#1E4D72' }} />
            </div>
            <h2 className="text-xl font-bold" style={{ color: '#1E4D72' }}>3. Zakres przetwarzanych danych</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 ml-1">
            {[
              { title: 'Dane rejestracyjne', desc: 'Imię, nazwisko, nazwa firmy, NIP, adres, e-mail, telefon', icon: '👤' },
              { title: 'Dane rozliczeniowe', desc: 'Informacje do obsługi subskrypcji, płatności i faktur VAT', icon: '💳' },
              { title: 'Dane techniczne', desc: 'Adres IP, data wizyty, system operacyjny, przeglądarka', icon: '⚙️' },
            ].map(c => (
              <div key={c.title} className="rounded-xl p-5 border" style={{ borderColor: '#e5f3ff', background: '#f8fbff' }}>
                <div className="text-2xl mb-2">{c.icon}</div>
                <h3 className="font-bold text-sm mb-1" style={{ color: '#1E4D72' }}>{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Section icon={<CheckCircle className="h-5 w-5" />} number="4" title="Cele i podstawy prawne przetwarzania">
          <div className="space-y-3">
            {[
              { base: 'art. 6 ust. 1 lit. b RODO', title: 'Świadczenie usługi SaaS', desc: 'Wykonanie umowy o świadczenie usług drogą elektroniczną.' },
              { base: 'art. 6 ust. 1 lit. c RODO', title: 'Obowiązki prawne', desc: 'Wystawianie faktur oraz prowadzenie dokumentacji księgowej i podatkowej.' },
              { base: 'art. 6 ust. 1 lit. f RODO', title: 'Prawnie uzasadniony interes', desc: 'Obsługa zapytań, komunikacja techniczna, wsparcie klienta, analiza i rozwój systemu.' },
            ].map(i => (
              <div key={i.title} className="flex gap-3 rounded-xl p-4" style={{ background: '#f8fbff', border: '1px solid #e5f3ff' }}>
                <span className="text-xs font-bold px-2 py-1 rounded-lg shrink-0 h-fit" style={{ background: '#E8843A', color: 'white' }}>{i.base}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">{i.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{i.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={<Users className="h-5 w-5" />} number="5" title="Odbiorcy danych osobowych">
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Dostawcy technologii i hostingu',
              'Operatorzy płatności (Stripe)',
              'Dostawcy AI i analizy danych',
              'Dostawcy narzędzi ekstrakcji danych',
              'Biura rachunkowe i kancelarie prawne',
              'Podmioty świadczące wsparcie IT',
            ].map(r => (
              <div key={r} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#E8843A' }}></div>
                {r}
              </div>
            ))}
          </div>
        </Section>

        <Section icon={<Globe className="h-5 w-5" />} number="6" title="Przekazywanie danych poza EOG">
          <p className="text-sm text-muted-foreground leading-relaxed">Z uwagi na korzystanie z globalnych usługodawców technologicznych dane osobowe mogą być przekazywane do państw trzecich, w tym do Stanów Zjednoczonych. Transfer opiera się na Standardowych Klauzulach Umownych (SCC) lub decyzjach Komisji Europejskiej zgodnych z RODO.</p>
        </Section>

        <Section icon={<Clock className="h-5 w-5" />} number="7" title="Okres przechowywania danych">
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>Dane konta: przez cały okres trwania umowy.</li>
            <li>Dane księgowe: <strong className="text-foreground">5 lat</strong> od końca roku, w którym upłynął termin płatności podatku.</li>
            <li>Logi systemowe: przez czas odpowiadający okresom przedawnienia roszczeń.</li>
          </ol>
        </Section>

        {/* Prawa użytkownika */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: '#e5f3ff' }}>
              <CheckCircle className="h-5 w-5" style={{ color: '#1E4D72' }} />
            </div>
            <h2 className="text-xl font-bold" style={{ color: '#1E4D72' }}>8. Prawa Użytkownika</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3 ml-1">
            {[
              'Prawo dostępu do danych i otrzymania kopii',
              'Prawo do sprostowania nieprawidłowych danych',
              'Prawo do usunięcia danych („prawo do bycia zapomnianym")',
              'Prawo do ograniczenia przetwarzania',
              'Prawo do przenoszenia danych',
              'Prawo do wniesienia sprzeciwu',
              'Prawo skargi do PUODO',
            ].map(r => (
              <div key={r} className="flex items-start gap-2 rounded-lg p-3" style={{ background: '#f8fbff', border: '1px solid #e5f3ff' }}>
                <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: '#E8843A' }} />
                <span className="text-sm text-muted-foreground">{r}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 ml-1 flex items-center gap-3 rounded-xl p-4" style={{ background: '#1E4D72' }}>
            <Mail className="h-5 w-5 text-white shrink-0" />
            <p className="text-white text-sm">Aby skorzystać ze swoich praw, napisz do nas: <a href="mailto:shoppalyzer@gmail.com" className="underline font-bold text-orange-300">shoppalyzer@gmail.com</a></p>
          </div>
        </section>

        <Section icon={<Shield className="h-5 w-5" />} number="9" title="Zmiany w Polityce Prywatności">
          <p className="text-sm text-muted-foreground leading-relaxed">Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności. O każdej istotnej zmianie Użytkownicy zostaną poinformowani z wyprzedzeniem poprzez komunikat na stronie lub drogą mailową.</p>
        </Section>

      </div>
    </div>
  );
};

export default PolitykaPrywatnosci;
