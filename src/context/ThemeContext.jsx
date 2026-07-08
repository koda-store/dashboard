
import { useState, useEffect } from "react";
import { Theme } from "../components/Navbar/Context.jsx";

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      {children}
    </Theme.Provider>
  );
};

export default ThemeContext;