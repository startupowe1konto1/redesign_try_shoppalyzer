import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SectionEmblem } from './SectionEmblem';

type SectionHeaderProps = {
  /** Kept for call-site compatibility; no longer rendered. */
  index?: string;
  label: string;
  icon: LucideIcon;
  align?: 'center' | 'left';
  dark?: boolean;
  subtitle?: ReactNode;
  /** Headline content (may include line breaks / accent spans). */
  children: ReactNode;
  className?: string;
};

/**
 * Standardized section header: emblem + label on one row, then Sora headline.
 * No number, no divider between emblem and label.
 */
export const SectionHeader = ({
  label,
  icon,
  align = 'center',
  dark = false,
  subtitle,
  children,
  className = '',
}: SectionHeaderProps) => {
  const center = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${center ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-3xl items-start text-left'} ${className}`}
    >
      <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        <SectionEmblem icon={icon} dark={dark} />
        <span
          className={`font-mono text-[12px] uppercase tracking-[0.22em] ${
            dark ? 'text-white/60' : 'text-muted-foreground'
          }`}
        >
          {label}
        </span>
      </div>
      <h2
        className={`font-display mt-5 text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] ${
          dark ? 'text-white' : 'text-brand-navy'
        }`}
      >
        {children}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-xl text-lg ${dark ? 'text-white/65' : 'text-muted-foreground'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
