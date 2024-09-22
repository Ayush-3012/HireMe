import EmployerProfile from "./EmployerProfile";
import EmployeeProfile from "./EmployeeProfile";
import { useAuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const currentUser = localStorage.getItem("userType");
  const { profile, loading } = useAuthContext();

  if (loading) return <div>Loading...</div>;

  if (!profile) return <div>No Profile Found</div>;

  return (
    <>
      {currentUser === "employee" && (
        <EmployeeProfile EmployeeProfile={profile.foundEmployee} />
      )}
      {currentUser === "employer" && (
        <EmployerProfile EmployerProfile={profile.foundEmployer} />
      )}
    </>
  );
};

export default UserProfile;
