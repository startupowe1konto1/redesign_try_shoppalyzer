import { ArrowLeft, FileText, Tag, Settings, Monitor, UserPlus, CreditCard, Copyright, Scale, AlertTriangle, MessageSquare, BookOpen, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

const Section = ({ icon, number, title, children }: { icon: React.ReactNode; number: string; title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: '#e5f3ff' }}>
        <span style={{ color: '#1E4D72' }}>{icon}</span>
      </div>
      <h2 className="text-xl font-bold" style={{ color: '#1E4D72' }}>{number} {title}</h2>
    </div>
    <div className="ml-1 border-l-2 pl-6" style={{ borderColor: '#E8843A' }}>
      {children}
    </div>
  </section>
);

const Regulamin = () => {
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
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white">Regulamin Świadczenia Usług</h1>
              <p className="text-white/70 mt-1 text-sm">Shoppalyzer Sp. z o.o. · ostatnia aktualizacja: 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlight bar */}
      <div style={{ background: '#E8843A' }} className="py-3 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-white text-sm font-medium text-center">
            📋 Platforma dedykowana wyłącznie dla przedsiębiorców (B2B). Przepisy o ochronie konsumentów nie mają zastosowania
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">

        <Section icon={<FileText className="h-5 w-5" />} number="§ 1." title="Postanowienia ogólne">
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>Niniejszy Regulamin określa ogólne warunki, zasady oraz sposób świadczenia usług drogą elektroniczną w modelu SaaS (Software as a Service) za pośrednictwem platformy internetowej Shoppalyzer (dalej: „Platforma" lub „Aplikacja").</li>
            <li>Usługodawcą i administratorem Platformy jest <strong className="text-foreground">Shoppalyzer Sp. z o.o.</strong> z siedzibą w Poznaniu, NIP: XXXXXXXXXX, e-mail: <a href="mailto:shoppalyzer@gmail.com" className="text-primary hover:underline">shoppalyzer@gmail.com</a></li>
            <li>Aplikacja Shoppalyzer jest dedykowana wyłącznie dla przedsiębiorców: osób fizycznych prowadzących działalność gospodarczą, osób prawnych oraz jednostek organizacyjnych nieposiadających osobowości prawnej (sektor B2B, w szczególności MŚP e-commerce). Przepisy dotyczące praw konsumentów nie mają zastosowania.</li>
            <li>Przed rozpoczęciem korzystania z Platformy Użytkownik jest zobowiązany do zapoznania się z Regulaminem oraz Polityką Prywatności i do ich akceptacji.</li>
          </ol>
        </Section>

        {/* Definicje — karty */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: '#e5f3ff' }}>
              <Tag className="h-5 w-5" style={{ color: '#1E4D72' }} />
            </div>
            <h2 className="text-xl font-bold" style={{ color: '#1E4D72' }}>§ 2. Definicje</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 ml-1">
            {[
              { title: 'Użytkownik', desc: 'Przedsiębiorca posiadający Konto na Platformie.', icon: '👤' },
              { title: 'Konto', desc: 'Indywidualny panel Użytkownika w Aplikacji, gdzie gromadzone są dane, analizy i rekomendacje.', icon: '🖥️' },
              { title: 'Subskrypcja', desc: 'Odpłatna usługa cykliczna umożliwiająca dostęp do pełnych funkcjonalności Platformy w wybranym okresie rozliczeniowym.', icon: '🔄' },
            ].map(c => (
              <div key={c.title} className="rounded-xl p-5 border" style={{ borderColor: '#e5f3ff', background: '#f8fbff' }}>
                <div className="text-2xl mb-2">{c.icon}</div>
                <h3 className="font-bold text-sm mb-1" style={{ color: '#1E4D72' }}>{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Section icon={<Settings className="h-5 w-5" />} number="§ 3." title="Rodzaj i zakres świadczonych usług">
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>Shoppalyzer to inteligentny asystent biznesowy dla e-commerce (AI-powered business advisor).</li>
            <li>Podstawowe usługi świadczone w ramach Platformy obejmują:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Automatyczny monitoring cen, recenzji i stanu magazynowego (SKU) z wybranych marketplace'ów na podstawie dostarczonych przez Użytkownika danych.</li>
                <li>Analizę trendingowości produktów przy wsparciu algorytmów sztucznej inteligencji.</li>
                <li>Dostarczanie generatywnych rekomendacji tekstowych (tzw. "text-first" approach), sugerujących konkretne działania rynkowe.</li>
                <li>Dostęp do zintegrowanego dashboardu analitycznego prezentującego m.in. porównania do konkurencyjnych listingów.</li>
              </ul>
            </li>
          </ol>
        </Section>

        <Section icon={<Monitor className="h-5 w-5" />} number="§ 4." title="Wymagania techniczne">
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>Do prawidłowego korzystania z Platformy niezbędne jest: urządzenie z dostępem do sieci Internet, aktualna wersja standardowej przeglądarki internetowej oraz aktywny adres e-mail.</li>
            <li>Usługodawca nie ponosi odpowiedzialności za nieprawidłowe działanie Platformy wynikające z niespełnienia przez Użytkownika wymagań technicznych.</li>
          </ol>
        </Section>

        <Section icon={<UserPlus className="h-5 w-5" />} number="§ 5." title="Zakładanie Konta i zawieranie umowy">
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>Utworzenie Konta na Platformie jest dobrowolne i wymaga podania prawdziwych danych firmowych w formularzu rejestracyjnym.</li>
            <li>Z chwilą skutecznej rejestracji Konta dochodzi do zawarcia pomiędzy Użytkownikiem a Usługodawcą umowy o świadczenie usług drogą elektroniczną.</li>
            <li>Umowa o świadczenie usług w Planie Płatnym (Subskrypcja) zostaje zawarta z momentem zaksięgowania pierwszej opłaty cyklicznej za pośrednictwem zintegrowanego operatora płatności (Stripe).</li>
          </ol>
        </Section>

        {/* Płatności — karty */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: '#e5f3ff' }}>
              <CreditCard className="h-5 w-5" style={{ color: '#1E4D72' }} />
            </div>
            <h2 className="text-xl font-bold" style={{ color: '#1E4D72' }}>§ 6. Płatności i Subskrypcje</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 ml-1 mb-4">
            {[
              { plan: 'Pro', price: '89 PLN netto', period: 'miesięcznie', icon: '⭐' },
              { plan: 'Agencja', price: '199 PLN netto', period: 'miesięcznie', icon: '🏢' },
            ].map(p => (
              <div key={p.plan} className="rounded-xl p-5 border-2 flex items-center gap-4" style={{ borderColor: '#1E4D72', background: '#f8fbff' }}>
                <div className="text-3xl">{p.icon}</div>
                <div>
                  <p className="font-bold text-lg" style={{ color: '#1E4D72' }}>Plan {p.plan}</p>
                  <p className="text-2xl font-extrabold" style={{ color: '#E8843A' }}>{p.price}</p>
                  <p className="text-xs text-muted-foreground">{p.period}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ml-1 border-l-2 pl-6" style={{ borderColor: '#E8843A' }}>
            <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed" start={2}>
              <li>Płatności realizowane są z góry, w modelu subskrypcyjnym odnawialnym automatycznie co miesiąc za pośrednictwem zewnętrznego operatora Stripe.</li>
              <li>Do podanych cen doliczany jest podatek VAT zgodnie z obowiązującymi przepisami prawa.</li>
              <li>Użytkownik wyraża zgodę na wystawianie i przesyłanie faktur VAT w formie elektronicznej na adres e-mail przypisany do Konta.</li>
              <li>Użytkownik może w każdej chwili anulować Subskrypcję w panelu Konta ze skutkiem na koniec bieżącego, opłaconego okresu rozliczeniowego. Środki za niewykorzystany okres nie podlegają zwrotowi.</li>
            </ol>
          </div>
        </section>

        <Section icon={<Copyright className="h-5 w-5" />} number="§ 7." title="Prawa autorskie i własność intelektualna">
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>Wszelkie prawa do Platformy, w tym do jej kodu źródłowego, interfejsu (dashboardu), logiki algorytmów oraz nazwy i logotypu Shoppalyzer, należą do Usługodawcy i podlegają ochronie prawnej.</li>
            <li>Użytkownik zachowuje pełnię praw do danych wprowadzanych przez siebie do Aplikacji.</li>
          </ol>
        </Section>

        <Section icon={<Scale className="h-5 w-5" />} number="§ 8." title="Prawa i obowiązki stron">
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>Użytkownik zobowiązany jest do korzystania z Platformy w sposób zgodny z prawem. Zabrania się:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Dostarczania treści bezprawnych.</li>
                <li>Udostępniania Konta osobom trzecim.</li>
                <li>Podejmowania działań ingerujących w kod, architekturę (np. modele Vertex AI) lub infrastrukturę serwerową Platformy.</li>
              </ul>
            </li>
            <li>Usługodawca ma prawo do zablokowania lub usunięcia Konta Użytkownika w przypadku rażącego naruszenia postanowień Regulaminu.</li>
            <li>Usługodawca zastrzega sobie prawo do czasowego zawieszenia dostępu do Platformy w celach konserwacyjnych lub aktualizacyjnych.</li>
          </ol>
        </Section>

        {/* Zastrzeżenia — karty ostrzeżeń */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: '#e5f3ff' }}>
              <AlertTriangle className="h-5 w-5" style={{ color: '#1E4D72' }} />
            </div>
            <h2 className="text-xl font-bold" style={{ color: '#1E4D72' }}>§ 9. Zastrzeżenia technologiczne i wyłączenie odpowiedzialności</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 ml-1">
            {[
              { title: 'Narzędzie analityczne, nie doradztwo', desc: 'Shoppalyzer to narzędzie analityczne wspierane przez sztuczną inteligencję (LLM). Generatywne rekomendacje mają charakter wyłącznie pomocniczy i wymagają nadzoru ludzkiego. Nie stanowią wiążącego doradztwa biznesowego ani finansowego.', icon: '🤖' },
              { title: 'Ryzyko biznesowe', desc: 'Użytkownik wdraża rekomendacje wyłącznie na własne ryzyko. Usługodawca nie ponosi odpowiedzialności za utracone korzyści, spadki sprzedaży czy inne szkody powstałe w wyniku decyzji podjętych na podstawie danych z Platformy.', icon: '⚠️' },
              { title: 'Zależność od podmiotów trzecich', desc: 'Działanie Platformy uzależnione jest od dostępności danych z zewnętrznych marketplace\'ów. Usługodawca nie gwarantuje ciągłości usługi, jeśli marketplace ograniczy dostęp do danych poprzez zmiany układu stron lub zabezpieczenia antybotowe.', icon: '🔗' },
              { title: 'Ograniczenie odpowiedzialności', desc: 'Całkowita odpowiedzialność odszkodowawcza Usługodawcy wobec Użytkownika, niezależnie od podstawy prawnej, ograniczona jest do kwoty opłat subskrypcyjnych uiszczonych w okresie ostatnich 3 miesięcy poprzedzających zgłoszenie roszczenia.', icon: '⚖️' },
            ].map(c => (
              <div key={c.title} className="rounded-xl p-5 border" style={{ borderColor: '#e5f3ff', background: '#f8fbff' }}>
                <div className="text-2xl mb-2">{c.icon}</div>
                <h3 className="font-bold text-sm mb-2" style={{ color: '#1E4D72' }}>{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Section icon={<MessageSquare className="h-5 w-5" />} number="§ 10." title="Reklamacje">
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>Reklamacje związane z funkcjonowaniem Platformy należy zgłaszać na adres e-mail: <a href="mailto:shoppalyzer@gmail.com" className="text-primary hover:underline">shoppalyzer@gmail.com</a></li>
            <li>Zgłoszenie powinno zawierać dane Użytkownika oraz opis problemu.</li>
            <li>Usługodawca rozpatrzy reklamację w terminie <strong className="text-foreground">14 dni</strong> od daty jej otrzymania.</li>
          </ol>
          <div className="mt-4 flex items-center gap-3 rounded-xl p-4" style={{ background: '#1E4D72' }}>
            <Mail className="h-5 w-5 text-white shrink-0" />
            <p className="text-white text-sm">Kontakt w sprawie reklamacji: <a href="mailto:shoppalyzer@gmail.com" className="underline font-bold text-orange-300">shoppalyzer@gmail.com</a></p>
          </div>
        </Section>

        <Section icon={<BookOpen className="h-5 w-5" />} number="§ 11." title="Postanowienia końcowe">
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>Usługodawca zastrzega sobie prawo do zmiany Regulaminu z ważnych przyczyn (np. zmiana prawa, rozwój funkcjonalności). O zmianach Użytkownicy zostaną powiadomieni z <strong className="text-foreground">14-dniowym wyprzedzeniem</strong> drogą mailową lub w panelu Konta.</li>
            <li>W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego dla relacji B2B.</li>
            <li>Wszelkie spory będą rozstrzygane przez sąd powszechny właściwy miejscowo dla siedziby Usługodawcy.</li>
          </ol>
        </Section>

      </div>
    </div>
  );
};

export default Regulamin;
