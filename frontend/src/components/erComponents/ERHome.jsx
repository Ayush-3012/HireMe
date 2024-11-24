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
      <div className="flex justify-evenly items-center my-4 text-2xl max-md:text-xl max-sm:text-sm max-md:flex-col">
        <p className="text-yellow-400 text-3xl max-md:text-2xl max-sm:text-xl">
          Post a job and start finding the best talent for your company!
        </p>
        <Link
          to="/postJob"
          className="px-4 flex items-center text-2xl justify-center bg-gray-950 shadow-white shadow-[1px_1px_5px] rounded-full text-yellow-300 hover:shadow-yellow-300 hover:scale-x-110 transition-all duration-200 max-md:text-xl max-sm:text-lg"
        >
          Post a Job
        </Link>
      </div>

      <>
        <ERDashboard employerJobs={jobs?.employerJobs} />
      </>
    </>
  );
};

export default ERHome;
