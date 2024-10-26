/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaBusinessTime } from "react-icons/fa6";
import { useAllContext } from "../context/AuthContext";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const JobCard = ({ jobId, fromSavedJobs, refreshSavedJobs }) => {
  const { jobs } = useAllContext();
  const [jobDetails, setJobDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await jobs?.fetchJobDetails(jobId);
      setJobDetails(data);
    };
    fetchData();
  }, [jobId]);

  return (
    <div className="relative flex flex-col min-w-96 gap-2 rounded-md py-2 pl-1 pr-4 bg-green-700 hover:scale-95 transition-all duration-150 ease-in-out">
      <Link to={`/about/job/${jobId}`}>
        <div className="text-xl flex flex-col gap-2 ">
          <div className="flex justify-between flex-col pl-2">
            <p className="text-2xl font-bold">{jobDetails.title}</p>
            <p className="text-xl font-semibold">{jobDetails.companyName}</p>
          </div>
          <div className="flex justify-between flex-col pl-2">
            <p className="flex items-center text-xl w-fit justify-start gap-1">
              <FaLocationDot /> {jobDetails.location}
            </p>
            <p className="flex items-center text-xl w-fit justify-start gap-1">
              <RiMoneyRupeeCircleFill /> {jobDetails.salaryRange}
            </p>
            <p className="flex items-center text-xl w-fit justify-start gap-1">
              <FaBusinessTime /> {jobDetails.employmentType}
            </p>
          </div>
        </div>
        {fromSavedJobs && (
          <span className="absolute bottom-2 bg-white right-2 z-10 cursor-pointer">
            <MdDelete
              className="text-red-600 text-4xl"
              onClick={async (e) => {
                e.preventDefault();
                await jobs?.unSaveJob(jobId);
                refreshSavedJobs();
              }}
            />
          </span>
        )}
      </Link>
    </div>
  );
};

export default JobCard;
