import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
          <p className="text-xl text-muted-foreground mb-4">Strona nie istnieje</p>
          <a href="/" className="text-accent-brand hover:text-[#D4800F] underline">
            Wróć na stronę główną
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
