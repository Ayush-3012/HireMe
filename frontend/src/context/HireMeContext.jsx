import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import useJob from "../hooks/useJob";
import { useChat } from "../hooks/useChat";

const HireMeContext = createContext();

// eslint-disable-next-line react/prop-types
export const HireMeContextProvider = ({ children }) => {
  const auth = useAuth();
  const profile = useProfile();
  const jobs = useJob();
  const chats = useChat();

  const contextValue = { auth, profile, jobs, chats };

  return (
    <HireMeContext.Provider value={contextValue}>
      {children}
    </HireMeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllContext = () => useContext(HireMeContext);
