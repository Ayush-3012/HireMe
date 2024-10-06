import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const ERHome = () => {
  const { auth, jobs } = useAuthContext();
  // const [jobStats, setJobStats] = useState({
  //   totalJobs: 0,
  //   applicationsReceived: 0,
  //   pendingApplications: 0,
  //   activeJobs: 0,
  // });
  // const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      // const stats = await getEmployerStats(); // Mock API call
      // setJobStats(stats);
      await jobs?.fetchJobs();
      // console.log(jobs?.jobs.length);
    };

    fetchAllJobs();
  }, []);

  return (
    <div className="border w-[90%] flex flex-col">
      <div>
        <p>Post a job and start finding the best talent for your company!</p>
        <Link to="/post-job" className="px-4 bg-blue-400">
          Post a Job
        </Link>
      </div>

      <div className="dashboard-overview">
        <h2>Your Dashboard</h2>
        <div className="stats-grid">
          {/* <div className="stat-item">
            <h3>{jobStats.totalJobs}</h3>
            <p>Total Jobs Posted</p>
          </div>
          <div className="stat-item">
            <h3>{jobStats.applicationsReceived}</h3>
            <p>Applications Received</p>
          </div>
          <div className="stat-item">
            <h3>{jobStats.pendingApplications}</h3>
            <p>Pending Applications</p>
          </div>
          <div className="stat-item">
            <h3>{jobStats.activeJobs}</h3>
            <p>Active Jobs</p>
          </div> */}
        </div>
      </div>

      <div className="my-10">
        <h2>Manage Your Jobs</h2>
        {jobs?.jobs.length === 0 ? (
          <p>No jobs posted yet. Post your first job</p>
        ) : (
          <div className="text-xl">
            {jobs?.jobs?.map((job) => (
              <div key={job._id}>
                <p>Title: {job.title}</p>
                <p>Desciription: {job.description}</p>
                <p>Location: {job.location}</p>
                <p>Salary Range: {job.salaryRange}</p>
                <p>Employement Type: {job.employmentType}</p>
                <p>Company Name: {job.companyName}</p>
                <p>Current Status: {job.status}</p>
                <div className="flex gap-2">
                  Required Skills are:
                  {job.requiredSkills?.map((skill, idx) => (
                    <ul key={idx}>
                      <li>{skill}</li>
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="notifications">
        <h2>Notifications</h2>
      </div>
    </div>
  );
};

export default ERHome;
