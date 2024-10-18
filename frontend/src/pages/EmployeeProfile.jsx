/* eslint-disable react/prop-types */
// import { useState } from "react";

const EmployeeProfile = ({ employeeProfile }) => {
  // const [isEditing, setIsEditing] = useState(false);
  // const [formData, setFormData] = useState(EmployeeProfile || {});

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleUpdateProfile = async () => {
  //   try {
  //     await EmployeeProfile?.saveProfile(formData);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  // const {
  //   fullName,
  //   contactNumber,
  //   email,
  //   location,
  //   skills,
  //   experience,
  //   education,
  //   resumeUrl,
  // } = formData;

  return (
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
            <li className="rounded-xl cursor-pointer bg-zinc-900 px-3 " key={index}>
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

      {/* <button onClick={() => setIsEditing(true)}>Edit Profile</button> */}
    </div>
  );
};

export default EmployeeProfile;
