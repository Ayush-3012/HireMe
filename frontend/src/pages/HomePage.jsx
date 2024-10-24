/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import EEHome from "../components/eeComponents/EEHome";
import ERHome from "../components/erComponents/ERHome";
import Welcome from "../components/Welcome";
import { useAllContext } from "../context/AuthContext";

const HomePage = () => {
  const currentUser = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const { profile, jobs } = useAllContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (profile) await profile.fetchProfile(currentUser);
        if (jobs) await jobs.fetchEmployerJobs(userId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col text-4xl items-center justify-center font-serif">
        <Welcome />
        {currentUser === "employee" && <EEHome />}
        {currentUser === "employer" && <ERHome />}
      </div>
    </>
  );
};

export default HomePage;
