/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const JobItems = ({ job, showEditButton = false }) => {
  return (
    <div className="bg-cyan-300  rounded-md hover:shadow-[1px_1px_10px_rgb(256,256,256)] hover:-translate-y-1 transition ease-in-out duration-200">
      {showEditButton && (
        <div className="flex justify-end">
          <Link
            to={`/edit/job/${job._id}`}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </Link>
        </div>
      )}
      <Link to={`/about/job/${job._id}`}>
        <div className="text-sm mx-4 flex flex-col gap-2">
          <div className="flex justify-between px-4 mt-1">
            <p>Title: {job.title}</p>
            <p>Company Name: {job.companyName}</p>
          </div>
          <div className="flex justify-evenly">
            <p>Location: {job.location}</p>
            <p>Salary Range: {job.salaryRange}</p>
            <p>Employment Type: {job.employmentType}</p>
            <p>Current Status: {job.status}</p>
          </div>
          <div className="flex gap-2">
            Required Skills:
            {job.requiredSkills?.map((skill, idx) => (
              <ul key={idx}>
                <li>{skill}</li>
              </ul>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobItems;
