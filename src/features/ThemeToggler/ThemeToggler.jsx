import { THEME_STORAGE } from "../../constants";
import { storage } from "../../helpers/storage";
import { useTheme } from "../../hooks/useTheme";
import cls from "./ThemeToggler.module.css";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const onThemeChangeHandler = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);

    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);

    storage.setItem(THEME_STORAGE, newTheme);
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
