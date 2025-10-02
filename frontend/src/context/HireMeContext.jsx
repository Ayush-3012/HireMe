/* eslint-disable react/prop-types */
import { createContext, useContext, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import useJob from "../hooks/useJob";
import { useChat } from "../hooks/useChat";
import { io } from "socket.io-client";

const HireMeContext = createContext();

export const HireMeContextProvider = ({ children }) => {
  const auth = useAuth();
  const profile = useProfile();
  const jobs = useJob();
  const chats = useChat();
  const socket = useRef(null);

  useEffect(() => {
    if (auth.user && !socket.current) {
      socket.current = io(import.meta.env.VITE_SERVER);

      socket.current.on("connect", () => {
        console.log("Socket connected:", socket.current.id);
      });

      socket.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [auth.user]);

  const contextValue = { auth, profile, jobs, chats, socket };

  return (
    <HireMeContext.Provider value={contextValue}>
      {children}
    </HireMeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllContext = () => useContext(HireMeContext);
