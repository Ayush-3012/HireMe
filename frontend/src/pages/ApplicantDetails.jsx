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
    <div className="flex flex-col p-6 bg-pink-700 m-4 font-serif shadow-lg shadow-black rounded-xl">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-5xl font-bold text-slate-50">
          {applicant.fullName}
        </h1>
        <h1 className="text-2xl  text-slate-300">Applied for: {jobTitle}</h1>
      </div>
      <div className="flex flex-col md:flex-row mx-4 justify-between items-center my-4 py-2 border-b border-slate-50 pb-4">
        <div className="flex text-slate-50 flex-col md:flex-row md:gap-8">
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
        <div className="my-4 flex gap-2">
          <p className="text-slate-200 font-bold">Resume: </p>
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

      <div className="my-4 flex items-center gap-2">
        <h2 className="text-2xl font-bold text-slate-50">Skills: </h2>
        <div className="flex items-center justify-center gap-2 flex-wrap ">
          {applicant.skills?.map((skill, index) => (
            <div
              className="rounded-full bg-zinc-800 px-4 py-1 text-slate-100 hover:bg-cyan-500 transition-colors"
              key={index}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-around my-4 gap-2">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-slate-100">Education</h2>
          <div className="list-disc pl-5 mt-2 text-slate-300">
            {applicant.education?.map((edu, index) => (
              <div key={index} className="mb-2 flex flex-col ">
                <h2 className="font-bold">
                  Institution:{" "}
                  <span className="font-light "> {edu.institution}</span>
                </h2>
                <h2 className="font-bold">
                  Degree: <span className="font-light ">{edu.degree}</span>
                </h2>
                <h2 className="font-bold">
                  Year:{" "}
                  <span className="font-light ">{edu.yearOfGraduation}</span>
                </h2>
                <h2 className="font-bold">
                  Grade: <span className="font-light ">{edu.grade}</span>
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div className=" w-full">
          <h2 className="text-2xl font-bold text-slate-100">Experience</h2>
          <ul className="list-disc pl-5 mt-2 text-slate-300">
            {applicant.experience?.map((exp, index) => (
              <div key={index} className="mb-2">
                <h2 className="font-bold">
                  Job Role:
                  <span className="font-light "> {exp.jobTitle}</span>
                </h2>
                <h2 className="font-bold">
                  Company:{" "}
                  <span className="font-light ">{exp.companyName}</span>
                </h2>
                <h2 className="font-bold">
                  Duration:
                  <span className="font-light ">{exp.duration}</span>
                </h2>
                <h2 className="font-bold">
                  Description:{" "}
                  <span className="font-light ">{exp.description}</span>
                </h2>
              </div>
            ))}
          </ul>
        </div>
      </div>
      {
        <div
          className={`${
            isConversationExists
              ? "bg-slate-500"
              : "bg-orange-200 hover:text-white hover:bg-orange-400 hover:-translate-y-2"
          } flex items-center relative justify-center my-4  py-2 rounded-xl  shadow-md shadow-slate-900  transition-all ease-in-out duration-300`}
        >
          <button
            className="text-3xl"
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
