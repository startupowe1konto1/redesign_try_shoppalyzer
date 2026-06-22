export interface WaitlistEntry {
  email: string;
  sku: string;
  timestamp: string;
}

export const waitlistEntries: WaitlistEntry[] = [];

export const addEntry = (email: string, sku: string) => {
  waitlistEntries.push({
    email,
    sku,
    timestamp: new Date().toISOString(),
  });
};
