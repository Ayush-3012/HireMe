/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ConfirmationModal from "./erComponents/DeleteConfirmationModal";
import { useState } from "react";
import { useAllContext } from "../context/AuthContext";

const JobItems = ({ job }) => {
  const [showModal, setShowModal] = useState(false);
  const { jobs, auth } = useAllContext();

  return (
    <div className="bg-purple-500 flex flex-row-reverse justify-between text-white  rounded-md hover:shadow-[1px_1px_10px_rgb(256,256,256)] hover:-translate-y-1 transition ease-in-out duration-200">
      <div className="flex flex-col items-center justify-center px-5 py-2 gap-2 bg-purple-700">
        {auth.userType === "employer" && (
          <>
            <div className="flex justify-end">
              <button
                className="bg-red-500 w-20 text-white px-2 py-1 rounded hover:bg-red-600"
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
            <div className="flex justify-end ">
              <Link
                to={`/edit/job/${job._id}`}
                className="bg-blue-500 text-white w-20 text-center px-2 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </Link>
            </div>
          </>
        )}
      </div>
      <Link to={`/about/job/${job._id}`} className="flex-1 mr-4">
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
        <div className="text-xl mx-4 flex flex-col gap-2">
          <div className="flex gap-4 mt-1 ">
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
    </div>
  );
};

export default JobItems;
