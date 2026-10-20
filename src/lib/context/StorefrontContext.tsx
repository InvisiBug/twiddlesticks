import { createContext, useContext as useReactContext, type ReactNode, useState } from "react";
import type { Theme, Cart } from "@/types";
import { getInitialTheme, getInitialCart } from "../helpers";
import { products } from "@/data/storefront";

const context = createContext<contextValue | null>(null);

export const ContextProvider = ({ children, value }: ContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [cart, setCart] = useState<Cart>(getInitialCart);

  console.log(products);

  return <context.Provider value={{ ...value, theme, setTheme, cart, setCart, products }}>{children}</context.Provider>;
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
  cart: Cart;
  setCart: (cart: Cart) => void;
  products: typeof products;
};
