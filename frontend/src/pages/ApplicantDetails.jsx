/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateConversation from "../components/chatComponents/CreateConversation.jsx";
import { useAllContext } from "../context/AuthContext.jsx";

const ApplicantDetails = () => {
  const location = useLocation();
  const { chats } = useAllContext();
  const { applicant, jobTitle, employer, employerId } = location.state || {};
  const [showConnectComponent, setShowConnectComponent] = useState(false);
  const [isConversationExists, setIsConversationExists] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      const res = await chats?.checkConversation(employerId, applicant._id);
      setIsConversationExists(res?.exists);
    };
    fetchInfo();
  }, [employerId, applicant._id]);

  return (
    <div className="flex flex-col p-6 mx-2 font-serif shadow-[1px_1px_10px] shadow-yellow-400 rounded-lg my-2 max-md:p-4">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-5xl font-bold text-yellow-300 max-md:text-4xl max-sm:text-3xl">
          {applicant.fullName}
        </h1>
        <h1 className="text-2xl text-yellow-400 max-md:text-xl max-sm:text-lg">
          Applied for: {jobTitle}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row mx-4 justify-between items-center my-4 py-2 border-b border-yellow-400 pb-4 max-md:mx-2">
        <div className="flex justify-between text-yellow-400 w-full max-md:flex-col">
          <div className="flex gap-4 max-lg:flex-col max-lg:gap-2">
            <p className="">
              <strong>Contact Number:</strong> {applicant.contactNumber}
            </p>
            <p className="">
              <strong>Email:</strong> {applicant.email}
            </p>
            <p className="">
              <strong>Location:</strong> {applicant.location}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-yellow-400 font-bold">Resume: </p>
            <a
              href={applicant.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-cyan-200 underline"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>

      <div className="my-4 flex items-center gap-2 flex-wrap">
        <h2 className="text-2xl font-bold text-yellow-400">Skills: </h2>
        <div className="flex items-center justify-center gap-2 flex-wrap max-md:gap-1">
          {applicant.skills?.map((skill, index) => (
            <div
              className="rounded-full bg-zinc-800 px-4 py-1 text-yellow-300 hover:-translate-y-1 hover:shadow-yellow-400 hover:shadow-[1px_1px_5px] duration-200 ease-in-out transition-all max-md:px-3"
              key={index}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-around my-4 gap-2 max-md:flex-col">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-yellow-300 max-md:text-xl">
            Education:
          </h2>
          <div className="pl-5 mt-2 text-yellow-400 max-md:mt-0 max-md:pl-3">
            {applicant.education?.map((edu, index) => (
              <div key={index} className="mb-2 flex flex-col ">
                <h2 className="font-bold">
                  Institution:{" "}
                  <span className="font-light ">
                    {" "}
                    {edu.institution || "NA"}
                  </span>
                </h2>
                <h2 className="font-bold">
                  Degree:{" "}
                  <span className="font-light ">{edu.degree || "NA"}</span>
                </h2>
                <h2 className="font-bold">
                  Year:{" "}
                  <span className="font-light ">
                    {edu.yearOfGraduation || "NA"}
                  </span>
                </h2>
                <h2 className="font-bold">
                  Grade:{" "}
                  <span className="font-light ">{edu.grade || "NA"}</span>
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div className=" w-full">
          <h2 className="text-2xl font-bold text-yellow-300 max-md:text-xl">
            Experience:
          </h2>
          <div className="pl-5 mt-2 text-yellow-400 max-md:mt-0 max-md:pl-3">
            {applicant.experience.length != 0 &&
              applicant.experience?.map((exp, index) => (
                <div key={index} className="mb-2 flex flex-col gap-1">
                  <h2 className="font-bold">
                    Job Role:
                    <span className="font-light "> {exp.jobTitle || "NA"}</span>
                  </h2>
                  <h2 className="font-bold">
                    Company:{" "}
                    <span className="font-light ">
                      {exp.companyName || "NA"}
                    </span>
                  </h2>
                  <h2 className="font-bold">
                    Duration:{" "}
                    <span className="font-light ">{exp.duration || "NA"}</span>
                  </h2>
                  <h2 className="font-bold">
                    Description:{" "}
                    <span className="font-light ">
                      {exp.description || "NA"}
                    </span>
                  </h2>
                </div>
              ))}
          </div>
        </div>
      </div>
      {
        <div
          className={`${
            isConversationExists
              ? "bg-slate-500 text-yellow-400 group cursor-not-allowed"
              : "bg-slate-200 hover:bg-yellow-400 hover:text-slate-800 hover:-translate-y-2 shadow-[2px_1px_10px]"
          } flex items-center relative justify-center my-4 py-2 rounded-xl   shadow-yellow-400  transition-all ease-in-out duration-300 max-md:my-2 max-md:py-1 `}
        >
          <button
            className={`text-3xl max-md:text-2xl max-sm:text-xl ${
              isConversationExists && "cursor-not-allowed"
            }`}
            onClick={() => setShowConnectComponent(true)}
            disabled={isConversationExists}
          >
            Connect With {applicant.fullName}
          </button>
        </div>
      }
      {showConnectComponent && (
        <CreateConversation
          onClose={() => setShowConnectComponent(false)}
          employeeId={applicant._id}
          employeeName={applicant.fullName}
          employerName={employer}
          jobTitle={jobTitle}
        />
      )}
    </div>
  );
};

export default ApplicantDetails;
