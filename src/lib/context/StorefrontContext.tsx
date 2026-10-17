import { createContext, useContext, type ReactNode } from "react";

type StorefrontContextValue = {
  onlineOrdersEnabled: boolean;
  instagramOrderUrl: string;
};

const StorefrontContext = createContext<StorefrontContextValue | null>(null);

export const ContextProvider = ({ children, value }: ContextProviderProps) => {
  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
};

export const useStorefront = () => {
  const context = useContext(StorefrontContext);
  if (!context) {
    throw new Error("useStorefront must be used within a ContextProvider");
  }

  return context;
};

type ContextProviderProps = {
  children: ReactNode;
  value: StorefrontContextValue;
};
