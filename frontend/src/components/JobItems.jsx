/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const JobItems = ({ job }) => {
  return (
    <Link
      to={`/about/job/${job._id}`}
      className="bg-cyan-300 rounded-md hover:shadow-[1px_1px_10px_rgb(256,256,256)] hover:-translate-y-1 transition ease-in-out duration-200"
    >
      <div className="text-sm mx-4 flex flex-col gap-2">
        <p>Title:{job.title}</p>
        <p>Desciription: {job.description}</p>
        <p>Location: {job.location}</p>
        <p>Salary Range: {job.salaryRange}</p>
        <p>Employement Type: {job.employmentType}</p>
        <p>Company Name: {job.companyName}</p>
        <p>Current Status: {job.status}</p>
        <div className="flex gap-2">
          Required Skills are:
          {job.requiredSkills?.map((skill, idx) => (
            <ul key={idx}>
              <li>{skill}</li>
            </ul>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default JobItems;
