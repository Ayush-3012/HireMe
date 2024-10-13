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
    <div>
      <>
        <h1>{employeeProfile.fullName}</h1>
        <p>
          <strong>Contact Number:</strong> {employeeProfile.contactNumber}
        </p>
        <p>
          <strong>Email:</strong> {employeeProfile.email}
        </p>
        <p>
          <strong>Location:</strong> {employeeProfile.location}
        </p>

        <h2>Skills</h2>
        <ul>
          {employeeProfile.skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <h2>Experience</h2>
        <ul>
          {employeeProfile.experience?.map((exp, index) => (
            <li key={index}>
              <strong>Company:</strong> {exp.company} <br />
              <strong>Role:</strong> {exp.role} <br />
              <strong>Duration:</strong> {exp.duration}
            </li>
          ))}
        </ul>

        <h2>Education</h2>
        <ul>
          {employeeProfile.education?.map((edu, index) => (
            <li key={index}>
              <strong>Institution:</strong> {edu.institution} <br />
              <strong>Degree:</strong> {edu.degree} <br />
              <strong>Year:</strong> {edu.year}
            </li>
          ))}
        </ul>

        <p>
          <strong>Resume:</strong>{" "}
          <a href={employeeProfile.resumeUrl} target="_blank">
            View Resume
          </a>
        </p>

        {/* <button onClick={() => setIsEditing(true)}>Edit Profile</button> */}
      </>
    </div>
  );
};

export default EmployeeProfile;
