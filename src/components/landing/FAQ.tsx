import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionHeader } from './SectionHeader';
import { Atmosphere } from './Atmosphere';

const faqs = [
  { q: 'Czy jest plan bezpłatny?', a: 'Tak. Plan Starter jest darmowy na stałe — 3 analizy miesięcznie, bez karty kredytowej i bez zobowiązań.' },
  { q: 'Jak przebiega analiza?', a: 'Wklejasz bezpośredni link do oferty lub produktu na Allegro, a Shoppalyzer analizuje cały rynek tego produktu i zwraca konkretne rekomendacje. Jedna analiza trwa zwykle od 30 sekund do kilku minut.' },
  { q: 'Co znajdę w raporcie?', a: 'Twoją pozycję cenową względem rynku, priorytetową listę „Co zrobić", porównanie „Ty vs zwycięzcy" czynnik po czynniku (cena, dostawa, wysyłka, promocje, zaufanie), kontekst rynku oraz listę konkurentów wg sprzedaży.' },
  { q: 'Czy Shoppalyzer działa tylko z Allegro?', a: 'Tak, na ten moment Allegro jest naszym jedynym rynkiem. Jeżeli są Państwo zainteresowani współpracą na innych marketplace’ach, zapraszamy do kontaktu.' },
  { q: 'Czym różni się Shoppalyzer od monitorowania cen?', a: 'Narzędzia do monitorowania cen pokazują tylko liczby. Shoppalyzer analizuje dane i daje Państwu konkretne rekomendacje: na którym produkcie zmienić cenę, co promować, a czego się pozbyć.' },
  { q: 'Czy będzie eksport PDF i analiza wielu ofert naraz?', a: 'Tak. Plany Pro i Agencja są w drodze — dadzą większy limit analiz, eksport raportów do PDF, analizę wielu ofert z pliku CSV oraz monitoring i alerty cenowe. Zostaw kontakt, a damy znać na starcie.' },
];

export const FAQ = () => (
  <section id="faq" className="relative isolate overflow-hidden py-12 lg:py-16">
    <Atmosphere composition={1} />
    <div className="container relative">
      <SectionHeader
        index="05"
        label="FAQ"
        icon={HelpCircle}
        className="mb-10 lg:mb-14"
      >
        Wszystko co musisz wiedzieć
        <br />
        <span className="text-primary">zanim zaczniesz.</span>
      </SectionHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-3xl mx-auto bg-background"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-border last:border-0"
            >
              <AccordionTrigger className="
                py-5 text-left text-base lg:text-lg font-semibold text-foreground
                tracking-tight hover:text-primary
                hover:no-underline group
              ">
                <span className="flex items-baseline gap-4 pr-4">
                  <span className="font-mono text-xs text-muted-foreground/60 group-hover:text-primary/70 transition-colors mt-0.5 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-9 pr-4 text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);
