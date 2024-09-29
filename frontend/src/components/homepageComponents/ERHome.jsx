import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

const ERHome = () => {
  const { auth } = useAuthContext();
  // const [jobStats, setJobStats] = useState({
  //   totalJobs: 0,
  //   applicationsReceived: 0,
  //   pendingApplications: 0,
  //   activeJobs: 0,
  // });
  // const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchEmployerData = async () => {
      // const stats = await getEmployerStats(); // Mock API call
      // const jobList = await getEmployerJobs(); // Mock API call
      // setJobStats(stats);
      // setJobs(jobList);
    };

    fetchEmployerData();
  }, []);

  return (
    <div className="employer-home-page">
      {/* Welcome Section */}
      <section>
        <p>Post a job and start finding the best talent for your company!</p>
        <Link to="/post-job" className="btn btn-primary">Post a Job</Link>
      </section>

      {/* Dashboard Overview */}
      {/* <section className="dashboard-overview">
        <h2>Your Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-item">
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
          </div>
        </div>
      </section> */}

      {/* Manage Jobs Section */}
      {/* <section className="manage-jobs">
        <h2>Manage Your Jobs</h2>
        {jobs.length === 0 ? (
          <p>No jobs posted yet. <Link to="/post-job">Post your first job</Link>.</p>
        ) : (
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Date Posted</th>
                <th>Applications Received</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.datePosted}</td>
                  <td>{job.applications}</td>
                  <td>{job.status}</td>
                  <td>
                    <Link to={`/jobs/${job.id}/applications`} className="btn btn-sm">View Applications</Link>
                    <Link to={`/jobs/${job.id}/edit`} className="btn btn-sm">Edit</Link>
                    <button className="btn btn-sm btn-danger">Close</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section> */}

      {/* Notifications Section */}
      <section className="notifications">
        <h2>Notifications</h2>
        <ul>
          {/* Mock notifications */}
          <li>You have 3 new applications for "Software Engineer".</li>
          <li>Your profile is 80% complete. Add more details to get better matches.</li>
        </ul>
      </section>
    </div>
  );
};

export default ERHome;
