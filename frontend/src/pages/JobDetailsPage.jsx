/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAllContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import ConfirmationModal from "../components/erComponents/DeleteConfirmationModal";
// import { enqueueSnackbar } from "notistack";

const JobDetailsPage = () => {
  const { jobs, auth, profile } = useAllContext();
  const { jobId } = useParams();
  const [aboutJob, setAboutJob] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await jobs?.fetchJobDetails(jobId);
        setAboutJob(data);
        if (data?.applicants?.length) {
          const applicantsDetails = await profile?.fetchApplicantsProfile(
            data.applicants
          );
          setApplicants(applicantsDetails);
        }
      } catch (error) {
        console.log("error is :", error);
      }
    };
    fetchData();
  }, []);

  const handleJobApply = async (e) => {
    e.preventDefault();
    const res = await jobs?.applyJob(jobId);
    console.log(res);
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
      <div className="p-2 m-2 rounded-xl font-serif bg-gray-900 flex flex-col items-center justify-center">
        <div className=" bg-gray-500 rounded-xl p-4 w-full">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className="text-3xl text-yellow-400 font-black">
                {aboutJob.title}
              </h2>
              <h1 className="text-2xl text-yellow-300">
                {aboutJob.companyName}
              </h1>
            </div>
            {auth.userType === "employer" && (
              <div>
                <button
                  className="bg-slate-800 w-20 text-white px-2 py-2 text-lg rounded-md transition-all ease-in-out duration-200 hover:bg-yellow-400"
                  onClick={() => setShowModal(true)}
                >
                  Delete
                </button>
              </div>
            )}
            {auth?.userType === "employee" && (
              <div className="flex justify-end">
                <button
                  // className="bg-blue-500 w-20 text-white px-2 py-2 text-lg rounded-md hover:bg-blue-600"
                  className="bg-slate-800 w-20 text-white px-2 py-2 text-lg rounded-md transition-all ease-in-out duration-200 hover:bg-yellow-400"
                  onClick={async (e) => {
                    e.preventDefault();
                    await jobs?.bookmarkJob(aboutJob._id);
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="mx-4 my-2">
            <div className="text-xl text-yellow-400">
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
              <div className="text-xl px-4 py-2 flex flex-col bg-gray-700 text-yellow-400 rounded-xl justify-center gap-1">
                <span>Annual CTC</span>
                <span className="text-lg">{aboutJob.salaryRange}</span>
              </div>
              <div className="text-xl px-4 py-2 flex flex-col bg-gray-700 text-yellow-400 rounded-xl justify-center gap-1">
                <span>Located In</span>
                <span className="text-lg">{aboutJob.location}</span>
              </div>
              <div className="text-xl px-4 py-2 flex flex-col bg-gray-700 text-yellow-400 rounded-xl justify-center gap-1">
                <span>Employment Type</span>
                <span className="text-lg">{aboutJob.employmentType}</span>
              </div>

              <div className="text-xl px-4 py-2 flex flex-col bg-gray-700 text-yellow-400 rounded-xl justify-center gap-1">
                <span>Experience Level</span>
                <span className="text-lg">{aboutJob.experienceLevel}</span>
              </div>
              <div className="text-xl px-4 py-2 flex flex-col bg-gray-700 text-yellow-400 rounded-xl justify-center gap-1">
                <span>Apply By</span>
                <span className="text-lg">
                  {formatApplicationDeadline(aboutJob.applicationDeadline)}
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex p-2 my-2 mx-4 items-center text-yellow-400">
            <h2 className="font-bold text-xl">Required Skills : </h2>
            <div className="flex gap-3 mx-4">
              {aboutJob.requiredSkills?.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-zinc-900 rounded-xl"
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
          <div className="my-2 mx-4 text-yellow-400">
            <h2 className="flex text-3xl font-bold">About the Job : </h2>
            <h2 className="text-xl mx-2 flex items-center gap-1">
              {aboutJob.description}
            </h2>
          </div>

          {showModal && (
            <ConfirmationModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={async () => {
                setShowModal(false);
                await jobs?.deleteExisingJob(aboutJob._id);
              }}
            />
          )}
        </div>
        <div className="flex items-center flex-col text-3xl my-4 bg-gray-500 px-4 py-2 rounded-xl w-full">
          {auth?.userType === "employee" && (
            <button
              className="flex items-center text-3xl my-4 hover:scale-x-110 transition-all ease-in-out duration-300 bg-gray-700 text-yellow-300 px-4 py-2 rounded-xl w-96 justify-center"
              onClick={(e) => handleJobApply(e)}
            >
              Apply
            </button>
          )}
          {auth?.userType === "employer" &&
            aboutJob?.applicants?.length !== 0 && (
              <div className="self-start">
                <h2 className="my-2 text-yellow-400">Applied By: </h2>
                <div className="flex gap-4">
                  {applicants?.map((applicant) => {
                    return (
                      <div
                        key={applicant._id}
                        className="mx-2 bg-slate-800  px-4 py-2 w-fit text-xl text-yellow-300 rounded-md hover:-translate-y-1 duration-200 transition-all ease-in-out"
                      >
                        <Link
                          to={`/profile/applicantProfile`}
                          state={{
                            applicant: applicant,
                            jobTitle: aboutJob.title,
                            employer: aboutJob.companyName,
                            employerId: aboutJob.employer,
                          }}
                        >
                          <div className="flex justify-start flex-col">
                            <h2 className="font-bold">
                              Name:{" "}
                              <span className="font-light">
                                {applicant.fullName}
                              </span>
                            </h2>
                            <h2 className="font-bold">
                              Location:{" "}
                              <span className="font-light">
                                {applicant.location}
                              </span>
                            </h2>
                          </div>
                          <div className="flex gap-1 flex-col">
                            <span className="font-bold">Top skills:</span>
                            {applicant.skills.map((skill) => {
                              return (
                                <div key={skill} className="">
                                  <h2 className="px-2 text-lg font-light bg-slate-600 text-yellow-300 rounded-xl">
                                    {skill}
                                  </h2>
                                </div>
                              );
                            })}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;
