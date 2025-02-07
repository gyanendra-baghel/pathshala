import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../utils/types";
import API from "../utils/api";

interface User {
  email: string;
  role: UserRole;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, role: "ADMIN" | "TEACHER" | "STUDENT") => void;
  logout: () => void;
  authenticate: () => void;
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
  const getRole = (role: string): UserRole => {
    if (role === "MAIN_ADMIN") return UserRole.MAIN_ADMIN;
    if (role === "TEACHER") return UserRole.TEACHER;
    if (role === "STUDENT") return UserRole.STUDENT;
    return UserRole.STUDENT;
  };

  const login = (email: string, role: string) => {
    setUser({ email, role: getRole(role) });
  };

  const authenticate = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await API.get("/auth");
      console.log(response);
      if (response.status === 200) {
        const user = response.data.user;

        setUser({ email: user.email, role: getRole(user.role) });
      } else {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};
