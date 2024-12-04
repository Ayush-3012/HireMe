/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAllContext } from "../context/AuthContext";
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
        <div className="flex gap-4 w-fit max-w-full px-2 py-3 overflow-x-auto max-md:gap-2 max-md:px-1">
          {jobs?.jobs?.map((job) => (
            <JobCard key={job._id} foundJobs={job} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllJobs;
