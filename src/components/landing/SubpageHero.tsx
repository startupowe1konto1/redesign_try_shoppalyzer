import { ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SectionEmblem } from './SectionEmblem';
import { Atmosphere } from './Atmosphere';

type SubpageHeroProps = {
  icon: LucideIcon;
  label: string;
  title: string;
  subtitle?: string;
  /** Optional brand note strip (replaces the old amber highlight bar). */
  noteIcon?: LucideIcon;
  note?: string;
};

/**
 * Shared hero for content subpages (legal, contact). Light editorial style that
 * matches the landing: framed emblem + uppercase label + Sora headline, a back
 * link, signature atmosphere lines, and an optional amber-tinted note strip.
 */
export const SubpageHero = ({ icon, label, title, subtitle, noteIcon: NoteIcon, note }: SubpageHeroProps) => {
  const navigate = useNavigate();

  return (
    <header className="relative isolate overflow-hidden border-b border-border/70 bg-surface-muted/40 pt-9 pb-9 lg:pt-11 lg:pb-11">
      <Atmosphere composition={2} />
      <div className="container relative max-w-4xl">
        <button
          onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
          className="group mb-7 inline-flex items-center gap-1.5 rounded-lg bg-surface px-3 py-2 text-sm font-medium text-foreground/70 ring-1 ring-border transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Wróć na stronę główną
        </button>

        <div className="mb-4 flex items-center gap-2.5">
          <SectionEmblem icon={icon} size="sm" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-brand">{label}</span>
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-brand-navy md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>}

        {note && (
          <div className="mt-7 flex items-center gap-2.5 rounded-xl bg-accent-brand/10 px-4 py-3 text-sm text-foreground/80 ring-1 ring-accent-brand/25">
            {NoteIcon && <NoteIcon className="h-4 w-4 shrink-0 text-accent-brand" />}
            <span>{note}</span>
          </div>
        )}
      </div>
    </header>
  );
};
