/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ERDashboard from "./ERDashboard";
import { useEffect, useState } from "react";
import { useAllContext } from "../../context/HireMeContext";

const ERHome = () => {
  const { jobs, profile } = useAllContext();
  const userId = localStorage.getItem("userId");
  const currentUser = localStorage.getItem("userType");

  const [refresh, setRefresh] = useState(false);

  const refreshDeletedJob = async () => {
    await profile?.fetchProfile(currentUser);
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await profile?.fetchProfile(currentUser);
        await jobs?.fetchEmployerJobs(userId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser, jobs, profile, userId]);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
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
        <ERDashboard
          employerJobs={jobs?.employerJobs}
          refreshDeletedJob={refreshDeletedJob}
        />
      </>
    </motion.div>
  );
};

export default ERHome;
