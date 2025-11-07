import { createContext, useContext, useState, type ReactNode } from "react";

interface TrekAddOnContextType {
  selectedTrekIds: string[];
  setSelectedTrekIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const TrekAddOnContext = createContext<TrekAddOnContextType | null>(null);

export const TrekAddOnProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTrekIds, setSelectedTrekIds] = useState<string[]>([]);
  return (
    <TrekAddOnContext.Provider value={{ selectedTrekIds, setSelectedTrekIds }}>
      {children}
    </TrekAddOnContext.Provider>
  );
};

export const useTrekAddOns = () => {
  const ctx = useContext(TrekAddOnContext);
  if (!ctx) throw new Error("useTrekAddOns must be used within TrekAddOnProvider");
  return ctx;
};
