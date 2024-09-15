/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useProfile } from "../hooks/useProfile.js";

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const profile = useProfile();

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfileContext = () => useContext(ProfileContext);
