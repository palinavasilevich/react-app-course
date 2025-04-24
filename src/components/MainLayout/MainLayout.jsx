import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={cls.mainLayout}>
      <header className={cls.header}>Header</header>
      <div className={cls.mainWrapper}>
        <main className={cls.main}>
          <Outlet />
        </main>
        <footer className={cls.footer}>
          React Quiz Application | {currentYear} <br />
          by pvslvch
        </footer>
      </div>
    </div>
  );
};
