/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAllContext } from "../context/AuthContext";
import JobItems from "../components/JobItems";

const AllJobs = () => {
  const { jobs } = useAllContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (jobs) await jobs?.fetchJobs();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="grid gap-3 my-4">
        {jobs?.jobs?.map((job) => (
          <JobItems key={job._id} job={job} />
        ))}
      </div>
    </>
  );
};

export default AllJobs;
