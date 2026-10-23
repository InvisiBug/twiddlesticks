import { createContext, useContext as useReactContext, type ReactNode, useState, useEffect } from "react";
import type { Theme, Product } from "@/types";
import { getInitialTheme, getThemedProducts } from "../helpers";
import { products as storeProducts } from "@/data/storefront";
import { maxRelatedProducts } from "@/data/storefront";

const context = createContext<contextValue | null>(null);

export const ContextProvider = ({ children, value }: ContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const [products, setProducts] = useState<Product[]>(getThemedProducts(theme, storeProducts));

  useEffect(() => {
    setProducts(getThemedProducts(theme, storeProducts));
  }, [theme]);

  return <context.Provider value={{ ...value, theme, setTheme, products, maxRelatedProducts }}>{children}</context.Provider>;
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
  products: Product[];
  maxRelatedProducts: number;
};
