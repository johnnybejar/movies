import { createContext, useState, useContext } from "react";

interface Auth {
  auth: Object;
  setAuth: (a: Object) => void;
}

const AuthContext = createContext<Auth>({
  auth: {},
  setAuth: () => {},
});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
