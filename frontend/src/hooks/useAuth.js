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
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) setUserType(storedUserType);

    const checkStatus = async () => {
      if (!storedUserType) return;
      const data = await checkAuthStatus(storedUserType);
      if (data) {
        setUser(data);
        localStorage.setItem("userId", data.userId);
      }
    };
    checkStatus();
  }, []);

  const registerAuth = async (user) => {
    const data = await registerUser(user, userType);
    if (data) {
      setUserType(userType);
      localStorage.setItem("userType", userType);
    }
  };

  const loginAuth = async (user) => {
    const data = await loginUser(user, userType);
    if (data) {
      setUserType(userType);
      localStorage.setItem("userType", userType);
      localStorage.setItem("userId", data.userId);
      navigate("/home");
    }
  };

  const logoutAuth = async () => {
    await logoutUser(userType);
    setUser(null);
    setUserType(null);
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    navigate("/");
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
