import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type ChipVariant = 'lower' | 'raise' | 'hold' | 'neutral';
export type ChipSize = 'xs' | 'sm' | 'md';

interface RecommendationChipProps {
  variant: ChipVariant;
  /** Override default Polish label */
  label?: string;
  /** Optional secondary text (e.g. "−12%", "+18 PLN") */
  hint?: string;
  size?: ChipSize;
  className?: string;
  /** Subtle pulse on mount/in-view (used in hero mockup). */
  animated?: boolean;
}

const VARIANT_DEFAULTS: Record<ChipVariant, { label: string; arrow: string }> = {
  lower:   { label: 'obniż',     arrow: '↓' },
  raise:   { label: 'podnieś',   arrow: '↑' },
  hold:    { label: 'utrzymaj',  arrow: '◐' },
  neutral: { label: 'monitoruj', arrow: '·' },
};

const VARIANT_STYLES: Record<ChipVariant, string> = {
  lower:
    'bg-danger-soft text-danger ring-danger/20 hover:ring-danger/35',
  raise:
    'bg-success-soft text-success ring-success/20 hover:ring-success/35',
  hold:
    'bg-warning-soft text-[hsl(38_92%_30%)] ring-warning/25 hover:ring-warning/45',
  neutral:
    'bg-muted text-muted-foreground ring-border hover:ring-foreground/20',
};

const SIZE_STYLES: Record<ChipSize, string> = {
  xs: 'text-[10px] leading-none px-2 py-1 gap-1',
  sm: 'text-xs  leading-none px-2.5 py-1.5 gap-1.5',
  md: 'text-sm  leading-none px-3 py-2 gap-2',
};

/**
 * The Shoppalyzer signature element.
 *
 * Used everywhere as the visual rhythm of the product:
 *   - Hero dashboard mockup
 *   - Sample report rows
 *   - Benefit cards
 *   - Pricing comparison
 *
 * Three states map directly to the actual product output:
 *   ↓ obniż   — danger red    — lower the price
 *   ↑ podnieś — success green — raise the price
 *   ◐ utrzymaj — warning amber — hold steady
 */
export const RecommendationChip = ({
  variant,
  label,
  hint,
  size = 'sm',
  className,
  animated = false,
}: RecommendationChipProps) => {
  const { label: defaultLabel, arrow } = VARIANT_DEFAULTS[variant];
  const text = label ?? defaultLabel;

  const Wrapper: any = animated ? motion.span : 'span';
  const motionProps = animated
    ? {
        initial: { opacity: 0, y: 4 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-10% 0px' },
        transition: { type: 'spring', stiffness: 320, damping: 22 },
      }
    : {};

  return (
    <Wrapper
      {...motionProps}
      className={cn(
        'inline-flex items-center rounded-full font-medium tabular-nums',
        'ring-1 ring-inset transition-all',
        SIZE_STYLES[size],
        VARIANT_STYLES[variant],
        className,
      )}
    >
      <span aria-hidden className="font-semibold">{arrow}</span>
      <span>{text}</span>
      {hint && (
        <span className="opacity-70 font-normal pl-0.5 border-l border-current/20 ml-0.5 pl-1.5">
          {hint}
        </span>
      )}
    </Wrapper>
  );
};

/* ────────────────────────────────────────────────────────────
   Convenience — for direct use in tables / dense layouts
   ──────────────────────────────────────────────────────────── */
export const ChipLower    = (p: Omit<RecommendationChipProps, 'variant'>) => <RecommendationChip variant="lower"   {...p} />;
export const ChipRaise    = (p: Omit<RecommendationChipProps, 'variant'>) => <RecommendationChip variant="raise"   {...p} />;
export const ChipHold     = (p: Omit<RecommendationChipProps, 'variant'>) => <RecommendationChip variant="hold"    {...p} />;
export const ChipNeutral  = (p: Omit<RecommendationChipProps, 'variant'>) => <RecommendationChip variant="neutral" {...p} />;
