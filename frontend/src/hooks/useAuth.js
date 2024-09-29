import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) setUserType(storedUserType);

    const checkStatus = async () => {
      if (!storedUserType) return;
      const data = await checkAuthStatus(storedUserType);
      if (data) {
        setUser(data);
        // setIsAuthenticated(true);
      }
    };
    checkStatus();
  }, []);

  const registerAuth = async (user) => {
    const data = await registerUser(user, userType);
    if (data) {
      setUser({ data });
      // setIsAuthenticated(true);
      setUserType(userType);
      localStorage.setItem("userType", userType);
    }
  };

  const loginAuth = async (user) => {
    const data = await loginUser(user, userType);
    if (data) {
      setUser({ data });
      // setIsAuthenticated(true);
      setUserType(userType);
      localStorage.setItem("userType", userType);
      navigate("/home");
    }
  };

  const logoutAuth = async () => {
    await logoutUser(userType);
    // setIsAuthenticated(false);
    setUser(null);
    setUserType(null);
    navigate("/");
    localStorage.removeItem("userType");
  };

  return {
    user,
    // isAuthenticated,
    // loading,
    userType,
    setUserType,
    loginAuth,
    logoutAuth,
    registerAuth,
  };
};
