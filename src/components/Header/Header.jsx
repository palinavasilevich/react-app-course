import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

import { useAuth } from "../../hooks/useAuth";
import { storage } from "../../helpers/storage";
import { AUTH_STORAGE } from "../../constants";

import ReactLogo from "../../assets/react.svg";

import cls from "./Header.module.css";
import { ThemeToggler } from "../../features/ThemeToggler/ThemeToggler";

export const Header = () => {
  const navigate = useNavigate();

  const { isAuth, setIsAuth } = useAuth();

  const onLoginHandler = () => {
    storage.setItem(AUTH_STORAGE, !isAuth);
    setIsAuth(!isAuth);
  };

  return (
    <header className={cls.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="React Logo" />
        <span>React Quiz App</span>
      </p>
      <div className={cls.headerButtonsContainer}>
        <ThemeToggler />

        {isAuth && (
          <Button onClick={() => navigate("/addquestion")}>Add</Button>
        )}

        <Button onClick={onLoginHandler} isActive={!isAuth}>
          {!isAuth ? "Login" : "Logout"}
        </Button>
      </div>
    </header>
  );
};
