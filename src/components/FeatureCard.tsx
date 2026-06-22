import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="p-6 h-full bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-smooth group">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-accent-brand/10 rounded-lg group-hover:bg-accent-brand/20 transition-colors duration-smooth">
          <div className="text-accent-brand">
            {icon}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};
