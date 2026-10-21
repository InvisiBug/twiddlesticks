import { createContext, useContext as useReactContext, type ReactNode, useState, useEffect } from "react";
import type { Theme, Cart, Product } from "@/types";
import { getInitialTheme, getInitialCart, getThemedProducts, getThemedAsset } from "../helpers";
import { products as storeProducts } from "@/data/storefront";

const context = createContext<contextValue | null>(null);

export const ContextProvider = ({ children, value }: ContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [cart, setCart] = useState<Cart>(getInitialCart);

  const [products, setProducts] = useState<Product[]>(getThemedProducts(theme, storeProducts));

  console.log(getThemedAsset("/src/lib/images/light/circle/cover.jpg", theme));

  useEffect(() => {
    setProducts(getThemedProducts(theme, storeProducts));
  }, [theme, storeProducts]);

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
  products: Product[];
};
