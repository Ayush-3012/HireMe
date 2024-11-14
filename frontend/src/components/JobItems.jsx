/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useAllContext } from "../context/AuthContext";

const JobItems = ({ job }) => {
  const { auth } = useAllContext();

  return (
    <div className="bg-gray-700 flex justify-between text-yellow-400 font-serif rounded-md hover:-translate-y-1 transition ease-in-out duration-200">
      <Link to={`/about/job/${job._id}`} className="w-full">
        <div className="text-xl mx-4 py-2 flex flex-col gap-2">
          <div className="flex gap-4">
            <p>{job.title}!</p>
            <p>@ {job.companyName}</p>
          </div>
          <div className="flex gap-12">
            <p>Location: {job.location}</p>
            <p>Salary Range: {job.salaryRange}</p>
            <p>Employment Type: {job.employmentType}</p>
            <p>Current Status: {job.status}</p>
          </div>
          <h2 className="">Total Applicants: {job.applicants.length}</h2>
        </div>
      </Link>
      {auth.userType === "employer" && (
        <div className="flex flex-col items-center justify-center px-5 py-2 gap-2 bg-gray-600 rounded-e-md">
          <Link
            to={`/edit/job/${job._id}`}
            className="bg-slate-500 text-yellow-400 transition-all ease-in-out duration-150 w-20 text-center px-2 py-1 rounded hover:bg-slate-700"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobItems;
