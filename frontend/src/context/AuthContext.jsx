import { createContext, useContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("employee");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    }
    async function checkStatus() {
      if (!storedUserType) return;
      const data = await checkAuthStatus(storedUserType);

      if (data) {
        setUser(data);
        setIsAuthenticated(true);
      }
    }
    checkStatus();
  }, []);

  const registerAuth = async (user) => {
    const data = await registerUser(user, userType);
    if (data) {
      setUser({ data });
      setIsAuthenticated(true);
      setUserType(userType);
      localStorage.setItem("userType", userType);
    }
  };

  const loginAuth = async (user) => {
    const data = await loginUser(user, userType);
    if (data) {
      setUser({ data });
      setIsAuthenticated(true);
      setUserType(userType);
      localStorage.setItem("userType", userType);
    }
  };

  const logoutAuth = async () => {
    await logoutUser(userType);
    setIsAuthenticated(false);
    setUser(null);
    setUserType(null);
    localStorage.removeItem("userType");
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    setUserType,
    loginAuth,
    logoutAuth,
    registerAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
