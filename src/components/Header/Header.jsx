import { Button } from "../Button";
import ReactLogo from "../../assets/react.svg";

import cls from "./Header.module.css";

export const Header = () => {
  return (
    <header className={cls.header}>
      <p>
        <img src={ReactLogo} alt="React Logo" />
        <span>React Quiz App</span>
      </p>
      <div className={cls.headerButtonsContainer}>
        <Button isDisabled>Add</Button>
        <Button isActive>Login</Button>
      </div>
    </header>
  );
};
