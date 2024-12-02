/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import { useAllContext } from "../../context/AuthContext";
import { useEffect } from "react";
import JobCard from "../JobCard";

const FoundJobs = () => {
  const { jobs } = useAllContext();
  const location = useLocation();
  const { searchTerm } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      await jobs?.fetchSpecificJobs(searchTerm);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className=" font-serif">
        <h2 className="text-4xl font-semibold my-4 text-yellow-400">
          Search Result for {searchTerm}:
        </h2>
        {jobs?.specificJobs?.length === 0 ? (
          <p className="text-yellow-400 text-3xl">No jobs found.</p>
        ) : (
          <div className="flex gap-4 w-fit max-w-full px-2 py-3 overflow-x-auto max-md:gap-2 max-md:px-1">
            {jobs?.specificJobs?.map((job) => (
              <JobCard key={job._id} foundJobs={job} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FoundJobs;
