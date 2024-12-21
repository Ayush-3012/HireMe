/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAllContext } from "../../context/HireMeContext";
import { enqueueSnackbar } from "notistack";
import JobCard from "../JobCard";

const AppliedJobs = () => {
  const { jobs } = useAllContext();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      if (jobs) {
        await jobs?.fetchAppliedJobs(userId);
        enqueueSnackbar("All your Applied jobs", { variant: "success" });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="font-serif">
        <h2 className="text-4xl font-semibold my-4 text-yellow-400">
          All Your Applied Jobs
        </h2>
        {jobs?.appliedJobs?.length === 0 ? (
          <p className="text-gray-600">
            You have not applied to any Job, Apply Now.
          </p>
        ) : (
          <motion.div
            className="flex gap-4 w-fit max-w-full px-2 py-3 overflow-x-auto max-md:gap-2 max-md:px-1"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
          >
            {jobs?.appliedJobs?.map((job) => (
              <JobCard key={job._id} foundJobs={job} />
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default AppliedJobs;
