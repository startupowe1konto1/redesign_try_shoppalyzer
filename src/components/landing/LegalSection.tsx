import type { LucideIcon } from 'lucide-react';
import { SectionEmblem } from './SectionEmblem';

type LegalSectionProps = {
  icon: LucideIcon;
  /** Pre-formatted number incl. its own punctuation, e.g. "1." or "§ 1." */
  number: string;
  title: string;
  children: React.ReactNode;
};

/**
 * Numbered section block for legal/policy pages, in the landing's signature
 * style: a framed emblem next to a Sora heading, with an amber hairline rule
 * down the left of the body copy.
 */
export const LegalSection = ({ icon, number, title, children }: LegalSectionProps) => (
  <section className="mb-10 scroll-mt-24">
    <div className="mb-4 flex items-center gap-3">
      <SectionEmblem icon={icon} size="sm" />
      <h2 className="text-xl font-bold tracking-tight text-brand-navy">{number} {title}</h2>
    </div>
    <div className="ml-1 border-l-2 border-accent-brand/40 pl-6">
      {children}
    </div>
  </section>
);

/**
 * Section heading row matching LegalSection, but for sections whose body is a
 * full-width card grid (no left rule). Render the grid as children below.
 */
export const LegalSectionHead = ({ icon, number, title }: Omit<LegalSectionProps, 'children'>) => (
  <div className="mb-4 flex items-center gap-3">
    <SectionEmblem icon={icon} size="sm" />
    <h2 className="text-xl font-bold tracking-tight text-brand-navy">{number} {title}</h2>
  </div>
);
