import { useEffect, useState } from "react";
import {
  viewProfile,
  updateProfile,
  viewEmployerProfile,
  viewApplicantProfile,
} from "../services/profileService";

export const useProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const storedUserType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchData = async (userType) => {
      try {
        const data = await viewProfile(storedUserType || userType);
        setUserProfile(data);
      } catch (error) {
        console.log(error);
      }
    };
    storedUserType && !userProfile && fetchData();
  }, [storedUserType, userProfile]);

  const fetchProfile = async (userType) => {
    try {
      const data = await viewProfile(storedUserType || userType);
      setUserProfile(data);
    } catch (error) {
      return error;
    }
  };

  const fetchCompanyProfile = async (companyId) => {
    try {
      const data = await viewEmployerProfile(companyId);
      return data;
    } catch (error) {
      return error;
    }
  };

  const fetchApplicantsProfile = async (applicants) => {
    try {
      const data = await viewApplicantProfile(applicants);
      return data;
    } catch (error) {
      return error;
    }
  };

  const saveProfile = async (updatedProfile) => {
    try {
      const data = await updateProfile(storedUserType, updatedProfile);
      setUserProfile(data);
    } catch (error) {
      console.error("Error updating profile:", error);
      return error;
    }
  };

  return {
    userProfile,
    setUserProfile,
    fetchProfile,
    fetchCompanyProfile,
    fetchApplicantsProfile,
    saveProfile,
  };
};
