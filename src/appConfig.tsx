import { useEffect } from "react";
import { persistTheme } from "./lib/helpers";
import { useContext } from "./lib/context";

const AppConfig = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext();

  useEffect(() => {
    persistTheme(theme);
  }, [theme]);

  return <>{children}</>;
};

export default AppConfig;
