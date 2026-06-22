import { useState } from 'react';
import { Check, Clock, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

type Integration = {
  name: string;
  /** Simple Icons slug (https://simpleicons.org). Some niche brands may 404 — fallback rendered. */
  slug: string;
  /** Brand color (hex without #). Used for the live integration; coming-soon ones rendered muted. */
  color: string;
  live: boolean;
};

const integrations: Integration[] = [
  { name: 'Allegro',         slug: 'allegro',     color: 'FF5A00', live: true  },
  { name: 'Amazon',          slug: 'amazon',      color: 'FF9900', live: false },
  { name: 'Shopify',         slug: 'shopify',     color: '7AB55C', live: false },
  { name: 'WooCommerce',     slug: 'woocommerce', color: '7F54B3', live: false },
  { name: 'BaseLinker',      slug: 'baselinker',  color: '0084FF', live: false },
  { name: 'Ceneo',           slug: 'ceneo',       color: 'EE5C28', live: false },
  { name: 'Google Shopping', slug: 'google',      color: '4285F4', live: false },
];

/** Single integration chip — image with graceful fallback to a Lucide icon. */
const IntegrationLogo = ({ integration }: { integration: Integration }) => {
  const [failed, setFailed] = useState(false);
  const { name, slug, color, live } = integration;

  const colorParam = live ? color : '94A3B8'; // muted slate when not live
  const logoUrl = `https://cdn.simpleicons.org/${slug}/${colorParam}`;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors',
        'ring-1 ring-inset',
        live
          ? 'bg-primary-soft text-primary ring-primary/25 font-semibold'
          : 'bg-background text-muted-foreground ring-border hover:ring-foreground/20',
      )}
    >
      {/* Live ✓ tick or coming-soon clock */}
      {live ? (
        <Check className="h-3 w-3 text-primary shrink-0" strokeWidth={3} />
      ) : (
        <Clock className="h-3 w-3 text-accent-brand shrink-0" strokeWidth={2.5} />
      )}

      {/* Brand logo or fallback */}
      {failed ? (
        <ShoppingBag className={cn('h-3.5 w-3.5 shrink-0', live ? 'text-primary' : 'text-muted-foreground/60')} strokeWidth={2} />
      ) : (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="h-3.5 w-3.5 shrink-0"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}

      <span className="text-xs">{name}</span>

      {!live && (
        <span className="text-[10px] uppercase tracking-wider text-accent-brand font-medium ml-0.5">
          wkrótce
        </span>
      )}
    </span>
  );
};

export const SocialProofBar = () => (
  <section className="border-y border-border bg-surface-muted/40">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-3 md:gap-0 py-4">
        <div className="flex items-center gap-2 md:pr-6 md:border-r md:border-border whitespace-nowrap">
          <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground font-medium">
            Obecnie obsługujemy
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:pl-5">
          {integrations.map((it) => (
            <IntegrationLogo key={it.name} integration={it} />
          ))}
        </div>
      </div>
    </div>
  </section>
);
