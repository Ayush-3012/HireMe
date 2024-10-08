import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import JobCard from "../JobCard";
import ERDashboard from "./ERDashboard";

const ERHome = () => {
  const { jobs } = useAuthContext();

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
        <p className="text-center">
          Post a job and start finding the best talent for your company!
        </p>
        <Link to="/postJob" className="px-4 bg-blue-400 rounded-xl">
          Post a Job
        </Link>
      </div>

      {/* <div className="dashboard-overview">
        <h2>Your Dashboard</h2>
        <ERDashboard />
      </div> */}

      <div className="my-10">
        <h2>Manage Your Jobs</h2>
        {jobs?.jobs.length === 0 ? (
          <p>No jobs posted yet. Post your first job</p>
        ) : (
          <div className="text-xl">
            <JobCard jobs={jobs?.jobs} />
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
