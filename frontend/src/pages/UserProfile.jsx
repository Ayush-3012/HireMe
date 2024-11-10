/* eslint-disable react-hooks/exhaustive-deps */
import EmployerProfile from "./EmployerProfile";
import EmployeeProfile from "./EmployeeProfile";
import { useAllContext } from "../context/AuthContext";
import { useEffect } from "react";

const UserProfile = () => {
  const currentUser = localStorage.getItem("userType");
  const { profile } = useAllContext();

  useEffect(() => {
    const fetchData = async () => {
      if (profile) await profile?.fetchProfile(currentUser);
    };
    fetchData();
  }, []);

  if (!profile?.userProfile) return <div>No Profile Found</div>;
  return (
    <>
      {currentUser === "employee" ? (
        <EmployeeProfile employeeProfile={profile.userProfile} />
      ) : (
        <EmployerProfile employerProfile={profile.userProfile} />
      )}
    </>
  );
};

export default UserProfile;
