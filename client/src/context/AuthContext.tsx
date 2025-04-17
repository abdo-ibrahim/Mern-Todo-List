import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getUserFromToken } from "@/utils/getUserFromToken";
import { AuthContextType, UserData } from "@/types/type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    try {
      const userData = getUserFromToken();
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, loading, setUser }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth يجب أن يُستخدم داخل AuthProvider");
  }
  return context;
};
