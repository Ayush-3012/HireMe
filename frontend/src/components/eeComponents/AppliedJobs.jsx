import { useAllContext } from "../../context/AuthContext";
import JobItems from "../JobItems";

const AppliedJobs = () => {
  const { jobs } = useAllContext();

  return (
    <>
    <div className="bg-blue-400 mx-4 my-2 p-6 rounded-lg border-2">
      <div className="my-10">
        <h2 className="text-xl font-semibold">All Your Applied Jobs</h2>
        {jobs?.appliedJobs?.length === 0 ? (
          <p className="text-gray-600">
            You have not applied to any Job, Apply Now.
          </p>
        ) : (
          <div className="text-xl my-2 grid grid-cols-1 gap-6">
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
