import EmployerProfile from "./EmployerProfile";
import EmployeeProfile from "./EmployeeProfile";
import { useAuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const currentUser = localStorage.getItem("userType");
  const { profile } = useAuthContext();

  if (!profile) return <div>No Profile Found</div>;
  // console.log(profile.profile.foundEmployer);

  return (
    <>
      {currentUser === "employee" && (
        <EmployeeProfile EmployeeProfile={profile.profile.foundEmployee} />
      )}
      {currentUser === "employer" && (
        <EmployerProfile EmployerProfile={profile.profile.foundEmployer} />
      )}
    </>
  );
};

export default UserProfile;
