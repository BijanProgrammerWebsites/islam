import { createContext } from "react";

import { Theme } from "@/types/theme.type";

type ContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ContextValue>({
  theme: "light",
  toggleTheme: () => {},
});
