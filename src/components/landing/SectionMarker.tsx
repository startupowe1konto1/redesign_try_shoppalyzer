type SectionMarkerProps = {
  index: string;
  label: string;
  dark?: boolean;
  className?: string;
};

/**
 * Signature section marker (leitmotif C): mono index + amber hairline + mono label.
 * Recurs above every section heading for a recognizable, editorial rhythm.
 */
export const SectionMarker = ({ index, label, dark = false, className = '' }: SectionMarkerProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <span className="font-mono text-[12px] font-medium text-accent-brand tabular-nums">{index}</span>
    <span className="h-px w-8 bg-accent-brand/55" />
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
        dark ? 'text-white/55' : 'text-muted-foreground'
      }`}
    >
      {label}
    </span>
  </div>
);
