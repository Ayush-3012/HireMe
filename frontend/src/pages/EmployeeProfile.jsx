/* eslint-disable react/prop-types */
import { useState } from "react";

const EmployeeProfile = ({ employeeProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(EmployeeProfile || {});

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

  console.log(employeeProfile);

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
    <></>
    // <div>
    //   {!isEditing ? (
    //     <>
    //       <h1>{fullName}</h1>
    //       <p>
    //         <strong>Contact Number:</strong> {contactNumber}
    //       </p>
    //       <p>
    //         <strong>Email:</strong> {email}
    //       </p>
    //       <p>
    //         <strong>Location:</strong> {location}
    //       </p>

    //       <h2>Skills</h2>
    //       <ul>
    //         {skills?.map((skill, index) => (
    //           <li key={index}>{skill}</li>
    //         ))}
    //       </ul>

    //       <h2>Experience</h2>
    //       <ul>
    //         {experience?.map((exp, index) => (
    //           <li key={index}>
    //             <strong>Company:</strong> {exp.company} <br />
    //             <strong>Role:</strong> {exp.role} <br />
    //             <strong>Duration:</strong> {exp.duration}
    //           </li>
    //         ))}
    //       </ul>

    //       <h2>Education</h2>
    //       <ul>
    //         {education?.map((edu, index) => (
    //           <li key={index}>
    //             <strong>Institution:</strong> {edu.institution} <br />
    //             <strong>Degree:</strong> {edu.degree} <br />
    //             <strong>Year:</strong> {edu.year}
    //           </li>
    //         ))}
    //       </ul>

    //       <p>
    //         <strong>Resume:</strong>{" "}
    //         <a href={resumeUrl} target="_blank">
    //           View Resume
    //         </a>
    //       </p>

    //       <button onClick={() => setIsEditing(true)}>Edit Profile</button>
    //     </>
    //   ) : (
    //     {/* <div>
    //       <h1>Edit Profile</h1>

    //       <label>
    //         Full Name:
    //         <input
    //           type="text"
    //           name="fullName"
    //           value={fullName}
    //           onChange={handleInputChange}
    //         />
    //       </label>
    //       <br />

    //       <label>
    //         Contact Number:
    //         <input
    //           type="text"
    //           name="contactNumber"
    //           value={contactNumber}
    //           onChange={handleInputChange}
    //         />
    //       </label>
    //       <br />

    //       <label>
    //         Email:
    //         <input
    //           type="email"
    //           name="email"
    //           value={email}
    //           onChange={handleInputChange}
    //         />
    //       </label>
    //       <br />

    //       <label>
    //         Location:
    //         <input
    //           type="text"
    //           name="location"
    //           value={location}
    //           onChange={handleInputChange}
    //         />
    //       </label>
    //       <br />

    //       <h2>Skills</h2>
    //       <ul>
    //         {skills.map((skill, index) => (
    //           <li key={index}>
    //             <input
    //               type="text"
    //               name={`skills[${index}]`}
    //               value={skill}
    //               onChange={(e) => {
    //                 const newSkills = [...skills];
    //                 newSkills[index] = e.target.value;
    //                 setFormData({ ...formData, skills: newSkills });
    //               }}
    //             />
    //           </li>
    //         ))}
    //       </ul>

    //       <h2>Experience</h2>
    //       <ul>
    //         {experience.map((exp, index) => (
    //           <li key={index}>
    //             <strong>Company:</strong>{" "}
    //             <input
    //               type="text"
    //               name={`experience[${index}].company`}
    //               value={exp.company}
    //               onChange={(e) => {
    //                 const newExperience = [...experience];
    //                 newExperience[index] = { ...exp, company: e.target.value };
    //                 setFormData({ ...formData, experience: newExperience });
    //               }}
    //             />
    //             <br />
    //             <strong>Role:</strong>{" "}
    //             <input
    //               type="text"
    //               name={`experience[${index}].role`}
    //               value={exp.role}
    //               onChange={(e) => {
    //                 const newExperience = [...experience];
    //                 newExperience[index] = { ...exp, role: e.target.value };
    //                 setFormData({ ...formData, experience: newExperience });
    //               }}
    //             />
    //             <br />
    //             <strong>Duration:</strong>{" "}
    //             <input
    //               type="text"
    //               name={`experience[${index}].duration`}
    //               value={exp.duration}
    //               onChange={(e) => {
    //                 const newExperience = [...experience];
    //                 newExperience[index] = { ...exp, duration: e.target.value };
    //                 setFormData({ ...formData, experience: newExperience });
    //               }}
    //             />
    //           </li>
    //         ))}
    //       </ul>

    //       <h2>Education</h2>
    //       <ul>
    //         {education.map((edu, index) => (
    //           <li key={index}>
    //             <strong>Institution:</strong>{" "}
    //             <input
    //               type="text"
    //               name={`education[${index}].institution`}
    //               value={edu.institution}
    //               onChange={(e) => {
    //                 const newEducation = [...education];
    //                 newEducation[index] = {
    //                   ...edu,
    //                   institution: e.target.value,
    //                 };
    //                 setFormData({ ...formData, education: newEducation });
    //               }}
    //             />
    //             <br />
    //             <strong>Degree:</strong>{" "}
    //             <input
    //               type="text"
    //               name={`education[${index}].degree`}
    //               value={edu.degree}
    //               onChange={(e) => {
    //                 const newEducation = [...education];
    //                 newEducation[index] = { ...edu, degree: e.target.value };
    //                 setFormData({ ...formData, education: newEducation });
    //               }}
    //             />
    //             <br />
    //             <strong>Year:</strong>{" "}
    //             <input
    //               type="text"
    //               name={`education[${index}].year`}
    //               value={edu.year}
    //               onChange={(e) => {
    //                 const newEducation = [...education];
    //                 newEducation[index] = { ...edu, year: e.target.value };
    //                 setFormData({ ...formData, education: newEducation });
    //               }}
    //             />
    //           </li>
    //         ))}
    //       </ul>

    //       <button onClick={handleUpdateProfile}>Save Changes</button>
    //       <button onClick={() => setIsEditing(false)}>Cancel</button>
    //     </div> */}
    //   )}
    // </div>
  );
};

export default EmployeeProfile;
