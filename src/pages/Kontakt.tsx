import { Mail, Send, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { SubpageHero } from '@/components/landing/SubpageHero';

const Kontakt = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`Wiadomość od ${name}`);
    const body = encodeURIComponent(`Imię i nazwisko: ${name}\nE-mail: ${email}\n\nWiadomość:\n${message}`);
    window.location.href = `mailto:shoppalyzer@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const disabled = !name || !email || !message;
  const inputClass =
    'w-full rounded-lg border border-input bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SubpageHero
        icon={Mail}
        label="Kontakt"
        title="Kontakt"
        subtitle="Jesteśmy do Twojej dyspozycji"
        noteIcon={Clock}
        note="Odpowiadamy na wiadomości w ciągu 24 godzin roboczych"
      />

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">

          {/* Dane kontaktowe */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-brand-navy">Dane kontaktowe</h2>

            <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 shadow-soft">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="mb-1 text-sm font-bold text-brand-navy">E-mail</p>
                <a href="mailto:shoppalyzer@gmail.com" className="text-sm font-semibold text-accent-brand hover:underline">
                  shoppalyzer@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Formularz */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-brand-navy">Napisz do nas</h2>
            {sent ? (
              <div className="rounded-xl border border-border bg-surface p-8 text-center shadow-soft">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success-soft">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-navy">Dziękujemy za wiadomość!</h3>
                <p className="text-sm text-muted-foreground">Otworzyliśmy Twój klient pocztowy. Odpiszemy najszybciej jak to możliwe.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-sm font-medium text-accent-brand underline hover:text-accent-brand-hover"
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            ) : (
              <div className="space-y-5 rounded-xl border border-border bg-surface p-6 shadow-soft">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-brand-navy">Imię i nazwisko *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jan Kowalski"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-brand-navy">Adres e-mail *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jan@firma.pl"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-brand-navy">Wiadomość *</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="W czym możemy Ci pomóc?"
                    rows={5}
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={disabled}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition-colors ${
                    disabled
                      ? 'cursor-not-allowed bg-muted text-muted-foreground'
                      : 'bg-accent-brand text-accent-brand-foreground hover:bg-accent-brand-hover'
                  }`}
                >
                  <Send className="h-4 w-4" />
                  Wyślij wiadomość
                </button>
                <p className="text-center text-xs text-muted-foreground">* Pola obowiązkowe. Kliknięcie przycisku otworzy Twój klient pocztowy.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;
