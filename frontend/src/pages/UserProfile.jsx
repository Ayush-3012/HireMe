import EmployerProfile from "./EmployerProfile";
import EmployeeProfile from "./EmployeeProfile";
import { useAllContext } from "../context/AuthContext";
import { useEffect } from "react";

const UserProfile = () => {
  const currentUser = localStorage.getItem("userType");
  const { profile } = useAllContext();

  useEffect(() => {
    if (profile) profile?.fetchProfile(currentUser);
  }, []);

  if (!profile?.userProfile) return <div>No Profile Found</div>;
  return (
    <>
      {currentUser === "employee" && (
        <EmployeeProfile employeeProfile={profile.userProfile} />
      )}
      {currentUser === "employer" && (
        <EmployerProfile employerProfile={profile.userProfile} />
      )}
    </>
  );
};

export default UserProfile;
