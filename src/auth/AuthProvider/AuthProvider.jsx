import { createContext, useState } from "react";
import { AUTH_STORAGE } from "../../constants";
import { storage } from "../../helpers/storage";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const isLogin = storage.getItem(AUTH_STORAGE) || false;

  const [isAuth, setIsAuth] = useState(isLogin);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
