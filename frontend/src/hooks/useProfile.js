import { useEffect, useState } from "react";
import { viewProfile, updateProfile } from "../services/profileService";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [storedUserType] = useState(localStorage.getItem("userType"));
  const storedUserType = localStorage.getItem("userType");

  useEffect(() => {
    fetchProfile(storedUserType);
  }, [])

  const fetchProfile = async (userType) => {
    if (!storedUserType && !userType) return;
    const data = await viewProfile(storedUserType || userType);
    // console.log(data)
    if (data) setProfile(data);
  };

  const saveProfile = async (updatedProfile) => {
    try {
      const data = await updateProfile(storedUserType, updatedProfile);
      setProfile(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return { profile, setProfile, fetchProfile, saveProfile };
};
