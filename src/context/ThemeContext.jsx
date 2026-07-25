import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
  localStorage.setItem("theme", theme);

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const activeTheme =
    theme === "system"
      ? prefersDark
        ? "dark"
        : "light"
      : theme;

    if (activeTheme === "dark") {
        document.body.classList.add("dark");
        document.documentElement.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
        document.documentElement.classList.remove("dark");
    }
    }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);