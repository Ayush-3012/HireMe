/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAllContext } from "../context/HireMeContext";
import { enqueueSnackbar } from "notistack";
import JobCard from "../components/JobCard";

const AllJobs = () => {
  const { jobs } = useAllContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (jobs) await jobs?.fetchJobs();
        enqueueSnackbar("All Jobs", { variant: "success" });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="font-serif">
        <h2 className="text-4xl mx-4 font-semibold my-4 text-yellow-400">
          All Jobs
        </h2>
        <motion.div
          className="flex gap-4 w-fit max-w-full px-2 py-3 overflow-x-auto max-md:gap-2 max-md:px-1"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
        >
          {jobs?.jobs?.map((job) => (
            <JobCard key={job._id} foundJobs={job} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AllJobs;
