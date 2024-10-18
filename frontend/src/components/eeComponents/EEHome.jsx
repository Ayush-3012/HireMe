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
    <div className="w-[90%] bg-yellow-800 px-4 py-2 rounded-xl">
      <div className="welcome-section my-6">
        <h1>Welcome, {profile?.userProfile?.fullName || "Job Seeker"}</h1>
      </div>

      <div className="px-4 py-2 flex flex-col mb-8">
        <h2 className="text-xl font-semibold">Search for Jobs</h2>
        <form
          onSubmit={handleSearchSubmit}
          className="mt-2 flex gap-4 justify-center items-center"
        >
          <input
            type="text"
            placeholder="Search jobs by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-1 px-2 w-full border text-xl border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white text-xl py-1 px-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4 text-xl">
        <div className="px-4">
          <h2 className="text-2xl font-semibold">Saved Jobs</h2>
          {profile?.userProfile?.savedJobs.length === 0 ? (
            <p className="text-zinc-200">You haven’t saved any jobs yet.</p>
          ) : (
            <>
              {profile?.userProfile?.savedJobs.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </>
          )}
        </div>

        <div className="px-4">
          <h2 className="text-2xl font-semibold">Application Status</h2>
          {profile?.userProfile?.appliedJobs.length === 0 ? (
            <p className="text-zinc-200">Track the jobs you have applied to.</p>
          ) : (
            <>
              {profile?.userProfile?.appliedJobs.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </>
          )}
        </div>

        <div className="px-4 flex flex-col">
          <h2 className="text-2xl font-semibold">Recommended Jobs</h2>
          <p className="text-zinc-200">Jobs tailored to your profile.</p>
        </div>

        <div className="px-4">
          <h2 className="text-2xl font-semibold">Notifications</h2>
          <p className="text-zinc-200">You have no new notifications.</p>
        </div>
      </div>
    </div>
  );
};

export default EEHome;
