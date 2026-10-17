import { createContext, useContext as useReactContext, type ReactNode } from "react";

type contextValue = {
  onlineOrdersEnabled: boolean;
  instagramOrderUrl: string;
};

const context = createContext<contextValue | null>(null);

export const ContextProvider = ({ children, value }: ContextProviderProps) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useContext = () => {
  const configuredContext = useReactContext(context);
  if (!configuredContext) {
    throw new Error("useContext must be used within a ContextProvider");
  }

  return configuredContext;
};

type ContextProviderProps = {
  children: ReactNode;
  value: contextValue;
};
