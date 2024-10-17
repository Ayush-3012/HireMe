import { useAllContext } from "../../context/AuthContext";
import JobItems from "../JobItems";

const FoundJobs = () => {
  const { jobs } = useAllContext();
  return (
  <>
    <div className="my-10">
        <h2 className="text-xl font-semibold">Manage Your Jobs</h2>
        {jobs?.specificJobs?.length === 0 ? (
          <p className="text-gray-600">
            No jobs found.
          </p>
        ) : (
          <div className="text-xl grid grid-cols-1 gap-6">
            {jobs?.specificJobs?.map((job) => (
              <div className="flex flex-col gap-2" key={job._id}>
                <JobItems job={job}/>
              </div>
            ))}
          </div>
        )}
      </div>
  </>
  );
};

export default FoundJobs;
