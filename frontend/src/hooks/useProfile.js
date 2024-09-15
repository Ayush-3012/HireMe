import { useState, useEffect } from "react";
import { viewProfile, updateProfile } from "../services/profileService";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (!storedUserType) return;
    else {
      setUserType(storedUserType);

      const fetchProfile = async () => {
        try {
          const data = await viewProfile(storedUserType);
          if (data) setProfile(data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }
  }, []);

  const saveProfile = async (updatedProfile) => {
    try {
      const data = await updateProfile(userType, updatedProfile);
      setProfile(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return { profile, saveProfile, loading, setLoading };
};
