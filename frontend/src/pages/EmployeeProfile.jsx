/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";
import { useAllContext } from "../context/HireMeContext";
import SkillsInput from "../auth/inputs/SkillsInput";
import ExperienceInput from "../auth/inputs/ExperienceInput";
import EducationInput from "../auth/inputs/EducationInput";
import { enqueueSnackbar } from "notistack";
import { FaBook, FaLocationDot } from "react-icons/fa6";
import { IoCall, IoMail } from "react-icons/io5";
import { MdSelfImprovement } from "react-icons/md";
import { RiGraduationCapFill, RiUserStarFill } from "react-icons/ri";

const EmployeeProfile = ({ employeeProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(employeeProfile.fullName);
  const [email, setEmail] = useState(employeeProfile.email);
  const [contact, setContact] = useState(employeeProfile.contactNumber);
  const [resumeUrl, setResumeUrl] = useState(employeeProfile.resumeUrl);
  const [location, setLocation] = useState(employeeProfile.location);
  const [skills, setSkills] = useState(employeeProfile.skills || []);
  const [experience, setExperience] = useState(
    employeeProfile.experience || []
  );
  const [education, setEducation] = useState(employeeProfile.education || []);

  const { profile } = useAllContext();

  const validateForm = () => {
    if (!fullName.trim()) return "Full name is required.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      return "A valid email is required.";

    if (!contact.trim() || !/^\d{10}$/.test(contact))
      return "A valid 10-digit contact number is required.";
    if (!location.trim()) return "Location is required.";
    if (!resumeUrl.trim() || !/^https?:\/\/.+/.test(resumeUrl))
      return "A valid resume URL is required.";

    if (skills.length === 0) return "At least one skill is required.";
    if (education.length === 0)
      return "At least one education entry is required.";
    if (
      experience.length > 0 &&
      !experience.every((exp) => exp.title && exp.company)
    )
      return "All experience entries must have a title and company.";

    return null;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
      return;
    }

    try {
      const user = {
        fullName,
        email,
        resumeUrl,
        contactNumber: contact,
        location,
        skills,
        experience,
        education,
      };
      await profile?.saveProfile(user);
      enqueueSnackbar("Employee Profile Saved", { variant: "success" });
      await profile?.fetchProfile("employee");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className=" mx-auto p-4 font-serif">
      {isEditing ? (
        <form
          onSubmit={handleSaveProfile}
          className="bg-gray-800 text-yellow-400 p-6 rounded-md shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <motion.div
            className="grid shadow-yellow-400 shadow-[2px_2px_10px] px-4 py-4 rounded-md grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
          >
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 shadow-[1px_1px_10px] shadow-yellow-400 bg-inherit rounded focus:ring outline-none ring-slate-300"
              />
            </div>
            <div>
              <label className=" mb-2 flex items-center">
                <IoMail /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 shadow-[1px_1px_10px] shadow-yellow-400 bg-inherit rounded focus:ring outline-none ring-slate-300"
              />
            </div>
            <div>
              <label className=" mb-2 flex items-center">
                {" "}
                <IoCall /> Contact Number
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-3 py-2 shadow-[1px_1px_10px] shadow-yellow-400 bg-inherit rounded focus:ring outline-none ring-slate-300"
              />
            </div>
            <div>
              <label className=" mb-2 flex items-center">
                {" "}
                <FaLocationDot /> Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 shadow-[1px_1px_10px] shadow-yellow-400 bg-inherit rounded focus:ring outline-none ring-slate-300"
              />
            </div>
          </motion.div>
          <div className="mt-4">
            <label className="mb-2 flex items-center">
              <MdSelfImprovement /> Skills
            </label>
            <SkillsInput skills={skills} setSkills={setSkills} fromEdit />
          </div>
          <div className="mt-4">
            <label className="mb-2 flex items-center">
              <RiUserStarFill /> Experience
            </label>
            <ExperienceInput
              experience={experience}
              setExperience={setExperience}
              fromEdit
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 flex items-center">
              <FaBook /> Education
            </label>
            <EducationInput
              education={education}
              setEducation={setEducation}
              fromEdit
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 flex items-center">Resume URL</label>
            <input
              type="text"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              className="w-full px-3 py-2 shadow-[1px_1px_10px] shadow-yellow-400 bg-inherit rounded focus:ring outline-none ring-slate-300"
            />
          </div>
          <motion.div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-red-500 text-yellow-300 rounded-md hover:bg-red-600 hover:scale-x-110 transition-all duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-slate-700 text-yellow-300 rounded-md hover:bg-slate-900 hover:scale-x-110 transition-all duration-150 ease-in-out"
            >
              Save Changes
            </button>
          </motion.div>
        </form>
      ) : (
        <motion.div
          className="bg-gray-800 text-yellow-400 font-serif p-6 rounded-md shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
        >
          <div className="hover:shadow-yellow-400 hover:shadow-[0px_0px_10px] p-2 transition duration-250 hover:scale-y-105 ease-in-out rounded-md">
            <h1 className="text-3xl font-bold text-center mb-4">
              {employeeProfile.fullName}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong className="flex items-center gap-1">
                  <IoMail className="text-lg" /> Email:{" "}
                  <span className="font-light">{employeeProfile.email}</span>
                </strong>
              </p>
              <p>
                <strong className="flex items-center gap-1">
                  <IoCall className="text-lg" /> Contact Number:{" "}
                  <span className="font-light">
                    {employeeProfile.contactNumber}
                  </span>
                </strong>
              </p>
              <p>
                <strong className="flex items-center gap-1">
                  <FaLocationDot className="text-lg" /> Location:{" "}
                  <span className="font-light">{employeeProfile.location}</span>
                </strong>
              </p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <h2 className="font-bold text-lg flex items-center gap-1">
                <MdSelfImprovement className="text-xl" /> Skills:
              </h2>
              <div className="flex flex-wrap gap-2 ">
                {employeeProfile.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-600 rounded-full hover:bg-slate-950 hover:-translate-y-1 transition duration-200 ease-in-out"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4 max-md:flex-col">
            <div className="mt-4 flex-1 hover:shadow-yellow-400 hover:shadow-[0px_0px_10px] p-2 transition duration-250 hover:scale-y-105 ease-in-out rounded-md">
              <h2 className="font-bold text-lg flex items-center gap-1">
                <RiUserStarFill className="text-xl" /> Experience:
              </h2>
              {employeeProfile.experience?.map((exp, index) => (
                <div key={index} className="mt-2 ml-4">
                  <p>
                    <strong>Company:</strong> {exp.companyName}
                  </p>
                  <p>
                    <strong>Title:</strong> {exp.jobTitle}
                  </p>
                  <p>
                    <strong>Duration:</strong> {exp.duration}
                  </p>
                  <p>
                    <strong>Description:</strong> {exp.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex-1 hover:shadow-yellow-400 hover:shadow-[0px_0px_10px] p-2 transition duration-250 hover:scale-y-105 ease-in-out rounded-md">
              <h2 className="font-bold text-lg flex items-center gap-1">
                <RiGraduationCapFill className="text-xl" /> Education:
              </h2>
              {employeeProfile.education?.map((edu, index) => (
                <div key={index} className="mt-2 ml-4">
                  <p>
                    <strong>Degree:</strong> {edu.degree}
                  </p>
                  <p>
                    <strong>Institute:</strong> {edu.institution}
                  </p>
                  <p>
                    <strong>Year:</strong> {edu.yearOfGraduation}
                  </p>
                  <p>
                    <strong>Grade:</strong> {edu.grade}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p>
              <strong>Resume:</strong>{" "}
              <a
                href={employeeProfile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View Resume
              </a>
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              className="px-6 py-2 bg-slate-700 text-yellow-300 rounded-md hover:bg-slate-950 hover:shadow-[1px_1px_5px] hover:scale-x-110 transition-all duration-150 ease-in-out"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmployeeProfile;
