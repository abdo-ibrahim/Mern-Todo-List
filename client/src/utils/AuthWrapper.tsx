import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const [delay, setDelay] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      // wait 1 seconds before showing the loading screen
      setDelay(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !delay) {
    return <LoadingScreen />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
