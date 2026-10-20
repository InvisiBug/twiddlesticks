import { createContext, useContext as useReactContext, type ReactNode, useState } from "react";

import { getInitialTheme } from "../helpers";
import { type Theme } from "@/types";

const context = createContext<contextValue | null>(null);

export const ContextProvider = ({ children, value }: ContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  return <context.Provider value={{ ...value, theme, setTheme }}>{children}</context.Provider>;
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
  value: {
    onlineOrdersEnabled: boolean;
    instagramOrderUrl: string;
  };
};

type contextValue = {
  onlineOrdersEnabled: boolean;
  instagramOrderUrl: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
