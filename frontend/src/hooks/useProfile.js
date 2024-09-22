import { useState, useEffect } from "react";
import { viewProfile, updateProfile } from "../services/profileService";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType] = useState(localStorage.getItem("userType") || "");

  useEffect(() => {
    if (!userType) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await viewProfile(userType);
        if (data) setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userType]);

  const saveProfile = async (updatedProfile) => {
    try {
      const data = await updateProfile(userType, updatedProfile);
      setProfile(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return { profile, saveProfile, loading };
};
