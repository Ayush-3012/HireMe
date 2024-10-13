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
    <div className="w-[95%] flex flex-col gap-4">
      <div className="flex border-2 p-2 border-orange-800 justify-evenly">
        <p>Post a job and start finding the best talent for your company!</p>
        <Link to="/postJob" className="px-4 bg-blue-400 rounded-xl">
          Post a Job
        </Link>
      </div>

      <div className="flex flex-col border-2 p-2 border-green-600">
        <h2>Your Dashboard</h2>
        <ERDashboard employerJobs={jobs?.employerJobs} />
      </div>
    </div>
  );
};

export default ERHome;
