/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useAllContext } from "../../context/AuthContext";
import SkillsInput from "../../auth/inputs/SkillsInput";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const PostJob = ({ fromPostJob }) => {
  const { jobs } = useAllContext();
  const { jobId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const data = await jobs?.fetchJobDetails(jobId);

        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          setLocation(data.location);
          setSalaryRange(data.salaryRange);
          setEmploymentType(data.employmentType);
          setCompanyName(data.companyName);
          setApplicationDeadline(
            new Date(data.applicationDeadline).toISOString().split("T")[0] // Format fetched date for input
          );
          setRequiredSkills(data.requiredSkills);
          setExperienceLevel(data.experienceLevel);
          setRemote(data.remote);
        }
      } catch (error) {
        console.log("Error fetching job details: ", error);
      }
    };

    !fromPostJob && fetchJobData();
  }, [fromPostJob, jobId, jobs]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !location ||
      !salaryRange ||
      !applicationDeadline ||
      requiredSkills.length === 0
    ) {
      setError("All fields are required");
      return;
    }

    const formattedDeadline = new Date(applicationDeadline).toISOString();
    const jobData = {
      title,
      description,
      location,
      salaryRange,
      employmentType,
      applicationDeadline: formattedDeadline,
      requiredSkills,
      experienceLevel,
      remote,
      status: "Open",
    };

    try {
      const data = fromPostJob
        ? await jobs?.createNewJob(jobData)
        : await jobs?.updateExistingJob(jobId, jobData);

      enqueueSnackbar(data.data.message, { variant: "success" });
      navigate("/home");
    } catch (error) {
      setError("Failed to post the job. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className=" mx-4 p-4 bg-slate-700  font-serif text-yellow-400 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {fromPostJob ? "Post New Job" : "Edit Job"}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Job Title</label>
          <input
            type="text"
            className="w-full p-2 bg-slate-500 outline-none focus:shadow-[1px_1px_10px]  rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            className="w-full p-2 bg-slate-500 focus:shadow-[1px_1px_10px] outline-none rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Location</label>
          <input
            type="text"
            className="w-full p-2 bg-slate-500 focus:shadow-[1px_1px_10px] outline-none rounded-md"
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
            className="w-full p-2 bg-slate-500 focus:shadow-[1px_1px_10px] outline-none rounded-md"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Employment Type
          </label>
          <select
            className="w-full p-2 bg-slate-500 focus:shadow-[1px_1px_10px] outline-none rounded-md"
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
            className="w-full p-2 bg-slate-500 focus:shadow-[1px_1px_10px] outline-none rounded-md"
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
            min={new Date().toISOString().split("T")[0]}
            className="w-full p-2 bg-slate-500 focus:shadow-[1px_1px_10px] outline-none rounded-md"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Required Skills
          </label>
          <SkillsInput skills={requiredSkills} setSkills={setRequiredSkills} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Experience Level
          </label>
          <select
            className="w-full p-2 bg-slate-500 focus:shadow-[1px_1px_10px] outline-none rounded-md"
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
            Remote Work: {remote ? "Yes" : "No"}
          </label>
          <div
            className={`relative w-12 h-6 flex items-center bg-gray-300 rounded-full cursor-pointer transition-colors ${
              remote ? "bg-yellow-400" : "bg-slate-500"
            }`}
            onClick={() => setRemote((prev) => !prev)}
          >
            <div
              className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                remote ? "translate-x-6" : "translate-x-1"
              }`}
            ></div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-slate-500 p-2 rounded-md font-bold hover:bg-slate-600"
          >
            {fromPostJob ? "Post Job" : "Update Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
