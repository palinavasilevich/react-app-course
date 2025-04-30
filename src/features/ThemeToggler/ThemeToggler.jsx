import { THEME_STORAGE } from "../../constants";
import { storage } from "../../helpers/storage";
import { useTheme } from "../../hooks/useTheme";
import cls from "./ThemeToggler.module.css";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const onThemeChangeHandler = (e) => {
    const updatedTheme = e.target.checked === false ? "light" : "dark";

    setTheme(updatedTheme);
    storage.setItem(THEME_STORAGE, updatedTheme);
  };

  return (
    <label className={cls.switch}>
      <input
        type="checkbox"
        onChange={onThemeChangeHandler}
        checked={theme === "dark"}
      />
      <span className={cls.slider}></span>
      <span className={cls.cloudsStars}></span>
    </label>
  );
};
