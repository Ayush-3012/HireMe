import { useState, useEffect } from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

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
    if (data.status === 201) {
      setUserType(userType);
      localStorage.setItem("userType", userType);
    }
    return data;
  };

  const loginAuth = async (user) => {
    const data = await loginUser(user, userType);
    if (data.status === 200) {
      setUser(data);
      setUserType(userType);
      localStorage.setItem("userType", userType);
      localStorage.setItem("userId", data?.data?.userId);
    }
    return data;
  };

  const logoutAuth = async () => {
    const data = await logoutUser(userType);
    if (data.status === 200) {
      setUser(null);
      setUserType(null);
      localStorage.removeItem("userType");
      localStorage.removeItem("userId");
    }
    return data;
  };

  return {
    user,
    userType,
    setUserType,
    loginAuth,
    logoutAuth,
    registerAuth,
  };
};
