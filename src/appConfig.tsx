import { useEffect } from "react";
import { persistTheme, CART_STORAGE_KEY } from "./lib/helpers";
import { useContext } from "./lib/context";

const AppConfig = ({ children }: { children: React.ReactNode }) => {
  const { theme, cart } = useContext();

  useEffect(() => {
    persistTheme(theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  return <>{children}</>;
};

export default AppConfig;
