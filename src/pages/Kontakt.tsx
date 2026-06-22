import { ArrowLeft, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

const Kontakt = () => {
  const navigate = useNavigate();
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
              <Mail className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white">Kontakt</h1>
              <p className="text-white/70 mt-1 text-sm">Jesteśmy do Twojej dyspozycji</p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlight bar */}
      <div style={{ background: '#E8843A' }} className="py-3 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-white text-sm font-medium text-center">
            ✉️ Odpowiadamy na wiadomości w ciągu 24 godzin roboczych
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Dane kontaktowe */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#1E4D72' }}>Dane kontaktowe</h2>

            {/* Email */}
            <div className="rounded-xl p-5 border flex items-start gap-4" style={{ borderColor: '#e5f3ff', background: '#f8fbff' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: '#e5f3ff' }}>
                <Mail className="h-5 w-5" style={{ color: '#1E4D72' }} />
              </div>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: '#1E4D72' }}>E-mail</p>
                <a href="mailto:shoppalyzer@gmail.com" className="text-sm font-semibold hover:underline" style={{ color: '#E8843A' }}>shoppalyzer@gmail.com</a>
              </div>
            </div>

          </div>

          {/* Formularz */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#1E4D72' }}>Napisz do nas</h2>
            {sent ? (
              <div className="rounded-xl p-8 text-center" style={{ background: '#f8fbff', border: '2px solid #e5f3ff' }}>
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1E4D72' }}>Dziękujemy za wiadomość!</h3>
                <p className="text-sm text-muted-foreground">Otworzyliśmy Twój klient pocztowy. Odpiszemy najszybciej jak to możliwe.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-sm underline"
                  style={{ color: '#E8843A', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            ) : (
              <div className="rounded-xl p-6 border space-y-5" style={{ borderColor: '#e5f3ff', background: '#f8fbff' }}>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1E4D72' }}>Imię i nazwisko *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jan Kowalski"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #d1e8f7', fontSize: '14px', background: 'white', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1E4D72' }}>Adres e-mail *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jan@firma.pl"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #d1e8f7', fontSize: '14px', background: 'white', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1E4D72' }}>Wiadomość *</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="W czym możemy Ci pomóc?"
                    rows={5}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #d1e8f7', fontSize: '14px', background: 'white', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!name || !email || !message}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: (!name || !email || !message) ? '#d1d5db' : '#E8843A',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: (!name || !email || !message) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Send className="h-4 w-4" />
                  Wyślij wiadomość
                </button>
                <p className="text-xs text-muted-foreground text-center">* Pola obowiązkowe. Kliknięcie przycisku otworzy Twój klient pocztowy.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;
