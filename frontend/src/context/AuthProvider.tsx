import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  role: "admin" | "teacher" | "student";
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, role: "admin" | "teacher" | "student") => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const login = (email: string, role: "admin" | "teacher" | "student") => {
    setUser({ email, role });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
