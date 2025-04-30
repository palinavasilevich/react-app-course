import { createContext, useState } from "react";
import { storage } from "../helpers/storage";
import { THEME_STORAGE } from "../constants";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const savedTheme = storage.getItem(THEME_STORAGE) || "light";

  const [theme, setTheme] = useState(savedTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
