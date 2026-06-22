/**
 * Sample analysis data for the /sample-report page and its PDF export.
 * Single source of truth — consumed by both the React UI (SampleReport.tsx)
 * and the programmatic PDF generator (src/lib/pdf/report-pdf.ts).
 * Icons are referenced by string key so this module stays framework-agnostic.
 */

export type IconKey = 'tag' | 'truck' | 'clock' | 'sparkles' | 'shield' | 'package' | 'star' | 'check';
export type Horizon = 'quick' | 'long';
export type Advantage = 'worse' | 'better' | 'equal';

export const zl = (n: number) => n.toLocaleString('pl-PL') + ' zł';

export const PRODUCT = {
  title: 'Sony WH-1000XM5 słuchawki bezprzewodowe ANC, czarne',
  category: 'Audio · Słuchawki',
  verdict: 'Twoja cena jest powyżej rynku',
  verdictNote:
    'Sprzedajesz drożej niż poziom, na którym realnie kupują klienci. Bez przewag pozacenowych tracisz pozycję w rankingu.',
};

/** PriceBand — jeden „mózg cenowy" (oś + akcja cenowa korzystają z tych samych liczb) */
export const BAND = {
  axisMin: 1149,
  axisMax: 1499,
  floor: 1199, // mediana ważona sprzedażą — gdzie realnie kupują
  suggested: 1235, // sugestia (środek floor–ceiling)
  ceiling: 1270, // floor + premia za realne przewagi
  yours: 1349, // Twoja cena
};

export const pct = (v: number) => ((v - BAND.axisMin) / (BAND.axisMax - BAND.axisMin)) * 100;

export type Action = { title: string; evidence: string; icon: IconKey; horizon: Horizon };

export const ACTIONS: Action[] = [
  { title: 'Obniż cenę do ~1 235 zł lub uzasadnij premium', evidence: 'Ty: 1 349 zł · zwycięzcy: mediana ~1 235 zł', icon: 'tag', horizon: 'quick' },
  { title: 'Włącz SUPERCENA — tak jak lider rynku', evidence: 'Ty: brak promocji · lider: SUPERCENA (niższa cena efektywna)', icon: 'sparkles', horizon: 'quick' },
  { title: 'Skróć czas wysyłki do 24 h', evidence: 'Ty: 48 h · zwycięzcy: mediana 24 h', icon: 'clock', horizon: 'quick' },
];

export const LONG_TERM: Action = {
  title: 'Buduj zaufanie — systematycznie zbieraj oceny',
  evidence: 'Ty: 4,7 / 97% · zwycięzcy: Super Sprzedawca / 99%',
  icon: 'star',
  horizon: 'long',
};

export const HYGIENE =
  'Higiena oferty: włącz darmową dostawę i dopisz gwarancję w opisie — kupujący traktują to jako standard.';

export type GapRow = { icon: IconKey; factor: string; yours: string; winners: string; advantage: Advantage };

export const GAP_ROWS: GapRow[] = [
  { icon: 'tag',      factor: 'Cena',            yours: '1 349 zł',       winners: '~1 235 zł (mediana)',     advantage: 'worse' },
  { icon: 'truck',    factor: 'Darmowa dostawa', yours: 'Płatna (15 zł)', winners: '3/3 oferują',             advantage: 'worse' },
  { icon: 'clock',    factor: 'Czas wysyłki',    yours: '48 h',           winners: '24 h (mediana)',          advantage: 'worse' },
  { icon: 'sparkles', factor: 'Promocja',        yours: 'Brak',           winners: 'SUPERCENA (lider)',       advantage: 'worse' },
  { icon: 'shield',   factor: 'Gwarancja',       yours: 'Brak w opisie',  winners: '24 mies.',                advantage: 'worse' },
  { icon: 'package',  factor: 'Pakiet',          yours: 'Brak',           winners: 'Etui w zestawie (lider)', advantage: 'worse' },
  { icon: 'star',     factor: 'Zaufanie',        yours: '4,7 / 97%',      winners: 'Super Sprzedawca / 99%',  advantage: 'worse' },
  { icon: 'check',    factor: 'Stan magazynowy', yours: 'Dostępny',       winners: 'Dostępny',                advantage: 'equal' },
];

export const KPIS = [
  { label: 'Zakres cen', value: '1 149–1 499 zł' },
  { label: 'Sprzedawcy', value: '14' },
  { label: 'Sprzedaż 30 dni', value: '320 szt.' },
];

export const INSIGHTS = [
  'Top-3 sprzedawców odpowiada za 88% sprzedaży — to rynek zwycięzcy.',
  'Lider wysyła tego samego dnia (24 h) — szybkość napędza pozycję w rankingu.',
  '3 z 3 zwycięzców oferuje darmową dostawę — to dziś standard, nie przewaga.',
  'Lider stosuje SUPERCENA — jego cena efektywna jest niższa niż widoczna.',
];

export type Competitor = { seller: string; price: number; sales: number; badges: string[]; you?: boolean };

export const COMPETITORS: Competitor[] = [
  { seller: 'AudioPro Sklep', price: 1199, sales: 142, badges: ['Super Sprzedawca', 'Darmowa', 'SUPERCENA'] },
  { seller: 'ElectroMarket',  price: 1235, sales: 98,  badges: ['Darmowa', 'Wysyłka 24h'] },
  { seller: 'TechZone',       price: 1270, sales: 41,  badges: ['Darmowa'] },
  { seller: 'Twoja oferta',   price: 1349, sales: 18,  badges: [], you: true },
  { seller: 'GadżetShop',     price: 1289, sales: 12,  badges: ['Darmowa'] },
  { seller: 'MobileWorld',    price: 1499, sales: 9,   badges: [] },
];
