import { Button } from "../Button";
import ReactLogo from "../../assets/react.svg";

import { useNavigate } from "react-router-dom";
import cls from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={cls.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="React Logo" />
        <span>React Quiz App</span>
      </p>
      <div className={cls.headerButtonsContainer}>
        <Button onClick={() => navigate("/addquestion")}>Add</Button>
        <Button isDisabled>Login</Button>
      </div>
    </header>
  );
};
