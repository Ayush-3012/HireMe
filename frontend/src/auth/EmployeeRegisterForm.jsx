import { useState } from "react";
import ExperienceInput from "./inputs/ExperienceInput";
import SkillsInput from "./inputs/SkillsInput";
import EducationInput from "./inputs/EducationInput";
import { useAllContext } from "../context/AuthContext";
import BasicInput from "./inputs/BasicInput";

const EmployeeRegisterForm = () => {
  const { auth } = useAllContext();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [skills, setSkills] = useState([""]);
  const [experience, setExperience] = useState([{}]);
  const [education, setEducation] = useState([{}]);

  const [showSkillsPage, setShowSkillsPage] = useState(false);
  const [showExperiencePage, setShowExperiencePage] = useState(false);
  const [showEducationPage, setShowEducaionPage] = useState(false);
  const [showBasicInfo, setShowBasicInfo] = useState(true);

  const handleEERegister = async (e) => {
    e.preventDefault();

    try {
      const user = {
        fullName,
        email,
        password,
        contactNumber: contact,
        location,
        resumeUrl,
        skills,
        education,
        experience,
      };

      await auth?.registerAuth(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full  bg-gray-100">
      <form
        method="post"
        onSubmit={handleEERegister}
        className="bg-gray-400 shadow-md rounded-lg w-[90%] p-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Employee Registration
        </h2>
        <div className="flex bg-blue-400 py-2 justify-evenly text-xl my-2 rounded-md font-serif">
          <button
            className="hover:bg-blue-600 py-1 px-2 rounded-md"
            onClick={() => {
              setShowBasicInfo(true);
              setShowSkillsPage(false);
              setShowExperiencePage(false);
              setShowEducaionPage(false);
            }}
          >
            My Profile
          </button>
          <button
            className="hover:bg-blue-600 py-1 px-2 rounded-md"
            onClick={() => {
              setShowBasicInfo(false);
              setShowSkillsPage(true);
              setShowExperiencePage(false);
              setShowEducaionPage(false);
            }}
          >
            Skills
          </button>
          <button
            className="hover:bg-blue-600 py-1 px-2 rounded-md"
            onClick={() => {
              setShowBasicInfo(false);
              setShowSkillsPage(false);
              setShowExperiencePage(false);
              setShowEducaionPage(true);
            }}
          >
            Education
          </button>
          <button
            className="hover:bg-blue-600 py-1 px-2 rounded-md"
            onClick={() => {
              setShowBasicInfo(false);
              setShowSkillsPage(false);
              setShowExperiencePage(true);
              setShowEducaionPage(false);
            }}
          >
            Experience
          </button>
        </div>

        {showBasicInfo && (
          <BasicInput
            basicInfo={
              (fullName,
              setFullName,
              email,
              setEmail,
              password,
              setPassword,
              confirmPassword,
              setConfirmPassword,
              contact,
              setContact,
              location,
              setLocation,
              resumeUrl,
              setResumeUrl)
            }
          />
        )}

        {showSkillsPage && (
          <SkillsInput skills={skills} setSkills={setSkills} />
        )}

        {showEducationPage && (
          <EducationInput education={education} setEducation={setEducation} />
        )}

        {showExperiencePage && (
          <ExperienceInput
            experience={experience}
            setExperience={setExperience}
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-xl font-semibold transition duration-150 ease-in-out"
        >
          Register Me
        </button>
      </form>
    </div>
  );
};

export default EmployeeRegisterForm;
