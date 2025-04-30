import { createContext, useState, useLayoutEffect } from "react";
import { storage } from "../helpers/storage";
import { THEME_STORAGE } from "../constants";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const applyTheme = (value) => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(value);
    setTheme(value);
  };

  useLayoutEffect(() => {
    const saved = storage.getItem(THEME_STORAGE);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const initial = saved || (prefersDark.matches ? "dark" : "light");

    applyTheme(initial);

    const handleChange = (e) => {
      if (!storage.getItem(THEME_STORAGE)) {
        applyTheme(e.matches ? "dark" : "light");
      }
    };

    prefersDark.addEventListener("change", handleChange);
    return () => prefersDark.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
