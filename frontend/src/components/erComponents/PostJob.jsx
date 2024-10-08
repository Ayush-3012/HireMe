import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const PostJob = () => {
  const { jobs } = useAuthContext();
  // State for each form field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-Time");
  const [companyName, setCompanyName] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("Senior");
  const [remote, setRemote] = useState(false);
  const [error, setError] = useState(null);

  const handleSkillsChange = (e) => {
    setRequiredSkills(e.target.value.split(","));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !location ||
      !salaryRange ||
      !companyName ||
      !applicationDeadline ||
      requiredSkills.length === 0
    ) {
      setError("All fields are required");
      return;
    }

    const jobData = {
      title,
      description,
      location,
      salaryRange,
      employmentType,
      companyName,
      applicationDeadline,
      requiredSkills,
      experienceLevel,
      remote,
      status: "Open",
      postedDate: new Date(),
      employer: "66d4bff468585badc4eaa113", // placeholder, will be dynamic
    };

    try {
      const data = await jobs.createNewJob(jobData);
      console.log(data.message);

      setTitle("");
      setDescription("");
      setLocation("");
      setSalaryRange("");
      setEmploymentType("Full-Time");
      setCompanyName("");
      setApplicationDeadline("");
      setRequiredSkills([]);
      setExperienceLevel("Senior");
      setRemote(false);
      setError(null);
    } catch (error) {
      setError("Failed to post the job. Please try again.", error);
      console.log(error);
    }
  };

  return (
    <div className="w-3/4 mx-auto mt-8 p-4 border border-gray-300 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Job Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Location</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Salary Range
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Employment Type
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Company Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Application Deadline
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Required Skills (comma separated)
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={requiredSkills.join(",")}
            onChange={handleSkillsChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Experience Level
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="Entry-Level">Entry-Level</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Remote Work
          </label>
          <input
            type="checkbox"
            className="w-full p-2 border border-gray-300 rounded-md"
            checked={remote}
            onChange={(e) => setRemote(e.target.checked)}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
