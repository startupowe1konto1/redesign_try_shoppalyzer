import { createContext, useContext, useState, type ReactNode } from 'react';
import { WaitlistModal } from '@/components/WaitlistModal';

const WaitlistContext = createContext<{ openWaitlist: () => void }>({
  openWaitlist: () => {},
});

export const WaitlistProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <WaitlistContext.Provider value={{ openWaitlist: () => setIsOpen(true) }}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => useContext(WaitlistContext);
