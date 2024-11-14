/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAllContext } from "../../context/AuthContext";
import JobItems from "../JobItems";
import { enqueueSnackbar } from "notistack";

const AppliedJobs = () => {
  const { jobs } = useAllContext();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      if (jobs) {
        await jobs?.fetchAppliedJobs(userId);
        enqueueSnackbar("Applied jobs", { variant: "success" });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="">
        <div className="">
          <h2 className="text-xl font-semibold">All Your Applied Jobs</h2>
          {jobs?.appliedJobs?.length === 0 ? (
            <p className="text-gray-600">
              You have not applied to any Job, Apply Now.
            </p>
          ) : (
            <div className="flex flex-col gap-2 mx-2">
              {jobs?.appliedJobs?.map((job) => (
                <div className="flex flex-col gap-2" key={job._id}>
                  <JobItems job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppliedJobs;
