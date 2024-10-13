import { useState } from "react";
import { viewProfile, updateProfile } from "../services/profileService";

export const useProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  // const [loading, setLoading] = useState(true);
  const storedUserType = localStorage.getItem("userType");

  const fetchProfile = async (userType) => {
    if (!storedUserType && !userType) return;
    const data = await viewProfile(storedUserType || userType);
    if (data) setUserProfile(data);
  };

  const saveProfile = async (updatedProfile) => {
    try {
      const data = await updateProfile(storedUserType, updatedProfile);
      setUserProfile(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return { userProfile, setUserProfile, fetchProfile, saveProfile };
};
