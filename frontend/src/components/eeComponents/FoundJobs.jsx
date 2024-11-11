/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import { useAllContext } from "../../context/AuthContext";
import JobItems from "../JobItems";
import { useEffect } from "react";

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
      <div className="my-10 font-serif">
        <h2 className="text-xl font-semibold mx-2">
          Search Result for {searchTerm}:
        </h2>
        {jobs?.specificJobs?.length === 0 ? (
          <p className="text-gray-600 mx-4 text-3xl">No jobs found.</p>
        ) : (
          <div className="text-xl grid grid-cols-1 gap-6 mx-4">
            {jobs?.specificJobs?.map((job) => (
              <div className="flex flex-col gap-2" key={job._id}>
                <JobItems job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FoundJobs;
