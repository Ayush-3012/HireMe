import { useEffect, useState } from "react";
import {
  viewProfile,
  updateProfile,
  viewApplicantProfile,
} from "../services/profileService";

export const useProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const storedUserType = localStorage.getItem("userType");

  useEffect(() => {
    if (storedUserType && !userProfile) fetchProfile(storedUserType);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedUserType, userProfile]);

  const fetchProfile = async (userType) => {
    try {
      const data = await viewProfile(storedUserType || userType);
      setUserProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplicantsProfile = async (applicants) => {
    const data = await viewApplicantProfile(applicants);
    return data;
  };

  const saveProfile = async (updatedProfile) => {
    try {
      const data = await updateProfile(storedUserType, updatedProfile);
      setUserProfile(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return {
    userProfile,
    setUserProfile,
    fetchProfile,
    fetchApplicantsProfile,
    saveProfile,
  };
};
