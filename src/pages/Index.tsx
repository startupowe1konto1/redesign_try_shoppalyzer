import { lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { HeroVariant1 } from '@/components/landing/HeroVariant1';
import { SocialProofBar } from '@/components/landing/SocialProofBar';
import { BenefitsBento } from '@/components/landing/BenefitsBento';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Pricing } from '@/components/landing/Pricing';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { StickyCTA } from '@/components/landing/StickyCTA';
import { LoadingIntro } from '@/components/landing/LoadingIntro';
import { DiagOverlay } from '@/components/landing/DiagOverlay';

const HeroVariant2 = lazy(() => import('@/components/landing/HeroVariant2').then(m => ({ default: m.HeroVariant2 })));
const HeroVariant3 = lazy(() => import('@/components/landing/HeroVariant3').then(m => ({ default: m.HeroVariant3 })));

const Index = () => {
  const [searchParams] = useSearchParams();
  const variant = searchParams.get('v') || '1';
  return (
    <div className="min-h-screen bg-background">
      <LoadingIntro />
      <DiagOverlay />
      <Navbar />
      <main>
        {variant === '2' || variant === '3' ? (
          <Suspense fallback={<div className="min-h-[600px]" />}>
            {variant === '2' ? <HeroVariant2 /> : <HeroVariant3 />}
          </Suspense>
        ) : (
          <HeroVariant1 />
        )}
        <SocialProofBar />
        <BenefitsBento />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <StickyCTA />
    </div>
  );
};

export default Index;
