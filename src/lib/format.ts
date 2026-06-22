/**
 * Polish locale formatters — keeps numbers/prices consistent across the site.
 */

const plPLNumber = new Intl.NumberFormat('pl-PL', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const plPLPrice = new Intl.NumberFormat('pl-PL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const fmtPLN = (n: number): string => `${plPLPrice.format(n)} zł`;

export const fmtNumber = (n: number): string => plPLNumber.format(n);

export const fmtPercent = (n: number, opts: { signed?: boolean } = {}): string => {
  const sign = opts.signed && n > 0 ? '+' : '';
  return `${sign}${plPLNumber.format(n)}%`;
};

/**
 * Returns a formatter callback for use inside CountUp `formattingFn`.
 * Decides format based on type.
 */
export const makeFormatter = (kind: 'pln' | 'number' | 'percent') => {
  switch (kind) {
    case 'pln':
      return fmtPLN;
    case 'percent':
      return (n: number) => fmtPercent(n, { signed: true });
    case 'number':
    default:
      return fmtNumber;
  }
};
