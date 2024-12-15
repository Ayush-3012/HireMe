/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { GoDotFill } from "react-icons/go";
import JobCard from "../JobCard";
import { useAllContext } from "../../context/HireMeContext";

const ERDashboard = ({ employerJobs, refreshDeletedJob }) => {
  const [openJobs, setOpenJobs] = useState(0);
  const [closedJobs, setClosedJobs] = useState(0);

  const { profile } = useAllContext();

  useEffect(() => {
    setOpenJobs(employerJobs.filter((job) => job.status === "Open").length);
    setClosedJobs(employerJobs.filter((job) => job.status === "Closed").length);
  }, [employerJobs]);

  const totalJobs = employerJobs.length;
  const progressPercentage = totalJobs > 0 ? (openJobs / totalJobs) * 100 : 0;

  return (
    <div className="p-4 flex flex-col gap-2 rounded-lg shadow-slate-950 shadow-[1px_1px_10px] text-yellow-400">
      <div className="flex py-4 justify-between items-center max-md:flex-col">
        <div className="flex flex-col max-md:mb-1 max-md:self-start">
          <h2 className="text-2xl font-bold max-md:text-xl">Jobs Overview</h2>
          <p className="ml-4">Track your job postings</p>
        </div>
        <div className="flex gap-5 items-center py-4 pr-4 justify-center max-sm:pr-0">
          <div className="relative rotate-45 bg-zinc-700 text-yellow-400 px-4 py-6 hover:shadow-yellow-400 hover:shadow-[1px_1px_10px] transition duration-150 ease-in-out rounded-md max-sm:py-4 max-sm:px-2 ">
            <div className="absolute top-2 left-2 bg-white p-1">
              <GoDotFill size={2} />
            </div>
            <div className="-rotate-45">
              <h3 className="text-xl max-md:text-sm max-sm:text-center">
                {openJobs}
              </h3>
              <p className="text-xl max-md:text-sm">Open Jobs</p>
            </div>
          </div>
          <div className="relative rotate-45 bg-zinc-900 text-yellow-400 px-4 py-6 hover:shadow-yellow-400 hover:shadow-[1px_1px_10px] transition duration-150 ease-in-out rounded-md max-sm:py-4 max-sm:px-2">
            <div className="absolute top-2 left-2 bg-white p-1">
              <GoDotFill size={2} />
            </div>
            <div className="-rotate-45">
              <h3 className="text-xl max-md:text-sm max-sm:text-center">
                {closedJobs}
              </h3>
              <p className="text-xl max-md:text-sm">Closed Jobs</p>
            </div>
          </div>
          <div className="relative rotate-45 bg-zinc-950 text-yellow-400 px-4 py-6 hover:shadow-yellow-400 hover:shadow-[1px_1px_10px] transition duration-150 ease-in-out rounded-md max-sm:py-4 max-sm:px-2">
            <div className="absolute top-2 left-2 bg-white p-1">
              <GoDotFill size={2} />
            </div>
            <div className="-rotate-45">
              <h3 className="text-xl max-md:text-sm max-sm:text-center">
                {totalJobs}
              </h3>
              <p className="text-xl max-md:text-sm">Total Jobs</p>
            </div>
          </div>
        </div>
      </div>

      <span className=" border-b-4 border-b-slate-900"></span>

      <div className="my-4">
        <h3 className="text-2xl font-semibold mb-2 max-md:text-xl">
          Job Posting Progress
        </h3>
        <ProgressBar
          completed={progressPercentage}
          bgColor="#E4D00A"
          labelColor="black"
          height="20px"
          labelAlignment="center"
        />
        <p className="mt-2">
          {progressPercentage.toFixed(2)}% of your job postings are currently
          open.
        </p>
      </div>

      <div className="">
        <h2 className="text-2xl font-semibold max-md:text-xl">
          Manage Your Jobs
        </h2>
        {employerJobs?.length === 0 ? (
          <p className="text-yellow-400">
            No jobs posted yet. Post your first job.
          </p>
        ) : (
          <div className="flex gap-4 w-fit max-w-full px-2 py-3 overflow-x-auto max-md:gap-2 max-md:px-1">
            {profile?.userProfile?.jobsPosted?.map((jobId) => (
              <JobCard
                key={jobId}
                jobId={jobId}
                refreshDeletedJob={refreshDeletedJob}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ERDashboard;
