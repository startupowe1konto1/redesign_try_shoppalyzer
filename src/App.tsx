import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { lazy, Suspense } from "react";
import { WaitlistProvider } from "@/context/WaitlistContext";
import { Footer } from "@/components/landing/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import Index from "./pages/Index";
const SampleReport = lazy(() => import("./pages/SampleReport"));
const PolitykaPrywatnosci = lazy(() => import("./pages/PolitykaPrywatnosci"));
const PolitykaCookies = lazy(() => import("./pages/PolitykaCookies"));
const Regulamin = lazy(() => import("./pages/Regulamin"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const ONas = lazy(() => import("./pages/ONas"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WaitlistProvider>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sample-report" element={<SampleReport />} />
              <Route path="/polityka-prywatnosci" element={<PolitykaPrywatnosci />} />
              <Route path="/polityka-cookies" element={<PolitykaCookies />} />
              <Route path="/regulamin" element={<Regulamin />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/o-nas" element={<ONas />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
          <CookieConsent />
        </WaitlistProvider>
      </BrowserRouter>
    </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
