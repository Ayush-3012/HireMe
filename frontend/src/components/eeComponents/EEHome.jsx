/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { useAllContext } from "../../context/AuthContext"; // Assuming you are using this hook for employee data
import { useEffect, useState } from "react";
import EEDashboard from "./EEDashboard";

const EEHome = () => {
  const { profile, jobs } = useAllContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      if (jobs) {
        await jobs?.getRecommendation();
        await jobs?.fetchAppliedJobs(userId);
      }
    };

    fetchData();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await jobs?.fetchSpecificJobs(searchTerm);
    navigate("/searchResult", { state: { searchTerm } });
  };

  return (
    <div className="w-[90%] bg-yellow-800 px-4 py-2 rounded-xl h-full">
      <div className="flex justify-between items-center">
        <div className="welcome-section my-6">
          <h1 className="text-slate-100">
            Welcome, {profile?.userProfile?.fullName || "Job Seeker"}
          </h1>
        </div>
        <div className="flex gap-4 p-2">
          <Link
            to={"/showAllJobs"}
            className="bg-blue-500 text-white text-2xl py-1 px-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
          >
            Show All Job
          </Link>
          <Link
            to={"/myAppliedJobs"}
            className="bg-blue-500 text-white text-2xl py-1 px-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
          >
            My Applied Jobs
          </Link>
        </div>
      </div>

      <hr />

      <div className="px-4 py-2 mb-4 flex my-2 flex-col">
        <h2 className="text-xl font-semibold text-zinc-200">Search for Jobs</h2>
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

      <EEDashboard />
    </div>
  );
};

export default EEHome;
