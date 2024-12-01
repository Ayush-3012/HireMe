/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaBusinessTime, FaUserGroup } from "react-icons/fa6";
import { useAllContext } from "../context/AuthContext";
import { FaLocationDot } from "react-icons/fa6";
import { GrStatusUnknown } from "react-icons/gr";
import { Link } from "react-router-dom";
import ConfirmationModal from "./erComponents/DeleteConfirmationModal";

/* eslint-disable react/prop-types */
const JobCard = ({
  jobId,
  fromSavedJobs,
  refreshSavedJobs,
  foundJobs,
  refreshDeletedJob,
}) => {
  const currentUser = localStorage.getItem("userType");
  const { jobs, auth } = useAllContext();
  const [jobDetails, setJobDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  // const appliedJobs = jobs?.appliedJobs;

  useEffect(() => {
    const fetchData = async () => {
      if (!foundJobs) {
        const data = await jobs?.fetchJobDetails(jobId);
        setJobDetails(data);
      } else {
        setJobDetails(foundJobs);
      }
    };
    fetchData();
  }, [jobId]);

  return (
    <>
      <div className="relative flex flex-col min-w-96 rounded-md pt-2 shadow-[2px_2px_10px] shadow-slate-500 hover:-translate-y-2 hover:shadow-yellow-400 transition-all duration-150 ease-in-out max-sm:min-w-full max-sm:pr-4">
        <Link to={`/about/job/${foundJobs ? foundJobs._id : jobId}`}>
          <div className="flex flex-col gap-2 text-yellow-400 max-md:gap-1">
            <div className="flex gap-4 pl-2">
              <p className="text-2xl font-bold max-md:text-xl">
                {jobDetails.title}
              </p>
              <p className="text-xl font-semibold max-md:text-sm">
                @{jobDetails.companyName}
              </p>
            </div>
            <div className="flex justify-between flex-col pl-2">
              <p className="flex items-center text-xl w-fit justify-start gap-1 max-md:text-sm">
                <FaLocationDot /> {jobDetails?.location}
              </p>
              <p className="flex items-center text-xl w-fit justify-start gap-1 max-md:text-sm">
                <RiMoneyRupeeCircleFill /> {jobDetails?.salaryRange}
              </p>
              <p className="flex items-center text-xl w-fit justify-start gap-1 max-md:text-sm">
                <FaBusinessTime /> Employment Type: {jobDetails?.employmentType}
              </p>
              {currentUser === "employer" && (
                <>
                  <p className="flex items-center text-xl w-fit justify-start gap-1 max-md:text-sm">
                    <GrStatusUnknown /> Status: {jobDetails?.status}
                  </p>
                  <p className="flex items-center text-xl w-fit justify-start gap-1 max-md:text-sm">
                    <FaUserGroup /> Total Applicants:{" "}
                    {jobDetails?.applicants?.length}
                  </p>
                </>
              )}
            </div>
          </div>
          {fromSavedJobs && (
            <span className="absolute bottom-2 hover:scale-125 transition-all ease-in-out duration-150 right-2 z-10 cursor-pointer">
              <MdDelete
                className="text-red-600 text-4xl max-md:text-3xl max-sm:text-2xl"
                onClick={async (e) => {
                  e.preventDefault();
                  await jobs?.unSaveJob(jobId);
                  refreshSavedJobs();
                }}
              />
            </span>
          )}
        </Link>
        {auth.userType === "employer" && (
          <div className="flex items-center mt-4 rounded-b-md py-2 bg-slate-900 justify-center gap-2">
            <Link
              to={`/edit/job/${jobId}`}
              className="bg-slate-500 text-yellow-400 text-xl transition-all ease-in-out duration-150 w-20 text-center px-2 py-1 rounded hover:scale-105"
            >
              Edit
            </Link>
            <button
              className="bg-red-500 max-sm:bg-inherit text-xl px-2 text-white py-1 rounded-md transition-all ease-in-out duration-200 hover:scale-105"
              onClick={() => {
                setShowModal(true);
                refreshDeletedJob();
              }}
            >
              <MdDeleteForever className="sm:hidden text-3xl text-red-500 transition-all ease-in-out duration-200 hover:scale-105" />
              <span className="max-sm:hidden">Delete</span>
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <ConfirmationModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={async () => {
            setShowModal(false);
            await jobs?.deleteExisingJob(jobId);
          }}
        />
      )}
    </>
  );
};

export default JobCard;
