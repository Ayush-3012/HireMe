import { useEffect, useState } from "react";
import { useAllContext } from "../context/HireMeContext";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaHome, FaInfoCircle } from "react-icons/fa";
import {
  FaBookmark,
  FaBusinessTime,
  FaCalendarCheck,
  FaLocationDot,
} from "react-icons/fa6";
import { GoBookmarkSlashFill, GoDotFill } from "react-icons/go";
import ConfirmationModal from "../components/erComponents/DeleteConfirmationModal";
import { enqueueSnackbar } from "notistack";
import { MdDeleteForever } from "react-icons/md";
import { RiMoneyRupeeCircleFill, RiUserStarFill } from "react-icons/ri";

const JobDetailsPage = () => {
  const { jobs, auth, profile } = useAllContext();
  const currentUser = localStorage.getItem("userType");
  const { jobId } = useParams();
  const [aboutJob, setAboutJob] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [canApply, setCanApply] = useState(false);
  const navigate = useNavigate();

  const MotionLink = motion(Link);

  useEffect(() => {
    const fetchData = async () => {
      try {
        profile?.userProfile?.appliedJobs?.includes(jobId) &&
          setIsApplied(true);

        profile?.userProfile?.savedJobs?.includes(jobId) && setIsSaved(true);

        const data = await jobs?.fetchJobDetails(jobId);
        setAboutJob(data);

        const applicationDeadline = new Date(data?.applicationDeadline);
        const today = new Date().setHours(0, 0, 0, 0);

        applicationDeadline > today && setCanApply(true);

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
  }, [jobId, jobs, profile]);

  const handleJobApply = async (e) => {
    e.preventDefault();
    const res = await jobs?.applyJob(jobId);
    res.status !== 200
      ? enqueueSnackbar(res.response.data.message, { variant: "error" })
      : enqueueSnackbar(res.message, { variant: "success" });
  };

  const handleSaveJob = async (e, jobId) => {
    e.preventDefault();
    const res = await jobs?.bookmarkJob(jobId);

    res.status === 200 &&
      enqueueSnackbar(res.data.message, { variant: "success" });
  };

  const formatApplicationDeadline = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString();

    return `${day} ${month} '${year}`;
  };

  return (
    <>
      <motion.div
        className="p-2 rounded-xl font-serif flex flex-col items-center justify-center gap-2"
        animate={{ x: [-100, -50, 0, 10, 0] }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
      >
        <div className="shadow-[1px_1px_10px] shadow-slate-400 rounded-xl p-4 w-full max-md:p-2">
          <div className="relative px-2 flex">
            <div className="">
              <h2 className="text-2xl max-md:text-xl max-sm:text-lg text-yellow-400 font-black">
                {aboutJob.title}
              </h2>
              {currentUser === "employee" ? (
                <MotionLink
                  to={"/company-profile"}
                  state={{ companyId: aboutJob.employer }}
                  className="text-xl hover:text-slate-100 max-md:text-lg max-sm:text-sm text-slate-200"
                  whileHover={{
                    color: "#f0f",
                  }}
                >
                  @{aboutJob.companyName}
                </MotionLink>
              ) : (
                <p className="text-xl max-md:text-lg max-sm:text-sm text-yellow-400">
                  @{aboutJob.companyName}
                </p>
              )}
            </div>

            <div className="absolute top-2 right-2 flex flex-col space-y-2 max-md:top-0 max-md:right-1 max-sm:right-0">
              {auth.userType === "employer" && (
                <div className="flex gap-2 max-sm:flex-col items-center justify-center">
                  <div className="flex items-center justify-center ">
                    <Link
                      to={`/edit/job/${jobId}`}
                      className="bg-slate-500 hover:bg-yellow-400 hover:text-slate-950 text-yellow-400 flex items-center justify-center text-xl max-sm:bg-inherit transition-all ease-in-out duration-150 px-2 py-1 rounded hover:scale-105"
                    >
                      <FaEdit className="sm:hidden text-2xl text-yellow-500 transition-all ease-in-out duration-200 hover:scale-105" />
                      <span className="max-sm:hidden">Edit</span>
                    </Link>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-red-500 max-sm:bg-inherit text-xl px-2 text-white py-1 rounded-md transition-all ease-in-out duration-200 hover:scale-105"
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      <MdDeleteForever className="sm:hidden text-3xl text-red-500 transition-all ease-in-out duration-200 hover:scale-105" />
                      <span className="max-sm:hidden">Delete</span>
                    </button>
                  </div>
                </div>
              )}

              {auth?.userType === "employee" && (
                <>
                  {!isSaved ? (
                    <button
                      className="bg-slate-800 text-white transition-all ease-in-out duration-200 hover:bg-yellow-400 hover:scale-105 hover:text-yellow-600
                      max-sm:bg-inherit p-2 rounded-md"
                      onClick={(e) => {
                        handleSaveJob(e, aboutJob._id);
                        setIsSaved(true);
                      }}
                    >
                      <FaBookmark className="text-3xl max-md:text-2xl max-sm:text-xl" />
                    </button>
                  ) : (
                    <button
                      className="bg-slate-800 transition-all ease-in-out duration-200 hover:bg-red-400 hover:scale-105 max-sm:bg-inherit p-1.5 rounded-md"
                      onClick={async (e) => {
                        e.preventDefault();
                        const res = await jobs?.unSaveJob(jobId);
                        res.status === 200 &&
                          enqueueSnackbar(res.data.message, {
                            variant: "success",
                          });
                        setIsSaved(false);
                      }}
                    >
                      <GoBookmarkSlashFill className="text-red-600 text-4xl max-md:text-3xl max-sm:text-2xl" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="mx-4 my-2 flex flex-col gap-2 max-md:items-center">
            <div className="text-2xl text-yellow-400 max-md:text-xl max-sm:text-lg">
              <span className="flex items-center gap-1">
                {aboutJob.remote ? (
                  <>
                    <FaHome /> Remote Job
                  </>
                ) : (
                  <>
                    <FaLocationDot /> {aboutJob.location}{" "}
                  </>
                )}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-3 p-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 ">
              <motion.div
                className="text-center text-xl py-2 flex flex-col bg-gray-700 text-yellow-400 rounded-xl"
                whileHover={{
                  translateY: "-10px",
                  boxShadow: "0px 0px 10px #ff0",
                  scaleX: 1.04,
                  transition: { duration: 0.8, type: "spring", bounce: 0.6 },
                }}
              >
                <span> Annual CTC</span>
                <span className="text-lg flex items-center justify-center gap-1 font-semibold">
                  <RiMoneyRupeeCircleFill className="text-xl" />{" "}
                  {aboutJob.salaryRange}
                </span>
              </motion.div>

              <motion.div
                className="text-center text-xl py-2 flex flex-col bg-gray-700 text-yellow-400 rounded-xl"
                whileHover={{
                  translateY: "-10px",
                  boxShadow: "0px 0px 10px #ff0",
                  scaleX: 1.04,
                  transition: { duration: 0.8, type: "spring", bounce: 0.6 },
                }}
              >
                <span>Located In</span>
                <span className="text-lg flex items-center justify-center gap-1 font-semibold">
                  <FaLocationDot className="text-xl" /> {aboutJob.location}
                </span>
              </motion.div>
              <motion.div
                className="text-center text-xl py-2 flex flex-col bg-gray-700 text-yellow-400 rounded-xl "
                whileHover={{
                  translateY: "-10px",
                  boxShadow: "0px 0px 10px #ff0",
                  scaleX: 1.04,
                  transition: { duration: 0.8, type: "spring", bounce: 0.6 },
                }}
              >
                <span>Employment Type</span>
                <span className="text-lg flex items-center justify-center gap-1 font-semibold">
                  <FaBusinessTime className="text-xl" />{" "}
                  {aboutJob.employmentType}
                </span>
              </motion.div>
              <motion.div
                className="text-center text-xl py-2 flex flex-col bg-gray-700 text-yellow-400 rounded-xl"
                whileHover={{
                  translateY: "-10px",
                  boxShadow: "0px 0px 10px #ff0",
                  scaleX: 1.04,
                  transition: { duration: 0.8, type: "spring", bounce: 0.6 },
                }}
              >
                <span>Experience Level</span>
                <span className="text-lg flex items-center justify-center gap-1 font-semibold">
                  <RiUserStarFill className="text-xl" />{" "}
                  {aboutJob.experienceLevel}
                </span>
              </motion.div>

              <motion.div
                className="text-center text-xl py-2 flex flex-col bg-gray-700 text-yellow-400 rounded-xl"
                whileHover={{
                  translateY: "-10px",
                  boxShadow: "0px 0px 10px #ff0",
                  scaleX: 1.04,
                  transition: { duration: 0.8, type: "spring", bounce: 0.6 },
                }}
              >
                <span>Apply By</span>
                <span
                  className={`text-lg flex items-center justify-center gap-1 font-semibold ${
                    new Date(aboutJob?.applicationDeadline) < new Date() &&
                    "text-red-500"
                  }`}
                >
                  <FaCalendarCheck className="text-xl" />{" "}
                  {formatApplicationDeadline(aboutJob.applicationDeadline)}
                </span>
              </motion.div>
            </div>
          </div>
          <hr />
          <div className="flex flex-col max-md:items-start p-2 my-2 mx-4 text-yellow-400">
            <h2 className="font-bold text-xl mb-2 max-md:text-lg">
              Required Skills:
            </h2>

            <div className="flex flex-wrap gap-3 mx-">
              {aboutJob?.requiredSkills?.map((skill, index) => (
                <motion.div
                  key={index}
                  className="flex items-center bg-zinc-700 rounded-lg group"
                  whileHover={{
                    translateY: "-5px",
                    boxShadow: "0px 0px 10px #ff0",
                    background: "black",
                    scaleX: 1.025,
                    transition: { duration: 0.8, type: "spring", bounce: 0.7 },
                  }}
                  animate={{ y: [-40, -20, 0, 10, 0] }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                >
                  <GoDotFill className="text-xl text-yellow-300" />
                  <h2 className="cursor-pointer text-lg  bg-slate-600 rounded-r-lg px-4 py-1 group-hover:bg-slate-800">
                    {skill}
                  </h2>
                </motion.div>
              ))}
            </div>
          </div>

          <hr />
          <div className="my-2 mx-4 text-yellow-400">
            <h2 className="flex text-3xl items-center gap-1 font-bold max-md:text-2xl max-sm:text-xl">
              <FaInfoCircle className="text-2xl" /> About the Job :{" "}
            </h2>
            <h2 className="text-xl mx-2 flex items-center gap-1 max-md:text-lg">
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
                enqueueSnackbar("Job Deleted Successfully", {
                  variant: "success",
                });
                navigate("/home");
              }}
            />
          )}
        </div>
        <div className="flex flex-col w-full items-center text-3xl shadow-[1px_1px_10px] shadow-slate-400 px-4 py-2 rounded-xl ">
          {auth?.userType === "employee" && (
            <button
              className={`${
                isApplied || !canApply
                  ? "bg-slate-500 text-yellow-400 group cursor-not-allowed"
                  : "bg-slate-200 hover:bg-yellow-400 hover:text-slate-800 hover:-translate-y-2 shadow-[1px_1px_10px] w-96 shadow-yellow-400 transition-all ease-in-out duration-300"
              } flex items-center text-3xl my-4 px-4 py-2 rounded-xl justify-center`}
              onClick={(e) => handleJobApply(e)}
              // disabled={isApplied}
            >
              {isApplied && "You have already applied for this job"}
              {!canApply &&
                !isApplied &&
                "The requested job is no more open for application"}
              {!isApplied && canApply && "Apply"}
            </button>
          )}
          {auth?.userType === "employer" &&
            aboutJob?.applicants?.length === 0 && (
              <div className="text-yellow-400">No Applicantions Yet...</div>
            )}
          {auth?.userType === "employer" &&
            aboutJob?.applicants?.length !== 0 && (
              <div className="self-start">
                <h2 className="my-2 text-yellow-400 max-md:text-2xl max-sm:text-xl">
                  Applied By:{" "}
                </h2>
                <div className="flex flex-wrap gap-2 max-md:justify-center">
                  {applicants?.map((applicant) => {
                    return (
                      <Link
                        key={applicant._id}
                        to={`/profile/applicantProfile`}
                        className="mx-2 shadow-[1px_1px_10px] max-sm:w-4/5 shadow-slate-300 px-4 py-2 w-fit text-xl text-yellow-300 rounded-md hover:-translate-y-2 hover:shadow-yellow-400 duration-200 transition-all ease-in-out"
                        state={{
                          applicant: applicant,
                          jobTitle: aboutJob.title,
                          employer: aboutJob.companyName,
                          employerId: aboutJob.employer,
                          jobId,
                        }}
                      >
                        <div className="flex justify-start flex-col">
                          <h2 className="font-bold max-md:text-lg max-sm:text-sm">
                            Name:{" "}
                            <span className="font-light">
                              {applicant.fullName}
                            </span>
                          </h2>
                          <h2 className="font-bold max-md:text-lg max-sm:text-sm">
                            Location:{" "}
                            <span className="font-light">
                              {applicant.location}
                            </span>
                          </h2>
                        </div>
                        <div className="flex gap-1 flex-col">
                          <span className="font-bold max-md:text-lg max-sm:text-sm">
                            Top skills:
                          </span>
                          {applicant.skills.map((skill) => {
                            return (
                              <div key={skill} className="">
                                <h2 className="px-2 text-lg max-sm:text-sm font-light bg-slate-600 text-yellow-300 rounded-xl">
                                  {skill}
                                </h2>
                              </div>
                            );
                          })}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      </motion.div>
    </>
  );
};

export default JobDetailsPage;
