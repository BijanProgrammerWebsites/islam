"use client";

import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

import { ThemeContext } from "@/context/theme.context";

import { Theme } from "@/types/theme.type";

type Props = PropsWithChildren;

export default function ThemeProvider({ children }: Props): ReactNode {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const item = localStorage.getItem("theme");
    setTheme(item === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((old) => (old === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
