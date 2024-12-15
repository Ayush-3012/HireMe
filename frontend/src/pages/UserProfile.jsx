/* eslint-disable react/prop-types */
import EmployerProfile from "./EmployerProfile";
import EmployeeProfile from "./EmployeeProfile";
import { useAllContext } from "../context/HireMeContext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UserProfile = ({ fromViewEmployerProfile }) => {
  const location = useLocation();
  const currentUser = localStorage.getItem("userType");
  const { companyId } = location.state || {};
  const [companyProfile, setCompanyProfile] = useState([]);
  const { profile } = useAllContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await profile?.fetchCompanyProfile(companyId);
        setCompanyProfile(data);
      } catch (error) {
        console.log(error);
      }
    };
    fromViewEmployerProfile && fetchData();
  }, [companyId, fromViewEmployerProfile, profile]);

  if (!profile?.userProfile) return <div>No Profile Found</div>;
  return (
    <>
      {!fromViewEmployerProfile ? (
        <>
          {currentUser === "employee" ? (
            <EmployeeProfile employeeProfile={profile.userProfile} />
          ) : (
            <EmployerProfile employerProfile={profile.userProfile} />
          )}
        </>
      ) : (
        <>
          <EmployerProfile
            employerProfile={companyProfile}
            fromViewEmployerProfile={fromViewEmployerProfile}
          />
        </>
      )}
    </>
  );
};

export default UserProfile;
