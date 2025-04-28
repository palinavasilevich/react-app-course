import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";
import { Header } from "../Header";
import { ToastContainer } from "react-toastify";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className={cls.mainLayout}>
        <Header />
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

      <ToastContainer />
    </>
  );
};
