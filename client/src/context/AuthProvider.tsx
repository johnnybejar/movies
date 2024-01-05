import { createContext, useState, useContext } from "react";
import { User } from "../types/user";

interface Auth {
  auth: User;
  setAuth: (a: User) => void;
}

const AuthContext = createContext<Auth>({
  auth: {} as User,
  setAuth: () => {},
});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({} as User);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
