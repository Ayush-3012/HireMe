/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import EEHome from "../components/eeComponents/EEHome";
import ERHome from "../components/erComponents/ERHome";
import Welcome from "../components/Welcome";
import { useAllContext } from "../context/AuthContext";

const HomePage = () => {
  const currentUser = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const { profile, jobs, auth } = useAllContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (profile) await profile.fetchProfile(currentUser);
        if (jobs) await jobs.fetchEmployerJobs(userId);
      } catch (error) {
        console.log(error);
      }
    };
    auth.user && fetchData();
  }, [auth.user, auth.userType]);

  return (
    <>
      {auth?.user && auth?.userType && (
        <div className="space-y-2 font-serif">
          <Welcome />
          <div className="bg-gray-800  mx-2  px-4 py-2 rounded-md">
            {currentUser === "employee" && <EEHome />}
            {currentUser === "employer" && <ERHome />}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
