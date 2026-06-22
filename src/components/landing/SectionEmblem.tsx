import type { LucideIcon } from 'lucide-react';

type SectionEmblemProps = {
  icon: LucideIcon;
  dark?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

/**
 * Signature framed emblem: a Lucide icon in a soft frame with a single amber
 * dot accent. Different icon per section for identity; same frame for cohesion.
 */
export const SectionEmblem = ({ icon: Icon, dark = false, size = 'md', className = '' }: SectionEmblemProps) => {
  const box = size === 'sm' ? 'h-10 w-10 rounded-lg' : 'h-12 w-12 rounded-xl';
  const ic = size === 'sm' ? 'h-[18px] w-[18px]' : 'h-5 w-5';
  return (
    <div
      className={`relative grid shrink-0 ${box} place-items-center border shadow-soft ${
        dark ? 'border-white/12 bg-white/[0.06]' : 'border-border bg-surface'
      } ${className}`}
    >
      <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-brand" />
      <Icon className={`${ic} ${dark ? 'text-white' : 'text-primary'}`} strokeWidth={2} />
    </div>
  );
};
