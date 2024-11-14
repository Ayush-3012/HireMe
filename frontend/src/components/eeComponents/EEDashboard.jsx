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
    <>
      <div className="flex flex-col gap-4 text-xl">
        <div className="px-4">
          <h2 className="text-2xl font-semibold text-yellow-300">Saved Jobs</h2>
          {profile?.userProfile?.savedJobs?.length === 0 ? (
            <p className="text-yellow-400 ml-2">
              You haven’t saved any jobs yet.
            </p>
          ) : (
            <div className="flex gap-4 bg-slate-600 w-fit max-w-full rounded-md py-4 px-2 overflow-x-auto">
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

        <div className="px-4">
          <h2 className="text-2xl font-semibold text-yellow-300">
            Application Status
          </h2>
          {profile?.userProfile?.appliedJobs?.length === 0 ? (
            <p className="text-yellow-400">
              Track the jobs you have applied to.
            </p>
          ) : (
            <div className="flex gap-4 bg-slate-600 w-fit max-w-full rounded-md py-4 px-2 overflow-x-auto">
              {profile?.userProfile?.appliedJobs?.map((jobId) => (
                <JobCard key={jobId} jobId={jobId} />
              ))}
            </div>
          )}
        </div>

        <div className="px-4">
          {jobs?.recommendedJobs?.length !== 0 && (
            <>
              <h2 className="text-2xl font-semibold text-yellow-300">
                Recommended Jobs - Jobs tailored to your profile.
              </h2>

              <div className="flex gap-4 bg-slate-600 w-fit max-w-full rounded-md py-4 px-2 overflow-x-auto">
                {jobs?.recommendedJobs?.map((job) => (
                  <JobCard key={job._id} jobId={job._id} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EEDashboard;
