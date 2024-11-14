/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import ERDashboard from "./ERDashboard";
import { useEffect } from "react";
import { useAllContext } from "../../context/AuthContext";

const ERHome = () => {
  const { jobs } = useAllContext();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (jobs) await jobs?.fetchEmployerJobs(userId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-evenly text-3xl">
        <p className="text-yellow-400">
          Post a job and start finding the best talent for your company!
        </p>
        <Link
          to="/postJob"
          className="px-4 bg-gray-500 rounded-full text-yellow-300 hover:text-yellow-400 hover:bg-gray-700 hover:scale-x-110 transition-all duration-200"
        >
          Post a Job
        </Link>
      </div>

      <div className="flex flex-col mt-2 text-2xl mx-4">
        <ERDashboard employerJobs={jobs?.employerJobs} />
      </div>
    </>
  );
};

export default ERHome;
