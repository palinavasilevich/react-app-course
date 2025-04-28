import cls from "./Badge.module.css";

export const Badge = ({ variant, children }) => {
  return <div className={`${cls.badge} ${cls[variant]}`}>{children}</div>;
};
