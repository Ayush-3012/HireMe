import EmployerProfile from "./EmployerProfile";
import EmployeeProfile from "./EmployeeProfile";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const UserProfile = () => {
  const currentUser = localStorage.getItem("userType");
  const { profile } = useAuthContext();

  useEffect(() => {
    if (profile) profile?.fetchProfile(currentUser);
  }, []);

  if (!profile?.userProfile) return <div>No Profile Found</div>;
  console.log(profile.userProfile)
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
