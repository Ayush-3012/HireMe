import EmployerProfile from "./EmployerProfile";
import EmployeeProfile from "./EmployeeProfile";

const UserProfile = () => {
  const currentUser = localStorage.getItem("userType");
  
  return (
    <>
      {currentUser === "employee" && <EmployeeProfile />}
      {currentUser === "employer" && <EmployerProfile />}
    </>
  );
};

export default UserProfile;
