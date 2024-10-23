/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAllContext } from "../context/AuthContext";

const EmployeeProfile = ({ employeeProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(employeeProfile.fullName);
  const [email, setEmail] = useState(employeeProfile.email);
  const [contact, setContact] = useState(employeeProfile.contactNumber);
  const [location, setLocation] = useState(employeeProfile.location);

  const { profile } = useAllContext();

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      if (
        employeeProfile.fullName !== fullName ||
        employeeProfile.email !== email ||
        employeeProfile.contactNumber !== contact ||
        employeeProfile.location !== location
      ) {
        const user = {
          fullName,
          email,
          // password,
          contactNumber: contact,
          location,
        };
        await profile?.saveProfile(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isEditing && (
        <form method="post" onSubmit={handleSaveProfile}>
          <div className="flex flex-col p-4 text-slate-200 bg-zinc-600 m-4  font-serif shadow-md shadow-cyan-300 rounded-xl">
            <div className="flex items-center justify-center text-4xl font-bold">
              <input
                className="bg-inherit outline rounded-md text-center focus-outline outline-neutral-50"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="flex justify-around items-center my-2 py-2">
              <p className="flex gap-2 py-1 items-center">
                <strong>Contact Number:</strong>
                <input
                  className="bg-inherit outline rounded-sm p-0.5 focus-outline outline-neutral-50"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </p>
              <p className="flex gap-2 py-1 items-center">
                <strong>Email:</strong>
                <input
                  className="bg-inherit outline rounded-sm p-0.5 focus-outline outline-neutral-50"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p className="flex gap-2 py-1 items-center">
                <strong>Location:</strong>
                <input
                  className="bg-inherit outline rounded-sm p-0.5 focus-outline outline-neutral-50"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </p>
            </div>

            {/* <div className="flex py-2 my-1">
              <h2 className="font-bold">Skills : </h2>
              <ul className="flex gap-3 mx-4">
                {employeeProfile.skills?.map((skill, index) => (
                  <li
                    className="rounded-xl cursor-pointer bg-zinc-900 px-3 "
                    key={index}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div> */}

            {/* <h2>Experience</h2>
      {console.log(employeeProfile.experience)}
      <ul>
        {employeeProfile.experience?.map((exp, index) => (
          <li key={index}>
            <strong>Company:</strong> {exp.company} <br />
            <strong>Role:</strong> {exp.role} <br />
            <strong>Duration:</strong> {exp.duration}
          </li>
        ))}
      </ul> */}

            {/* <h2>Education</h2>
      <ul>
        {employeeProfile.education?.map((edu, index) => (
          <li key={index}>
            <strong>Institution:</strong> {edu.institution} <br />
            <strong>Degree:</strong> {edu.degree} <br />
            <strong>Year:</strong> {edu.year}
          </li>
        ))}
      </ul> */}

            <div className="flex my-1 py-2">
              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={employeeProfile.resumeUrl}
                  target="_blank"
                  className="text-blue-400 hover:text-cyan-400"
                >
                  View Resume
                </a>
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 p-2 rounded-sm text-xl font-serif text-white hover:text-2xl transition-all duration-150"
              >
                Save Profile
              </button>
            </div>
          </div>
        </form>
      )}
      {!isEditing && (
        <div className="flex flex-col p-4 text-slate-200 bg-zinc-600 m-4  font-serif shadow-md shadow-cyan-300 rounded-xl">
          <div className="flex items-center justify-center text-4xl font-bold">
            <h1>{employeeProfile.fullName}</h1>
          </div>
          <div className="flex justify-around items-center my-2 py-2">
            <p>
              <strong>Contact Number:</strong> {employeeProfile.contactNumber}
            </p>
            <p>
              <strong>Email:</strong> {employeeProfile.email}
            </p>
            <p>
              <strong>Location:</strong> {employeeProfile.location}
            </p>
          </div>

          <div className="flex py-2 my-1">
            <h2 className="font-bold">Skills : </h2>
            <ul className="flex gap-3 mx-4">
              {employeeProfile.skills?.map((skill, index) => (
                <li
                  className="rounded-xl cursor-pointer bg-zinc-900 px-3 "
                  key={index}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* <h2>Experience</h2>
      {console.log(employeeProfile.experience)}
      <ul>
        {employeeProfile.experience?.map((exp, index) => (
          <li key={index}>
            <strong>Company:</strong> {exp.company} <br />
            <strong>Role:</strong> {exp.role} <br />
            <strong>Duration:</strong> {exp.duration}
          </li>
        ))}
      </ul> */}

          {/* <h2>Education</h2>
      <ul>
        {employeeProfile.education?.map((edu, index) => (
          <li key={index}>
            <strong>Institution:</strong> {edu.institution} <br />
            <strong>Degree:</strong> {edu.degree} <br />
            <strong>Year:</strong> {edu.year}
          </li>
        ))}
      </ul> */}

          <div className="flex my-1 py-2">
            <p>
              <strong>Resume:</strong>{" "}
              <a
                href={employeeProfile.resumeUrl}
                target="_blank"
                className="text-blue-400 hover:text-cyan-400"
              >
                View Resume
              </a>
            </p>
          </div>
        </div>
      )}

      {!isEditing && (
        <button
          className="bg-blue-700 p-2 w-fit rounded-md hover:bg-blue-900"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      )}
    </>
  );
};

export default EmployeeProfile;
