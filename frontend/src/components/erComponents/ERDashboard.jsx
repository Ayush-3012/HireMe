/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import JobItems from "../JobItems";

const ERDashboard = ({ employerJobs }) => {
  const [openJobs, setOpenJobs] = useState(0);
  const [closedJobs, setClosedJobs] = useState(0);

  useEffect(() => {
    setOpenJobs(employerJobs.filter((job) => job.status === "Open").length);
    setClosedJobs(employerJobs.filter((job) => job.status === "Closed").length);
  }, [employerJobs]);

  const totalJobs = employerJobs.length;
  const progressPercentage = totalJobs > 0 ? (openJobs / totalJobs) * 100 : 0;

  return (
    <div className="p-6 flex flex-col gap-2 rounded-lg bg-slate-600 text-white">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold">Jobs Overview</h2>
          <p className="">Track your job postings</p>
        </div>
        <div className="flex gap-5">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="text-xl">{openJobs}</h3>
            <p>Open Jobs</p>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h3 className="text-xl">{closedJobs}</h3>
            <p>Closed Jobs</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h3 className="text-xl">{totalJobs}</h3>
            <p>Total Jobs</p>
          </div>
        </div>
      </div>

      <div className="my-6">
        <h3 className="text-lg font-semibold mb-2">Job Posting Progress</h3>
        <ProgressBar
          completed={progressPercentage}
          bgColor="cyan"
          labelColor="#f00"
          height="20px"
          labelAlignment="center"
        />
        <p className="mt-2">
          {progressPercentage.toFixed(2)}% of your job postings are currently
          open.
        </p>
      </div>

      <div className="my-10">
        <h2 className="text-xl font-semibold">Manage Your Jobs</h2>
        {employerJobs.length === 0 ? (
          <p className="text-gray-600">
            No jobs posted yet. Post your first job.
          </p>
        ) : (
          <div className="text-xl grid grid-cols-1 gap-6">
            {employerJobs?.map((job) => (
              <div className="flex flex-col gap-2" key={job._id}>
                <JobItems job={job} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="notifications my-8">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="">You have no new notifications.</p>
      </div>
    </div>
  );
};

export default ERDashboard;
