/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ConfirmationModal from "./erComponents/DeleteConfirmationModal";
import { useState } from "react";
import { useAllContext } from "../context/AuthContext";

const JobItems = ({ job }) => {
  const [showModal, setShowModal] = useState(false);
  const { jobs, auth } = useAllContext();

  return (
    <div className="bg-red-500  rounded-md hover:shadow-[1px_1px_10px_rgb(256,256,256)] hover:-translate-y-1 transition ease-in-out duration-200">
      {auth.userType === "employer" && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
          <ConfirmationModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={async () => {
              setShowModal(false);
              await jobs?.deleteExisingJob(job._id);
            }}
          />
        </div>
      )}
      {auth?.userType === "employer" && (
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
        {auth?.userType === "employee" && (
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              onClick={async (e) => {
                e.preventDefault();
                await jobs?.bookmarkJob(job._id);
              }}
            >
              Save
            </button>
          </div>
        )}
        <div className="text-sm mx-4 flex flex-col gap-2">
          <div className="flex justify-between px-4 mt-1">
            <p>Id: {job._id}</p>
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
