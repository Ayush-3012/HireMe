import { useState } from "react";
import { useLocation } from "react-router-dom";
import ConnectMessage from "../components/ConnectMessage";

const ApplicantDetails = () => {
  const location = useLocation();
  const { applicant } = location.state || {};
  const [showConnectComponent, setShowConnectComponent] = useState(false);

  return (
    <div className="flex flex-col p-6 bg-pink-700 m-4 font-serif shadow-lg shadow-black rounded-xl">
      <div className="flex items-center justify-center ">
        <h1 className="text-5xl font-bold text-slate-50">
          {applicant.fullName}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row mx-4 justify-between items-center my-4 py-2 border-b border-slate-50 pb-4">
        <div className="flex flex-col md:flex-row md:gap-8">
          <p className="text-slate-300">
            <strong>Contact Number:</strong> {applicant.contactNumber}
          </p>
          <p className="text-slate-300">
            <strong>Email:</strong> {applicant.email}
          </p>
          <p className="text-slate-300">
            <strong>Location:</strong> {applicant.location}
          </p>
        </div>
        <div className="my-4">
          <p className="text-slate-200">
            <strong>Resume:</strong>{" "}
            <a
              href={applicant.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-cyan-200 underline"
            >
              View Resume
            </a>
          </p>
        </div>
      </div>

      <div className="my-4">
        <h2 className="text-2xl font-bold text-slate-100">Skills</h2>
        <ul className="flex gap-3 flex-wrap mt-2">
          {applicant.skills?.map((skill, index) => (
            <li
              className="rounded-full bg-zinc-800 px-4 py-1 text-slate-300 hover:bg-cyan-500 transition-colors"
              key={index}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-around my-4 gap-2">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-slate-100">Education</h2>
          <ul className="list-disc pl-5 mt-2 text-slate-300">
            {applicant.education?.map((edu, index) => (
              <li key={index} className="mb-2">
                <strong>Institution:</strong> {edu.institution} <br />
                <strong>Degree:</strong> {edu.degree} <br />
                <strong>Year:</strong> {edu.year}
              </li>
            ))}
          </ul>
        </div>

        <div className=" w-full">
          <h2 className="text-2xl font-bold text-slate-100">Experience</h2>
          <ul className="list-disc pl-5 mt-2 text-slate-300">
            {applicant.experience?.map((exp, index) => (
              <li key={index} className="mb-2">
                <strong>Company:</strong> {exp.company} <br />
                <strong>Role:</strong> {exp.role} <br />
                <strong>Duration:</strong> {exp.duration}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center relative justify-center my-4 bg-orange-200 py-2 rounded-xl hover:-translate-y-2 shadow-md shadow-slate-900 hover:text-white hover:bg-orange-400 transition-all ease-in-out duration-300">
        <button
          className="text-3xl"
          onClick={() => setShowConnectComponent(true)}
        >
          Connect With Applicant
        </button>
      </div>
      {showConnectComponent && (
        <ConnectMessage
          onClose={() => setShowConnectComponent(false)}
          employeeId={applicant._id}
          employeeName={applicant.fullName}
        />
      )}
    </div>
  );
};

export default ApplicantDetails;
