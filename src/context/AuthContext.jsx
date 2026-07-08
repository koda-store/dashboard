import { createContext, useContext, useState, useEffect } from "react";
import { login, me } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const checkUser = async () => {
    const token = localStorage.getItem("dashboard-token");

    if (!token) return;

    try {
      const data = await me();
      setUser(data.user);
    } catch {
      localStorage.removeItem("dashboard-token");
    }
  };

  checkUser();
}, []);

  const loginUser = async (email, password) => {
    setLoading(true);

    try {
      const data = await login(email, password);

      localStorage.setItem("dashboard-token", data.token);
      setUser(data.user);

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);