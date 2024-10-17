import { useNavigate } from "react-router-dom";
import { useAllContext } from "../../context/AuthContext"; // Assuming you are using this hook for employee data
import { useState } from "react";

const EEHome = () => {
  const { profile, jobs } = useAllContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await jobs?.fetchSpecificJobs(searchTerm);
    navigate("/searchResult");
  };

  return (
    <div className="employee-home">
      <div className="welcome-section my-6">
        <h1>Welcome, {profile?.userProfile?.fullName || "Job Seeker"}</h1>
      </div>

      <div className="job-search mb-8">
        <h2 className="text-xl font-semibold">Search for Jobs</h2>
        <form onSubmit={handleSearchSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Search jobs by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-2 hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      <div className="saved-jobs mb-8">
        <h2 className="text-xl font-semibold">Saved Jobs</h2>
        {profile?.userProfile?.savedJobs.length === 0 ? (
          <p className="text-gray-600">You haven’t saved any jobs yet.</p>
        ) : (
          <>
            {profile?.userProfile?.savedJobs.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </>
        )}
      </div>

      <div className="applications-status mb-8">
        <h2 className="text-xl font-semibold">Application Status</h2>
        {profile?.userProfile?.appliedJobs.length === 0 ? (
          <p className="text-gray-600">Track the jobs you have applied to.</p>
        ) : (
          <>
            {profile?.userProfile?.appliedJobs.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </>
        )}
      </div>

      <div className="recommended-jobs mb-8">
        <h2 className="text-xl font-semibold">Recommended Jobs</h2>
        <p className="text-gray-600">Jobs tailored to your profile.</p>
      </div>

      <div className="notifications mb-8">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-gray-600">You have no new notifications.</p>
      </div>
    </div>
  );
};

export default EEHome;
