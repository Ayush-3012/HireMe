/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaBusinessTime, FaUserGroup } from "react-icons/fa6";
import { useAllContext } from "../context/HireMeContext";
import { FaLocationDot } from "react-icons/fa6";
import { GrStatusUnknown } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./erComponents/DeleteConfirmationModal";
import { enqueueSnackbar } from "notistack";
import { FaEdit } from "react-icons/fa";

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
  const [isDatePassed, setIsDatePassed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!foundJobs) {
        const data = await jobs?.fetchJobDetails(jobId);
        const applicationDeadline = new Date(data?.applicationDeadline);
        const today = new Date().setHours(0, 0, 0, 0);

        applicationDeadline > today && setIsDatePassed(true);

        setJobDetails(data);
      } else {
        setJobDetails(foundJobs);
        const applicationDeadline = new Date(foundJobs?.applicationDeadline);
        const today = new Date().setHours(0, 0, 0, 0);

        applicationDeadline > today && setIsDatePassed(true);
      }
    };
    fetchData();
  }, [jobId]);

  return (
    <>
      <div
        className={`${
          !isDatePassed
            ? "bg-slate-950"
            : "hover:-translate-y-2 hover:shadow-yellow-400 transition-all duration-150 ease-in-out"
        } relative flex flex-col min-w-96 rounded-md pt-2 shadow-[2px_2px_10px] shadow-slate-500  max-sm:min-w-full max-sm:pr-4`}
      >
        <Link to={`/about/job/${foundJobs ? foundJobs._id : jobId}`}>
          <div
            className={`${
              !isDatePassed && "cursor-default"
            } flex flex-col gap-2 text-yellow-400 max-md:gap-1`}
          >
            <div className="flex gap-4 pl-2">
              <p className="text-2xl font-bold max-md:text-xl">
                {jobDetails.title}
              </p>
              {currentUser === "employee" ? (
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/company-profile", {
                      state: { companyId: jobDetails.employer },
                    });
                  }}
                  to={"/company-profile"}
                  className="text-xl text-slate-100 max-md:text-lg max-sm:text-sm "
                  whileHover={{
                    color: "#f0f",
                    transition: { duration: 0.5 },
                  }}
                >
                  @{jobDetails.companyName}
                </motion.button>
              ) : (
                <p className="text-xl max-md:text-lg max-sm:text-sm text-yellow-400">
                  @{jobDetails.companyName}
                </p>
              )}
            </div>
            <div className="flex justify-between flex-col pl-2">
              <p className="flex items-center text-xl w-fit justify-start gap-1 max-md:text-sm">
                <FaLocationDot /> {jobDetails?.location}
              </p>
              <p className="flex items-center text-xl w-fit justify-start gap-1 max-md:text-sm">
                <RiMoneyRupeeCircleFill /> {jobDetails?.salaryRange}
              </p>
              <p className="flex items-center text-xl w-fit justify-start gap-1 max-md:text-sm">
                <FaBusinessTime />{" "}
                {isDatePassed ? (
                  <> Employment Type : {jobDetails?.employmentType} </>
                ) : (
                  "No more accepting application"
                )}
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
                  const res = await jobs?.unSaveJob(jobId);
                  res.status === 200 &&
                    enqueueSnackbar(res.data.message, { variant: "success" });
                  refreshSavedJobs();
                }}
              />
            </span>
          )}
        </Link>
        {auth.userType === "employer" && (
          <div className="flex items-center mt-4 rounded-b-md py-2 bg-slate-900 justify-center gap-2 max-sm:gap-0 max-sm:mt-2">
            <Link
              to={`/edit/job/${jobId}`}
              className="bg-slate-500 hover:bg-yellow-400 hover:text-slate-950 text-yellow-400 text-xl transition-all ease-in-out duration-150 w-20 max-sm:bg-inherit text-center px-2 py-1 rounded hover:scale-105 max-sm:w-10"
            >
              <FaEdit className="sm:hidden text-2xl text-yellow-400 transition-all ease-in-out duration-200 hover:scale-105" />
              <span className="max-sm:hidden">Edit</span>
            </Link>
            <button
              className="bg-red-400 hover:bg-red-600 max-sm:bg-inherit text-xl px-2 text-white py-1 rounded-md transition-all ease-in-out duration-200 hover:scale-105"
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
