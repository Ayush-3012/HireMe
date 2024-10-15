/* eslint-disable react/no-unescaped-entities */
import { useAllContext } from "../../context/AuthContext"; // Assuming you are using this hook for employee data
import { Link } from "react-router-dom";
import { useState } from "react";

const EEHome = () => {
  const { profile } = useAllContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="employee-home">
      <div className="welcome-section my-6">
        <h1>Welcome, {profile?.userProfile?.fullName || "Job Seeker"}</h1>
        <p className="text-gray-600">
          Here's a quick overview of your profile.
        </p>
      </div>

      <div className="profile-overview mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-xl font-semibold">Your Profile</h2>
        <p>
          <strong>Skills:</strong> {profile?.userProfile?.skills?.join(", ")}
        </p>
        <p>
          <strong>Experience Level:</strong>{" "}
          {/* {profile?.userProfile?.experience || "Not provided"} */}
        </p>
        <Link
          to="/employee/profile"
          className="text-blue-500 underline mt-2 inline-block"
        >
          View and Edit Profile
        </Link>
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
        <p className="text-gray-600">You haven’t saved any jobs yet.</p>
      </div>

      <div className="applications-status mb-8">
        <h2 className="text-xl font-semibold">Application Status</h2>
        <p className="text-gray-600">Track the jobs you have applied to.</p>
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
