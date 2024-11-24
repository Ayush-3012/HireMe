/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAllContext } from "../../context/AuthContext";
import JobCard from "../JobCard";

const EEDashboard = () => {
  const { profile, jobs } = useAllContext();
  const currentUser = localStorage.getItem("userType");
  const [refresh, setRefresh] = useState(false);

  const refreshSavedJobs = async () => {
    await profile?.fetchProfile(currentUser);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="px-4">
      <div className="flex flex-col gap-4 text-xl">
        <div className="flex flex-col max-md:items-center">
          <h2 className="text-2xl font-semibold text-yellow-300 max-md:self-start max-md:text-xl">
            Saved Jobs
          </h2>
          {profile?.userProfile?.savedJobs?.length === 0 ? (
            <p className="text-yellow-400 ml-2">
              You haven’t saved any jobs yet.
            </p>
          ) : (
            <div className="flex gap-4 w-fit max-w-full px-2 py-3 overflow-x-auto max-md:gap-2 max-md:px-1">
              {profile?.userProfile?.savedJobs?.map((jobId) => (
                <JobCard
                  key={jobId}
                  jobId={jobId}
                  fromSavedJobs={true}
                  refreshSavedJobs={refreshSavedJobs}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col max-md:items-center">
          <h2 className="text-2xl font-semibold text-yellow-300 max-md:self-start max-md:text-xl">
            Application Status
          </h2>
          {profile?.userProfile?.appliedJobs?.length === 0 ? (
            <p className="text-yellow-400">
              Track the jobs you have applied to.
            </p>
          ) : (
            <div className="flex gap-4 w-fit max-w-full px-2 py-3 overflow-x-auto max-md:gap-2 max-md:px-1">
              {profile?.userProfile?.appliedJobs?.map((jobId) => (
                <JobCard key={jobId} jobId={jobId} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col max-md:items-center">
          {jobs?.recommendedJobs?.length === 0 && (
            <p className="text-yellow-400 ml-2">
              Searching for jobs that matched your profile...
            </p>
          )}
          {jobs?.recommendedJobs?.length !== 0 && (
            <>
              <h2 className="text-2xl font-semibold text-yellow-300 max-md:self-start max-md:text-xl">
                Recommended Jobs - Jobs tailored to your profile.
              </h2>

              <div className="flex gap-4 w-fit max-w-full px-2 py-3 overflow-x-auto max-md:gap-2 max-md:px-1">
                {jobs?.recommendedJobs?.map((job) => (
                  <JobCard key={job._id} jobId={job._id} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EEDashboard;
