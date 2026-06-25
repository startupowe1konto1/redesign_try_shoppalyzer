import {
  FileText, Tag, Settings, Monitor, UserPlus, Copyright, Scale,
  AlertTriangle, MessageSquare, BookOpen, Mail, User, RefreshCw,
  Bot, Link2,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SubpageHero } from '@/components/landing/SubpageHero';
import { LegalSection, LegalSectionHead } from '@/components/landing/LegalSection';
import { SectionEmblem } from '@/components/landing/SectionEmblem';

const Regulamin = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SubpageHero
        icon={FileText}
        label="Dokument prawny"
        title="Regulamin Świadczenia Usług"
        subtitle="Shoppalyzer · ostatnia aktualizacja: 2026"
        noteIcon={Scale}
        note="Platforma dedykowana wyłącznie dla przedsiębiorców (B2B). Przepisy o ochronie konsumentów nie mają zastosowania"
      />

      <div className="container mx-auto max-w-4xl px-4 py-12">

        <LegalSection icon={FileText} number="§ 1." title="Postanowienia ogólne">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Niniejszy Regulamin określa ogólne warunki, zasady oraz sposób świadczenia usług drogą elektroniczną w modelu SaaS (Software as a Service) za pośrednictwem platformy internetowej Shoppalyzer (dalej: „Platforma" lub „Aplikacja").</li>
            <li>Usługodawcą i administratorem Platformy jest <strong className="text-foreground">Shoppalyzer</strong> z siedzibą w Poznaniu, NIP: XXXXXXXXXX, e-mail: <a href="mailto:shoppalyzer@gmail.com" className="text-primary hover:underline">shoppalyzer@gmail.com</a></li>
            <li>Aplikacja Shoppalyzer jest dedykowana wyłącznie dla przedsiębiorców: osób fizycznych prowadzących działalność gospodarczą, osób prawnych oraz jednostek organizacyjnych nieposiadających osobowości prawnej (sektor B2B, w szczególności MŚP e-commerce). Przepisy dotyczące praw konsumentów nie mają zastosowania.</li>
            <li>Przed rozpoczęciem korzystania z Platformy Użytkownik jest zobowiązany do zapoznania się z Regulaminem oraz Polityką Prywatności i do ich akceptacji.</li>
          </ol>
        </LegalSection>

        {/* Definicje — karty */}
        <section className="mb-10">
          <LegalSectionHead icon={Tag} number="§ 2." title="Definicje" />
          <div className="ml-1 grid gap-4 md:grid-cols-3">
            {[
              { title: 'Użytkownik', desc: 'Przedsiębiorca posiadający Konto na Platformie.', Icon: User },
              { title: 'Konto', desc: 'Indywidualny panel Użytkownika w Aplikacji, gdzie gromadzone są dane, analizy i rekomendacje.', Icon: Monitor },
              { title: 'Subskrypcja', desc: 'Odpłatna usługa cykliczna umożliwiająca dostęp do pełnych funkcjonalności Platformy w wybranym okresie rozliczeniowym.', Icon: RefreshCw },
            ].map(c => (
              <div key={c.title} className="rounded-xl border border-border bg-surface p-5 shadow-soft">
                <SectionEmblem icon={c.Icon} size="sm" className="mb-3" />
                <h3 className="mb-1 text-sm font-bold text-brand-navy">{c.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <LegalSection icon={Settings} number="§ 3." title="Rodzaj i zakres świadczonych usług">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Shoppalyzer to inteligentny asystent biznesowy dla e-commerce (AI-powered business advisor).</li>
            <li>Podstawowe usługi świadczone w ramach Platformy obejmują:
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Automatyczny monitoring cen, recenzji i stanu magazynowego (SKU) z wybranych marketplace'ów na podstawie dostarczonych przez Użytkownika danych.</li>
                <li>Analizę trendingowości produktów przy wsparciu algorytmów sztucznej inteligencji.</li>
                <li>Dostarczanie generatywnych rekomendacji tekstowych (tzw. "text-first" approach), sugerujących konkretne działania rynkowe.</li>
                <li>Dostęp do zintegrowanego dashboardu analitycznego prezentującego m.in. porównania do konkurencyjnych listingów.</li>
              </ul>
            </li>
          </ol>
        </LegalSection>

        <LegalSection icon={Monitor} number="§ 4." title="Wymagania techniczne">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Do prawidłowego korzystania z Platformy niezbędne jest: urządzenie z dostępem do sieci Internet, aktualna wersja standardowej przeglądarki internetowej oraz aktywny adres e-mail.</li>
            <li>Usługodawca nie ponosi odpowiedzialności za nieprawidłowe działanie Platformy wynikające z niespełnienia przez Użytkownika wymagań technicznych.</li>
          </ol>
        </LegalSection>

        <LegalSection icon={UserPlus} number="§ 5." title="Zakładanie Konta i zawieranie umowy">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Utworzenie Konta na Platformie jest dobrowolne i wymaga podania prawdziwych danych firmowych w formularzu rejestracyjnym.</li>
            <li>Z chwilą skutecznej rejestracji Konta dochodzi do zawarcia pomiędzy Użytkownikiem a Usługodawcą umowy o świadczenie usług drogą elektroniczną.</li>
            <li>Umowa o świadczenie usług w Planie Płatnym (Subskrypcja) zostaje zawarta z momentem zaksięgowania pierwszej opłaty cyklicznej za pośrednictwem zintegrowanego operatora płatności (Stripe).</li>
          </ol>
        </LegalSection>

        <LegalSection icon={Copyright} number="§ 6." title="Prawa autorskie i własność intelektualna">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Wszelkie prawa do Platformy, w tym do jej kodu źródłowego, interfejsu (dashboardu), logiki algorytmów oraz nazwy i logotypu Shoppalyzer, należą do Usługodawcy i podlegają ochronie prawnej.</li>
            <li>Użytkownik zachowuje pełnię praw do danych wprowadzanych przez siebie do Aplikacji.</li>
          </ol>
        </LegalSection>

        <LegalSection icon={Scale} number="§ 7." title="Prawa i obowiązki stron">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Użytkownik zobowiązany jest do korzystania z Platformy w sposób zgodny z prawem. Zabrania się:
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Dostarczania treści bezprawnych.</li>
                <li>Udostępniania Konta osobom trzecim.</li>
                <li>Podejmowania działań ingerujących w kod, architekturę (np. modele Vertex AI) lub infrastrukturę serwerową Platformy.</li>
              </ul>
            </li>
            <li>Usługodawca ma prawo do zablokowania lub usunięcia Konta Użytkownika w przypadku rażącego naruszenia postanowień Regulaminu.</li>
            <li>Usługodawca zastrzega sobie prawo do czasowego zawieszenia dostępu do Platformy w celach konserwacyjnych lub aktualizacyjnych.</li>
          </ol>
        </LegalSection>

        {/* Zastrzeżenia — karty ostrzeżeń */}
        <section className="mb-10">
          <LegalSectionHead icon={AlertTriangle} number="§ 8." title="Zastrzeżenia technologiczne i wyłączenie odpowiedzialności" />
          <div className="ml-1 grid gap-4 md:grid-cols-2">
            {[
              { title: 'Narzędzie analityczne, nie doradztwo', desc: 'Shoppalyzer to narzędzie analityczne wspierane przez sztuczną inteligencję (LLM). Generatywne rekomendacje mają charakter wyłącznie pomocniczy i wymagają nadzoru ludzkiego. Nie stanowią wiążącego doradztwa biznesowego ani finansowego.', Icon: Bot },
              { title: 'Ryzyko biznesowe', desc: 'Użytkownik wdraża rekomendacje wyłącznie na własne ryzyko. Usługodawca nie ponosi odpowiedzialności za utracone korzyści, spadki sprzedaży czy inne szkody powstałe w wyniku decyzji podjętych na podstawie danych z Platformy.', Icon: AlertTriangle },
              { title: 'Zależność od podmiotów trzecich', desc: 'Działanie Platformy uzależnione jest od dostępności danych z zewnętrznych marketplace\'ów. Usługodawca nie gwarantuje ciągłości usługi, jeśli marketplace ograniczy dostęp do danych poprzez zmiany układu stron lub zabezpieczenia antybotowe.', Icon: Link2 },
              { title: 'Ograniczenie odpowiedzialności', desc: 'Całkowita odpowiedzialność odszkodowawcza Usługodawcy wobec Użytkownika, niezależnie od podstawy prawnej, ograniczona jest do kwoty opłat subskrypcyjnych uiszczonych w okresie ostatnich 3 miesięcy poprzedzających zgłoszenie roszczenia.', Icon: Scale },
            ].map(c => (
              <div key={c.title} className="rounded-xl border border-border bg-surface p-5 shadow-soft">
                <SectionEmblem icon={c.Icon} size="sm" className="mb-3" />
                <h3 className="mb-2 text-sm font-bold text-brand-navy">{c.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <LegalSection icon={MessageSquare} number="§ 9." title="Reklamacje">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Reklamacje związane z funkcjonowaniem Platformy należy zgłaszać na adres e-mail: <a href="mailto:shoppalyzer@gmail.com" className="text-primary hover:underline">shoppalyzer@gmail.com</a></li>
            <li>Zgłoszenie powinno zawierać dane Użytkownika oraz opis problemu.</li>
            <li>Usługodawca rozpatrzy reklamację w terminie <strong className="text-foreground">14 dni</strong> od daty jej otrzymania.</li>
          </ol>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-brand-navy p-4">
            <Mail className="h-5 w-5 shrink-0 text-white" />
            <p className="text-sm text-white">Kontakt w sprawie reklamacji: <a href="mailto:shoppalyzer@gmail.com" className="font-bold text-[hsl(25_80%_72%)] underline">shoppalyzer@gmail.com</a></p>
          </div>
        </LegalSection>

        <LegalSection icon={BookOpen} number="§ 10." title="Postanowienia końcowe">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Usługodawca zastrzega sobie prawo do zmiany Regulaminu z ważnych przyczyn (np. zmiana prawa, rozwój funkcjonalności). O zmianach Użytkownicy zostaną powiadomieni z <strong className="text-foreground">14-dniowym wyprzedzeniem</strong> drogą mailową lub w panelu Konta.</li>
            <li>W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego dla relacji B2B.</li>
            <li>Wszelkie spory będą rozstrzygane przez sąd powszechny właściwy miejscowo dla siedziby Usługodawcy.</li>
          </ol>
        </LegalSection>

      </div>
    </div>
  );
};

export default Regulamin;
