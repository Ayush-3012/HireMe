/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAllContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

const JobDetailsPage = () => {
  const { jobs } = useAllContext();
  const { jobId } = useParams();
  const [aboutJob, setAboutJob] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await jobs?.fetchJobDetails(jobId);
        setAboutJob(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleJobApply = async (e) => {
    e.preventDefault();
    const res = await jobs?.applyJob(jobId);
    console.log(res.data);
  };

  const formatApplicationDeadline = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);

    return `${day} ${month} '${year}`;
  };

  return (
    <>
      <div className="p-2 m-2 rounded-xl font-serif bg-blue-400 flex flex-col items-center justify-center">
        <div className=" bg-orange-200 rounded-xl p-4 w-full">
          <div className="flex flex-col px-2 border-black">
            <h2 className="text-3xl text-purple-700 font-black">
              {aboutJob.title}
            </h2>
            <h1 className="text-2xl text-purple-600">{aboutJob.companyName}</h1>
          </div>
          <div className="mx-4 my-2">
            <div className="text-xl">
              <h2>
                {aboutJob.remote ? (
                  <span className="flex items-center gap-2">
                    <FaHome /> Remote Job
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FaLocationDot /> {aboutJob.location}
                  </span>
                )}
              </h2>
            </div>
            <div className="flex justify-evenly my-4 items-center">
              <div className="text-xl px-4 py-2 flex flex-col bg-white rounded-xl justify-center gap-1">
                <span>Annual CTC</span>
                <span className="text-lg">{aboutJob.salaryRange}</span>
              </div>
              <div className="text-xl px-4 py-2 flex flex-col bg-white rounded-xl justify-center gap-1">
                <span>Located In</span>
                <span className="text-lg">{aboutJob.location}</span>
              </div>
              <div className="text-xl px-4 py-2 flex flex-col bg-white rounded-xl justify-center gap-1">
                <span>Employment Type</span>
                <span className="text-lg">{aboutJob.employmentType}</span>
              </div>

              <div className="text-xl px-4 py-2 flex flex-col bg-white rounded-xl justify-center gap-1">
                <span>Experience Level</span>
                <span className="text-lg">{aboutJob.experienceLevel}</span>
              </div>
              <div className="text-xl px-4 py-2 flex flex-col bg-white rounded-xl justify-center gap-1">
                <span>Apply By</span>
                <span className="text-lg">
                  {formatApplicationDeadline(aboutJob.applicationDeadline)}
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex p-2 my-2 mx-4 items-center">
            <h2 className="font-bold text-xl">Required Skills : </h2>
            <div className="flex gap-3 mx-4">
              {aboutJob.requiredSkills?.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center  text-white bg-zinc-900 rounded-xl"
                >
                  <GoDotFill className="text-2xl" />
                  <h2 className="cursor-pointer text-xl bg-slate-700 rounded-r-xl pl-4 pr-2 py-0.5">
                    {skill}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          <hr />
          <div className="my-2 mx-4">
            <h2 className="flex text-3xl font-bold">About the Job : </h2>
            <h2 className="text-xl mx-2 flex items-center gap-1">
              {aboutJob.description}
            </h2>
          </div>
        </div>
        <button
          className="flex items-center text-3xl my-4 hover:scale-x-110 transition-all ease-in-out duration-300 bg-orange-200 px-4 py-2 rounded-xl w-96 justify-center"
          onClick={(e) => handleJobApply(e)}
        >
          Apply
        </button>
      </div>
    </>
  );
};

export default JobDetailsPage;
