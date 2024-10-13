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
    <div className="dashboard-container p-6 rounded-lg border-2">
      <div className="jobs-overview flex justify-between items-center my-5">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold">Jobs Overview</h2>
          <p className="text-gray-800">Track your job postings</p>
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
          bgColor="#FFFED3"
          labelColor="#000"
          height="20px"
          labelAlignment="center"
        />
        <p className="mt-2 text-gray-700">
          {progressPercentage.toFixed(2)}% of your job postings are currently
          open.
        </p>
      </div>

      {/* Manage Your Jobs Section */}
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
                <JobItems job={job} showEditButton={true} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="notifications my-8">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-gray-600">You have no new notifications.</p>
      </div>
    </div>
  );
};

export default ERDashboard;
