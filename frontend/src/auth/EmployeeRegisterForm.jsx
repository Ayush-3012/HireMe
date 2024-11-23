import { useEffect, useState } from "react";
import ExperienceInput from "./inputs/ExperienceInput";
import SkillsInput from "./inputs/SkillsInput";
import EducationInput from "./inputs/EducationInput";
import { useAllContext } from "../context/AuthContext";
import BasicInput from "./inputs/BasicInput";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const EmployeeRegisterForm = () => {
  const { auth } = useAllContext();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([{}]);
  const [education, setEducation] = useState([{}]);

  const [showSkillsPage, setShowSkillsPage] = useState(false);
  const [showExperiencePage, setShowExperiencePage] = useState(false);
  const [showEducationPage, setShowEducationPage] = useState(false);
  const [showBasicInfo, setShowBasicInfo] = useState(true);

  const navigate = useNavigate();

  const showCurrentComponent = (e) => {
    e.preventDefault();
    switch (e.target.innerText) {
      case "My Profile": {
        setShowBasicInfo(true);
        setShowSkillsPage(false);
        setShowExperiencePage(false);
        setShowEducationPage(false);
        break;
      }
      case "Skills": {
        setShowBasicInfo(false);
        setShowSkillsPage(true);
        setShowExperiencePage(false);
        setShowEducationPage(false);
        break;
      }
      case "Education": {
        setShowBasicInfo(false);
        setShowSkillsPage(false);
        setShowExperiencePage(false);
        setShowEducationPage(true);
        break;
      }
      case "Experience": {
        setShowBasicInfo(false);
        setShowSkillsPage(false);
        setShowExperiencePage(true);
        setShowEducationPage(false);
        break;
      }
    }
  };

  useEffect(() => {
    auth?.userType === "employer" && navigate("/register/company");
    auth?.userType === "employee" &&
      enqueueSnackbar("Registering as Employee", { variant: "info" });
  }, [auth?.userType, navigate]);

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

      const data = await auth?.registerAuth(user);
      if (data) {
        enqueueSnackbar("Employee registerd successfully, please login", {
          variant: "success",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center font-serif py-6 px-4 w-full bg-gray-800">
      <form
        method="post"
        onSubmit={(e) => handleEERegister(e)}
        className="w-full max-w-3xl shadow-[2px_2px_10px] shadow-yellow-400 rounded-lg p-8"
      >
        <h2 className="text-3xl text-yellow-400 font-bold text-center mb-6">
          Register Yourself
        </h2>
        <div className="flex text-yellow-300 py-2 justify-evenly text-xl my-2 rounded-md font-serif">
          <button
            className={`hover:bg-yellow-900 py-1 px-2 rounded-md ${
              showBasicInfo ? "bg-yellow-900" : "bg-slate-700"
            }`}
            onClick={(e) => {
              showCurrentComponent(e);
            }}
          >
            My Profile
          </button>
          <button
            className={`hover:bg-yellow-900 py-1 px-2 rounded-md ${
              showSkillsPage ? "bg-yellow-900" : "bg-slate-700"
            }`}
            onClick={(e) => {
              showCurrentComponent(e);
            }}
          >
            Skills
          </button>
          <button
            className={`hover:bg-yellow-900 py-1 px-2 rounded-md ${
              showEducationPage ? "bg-yellow-900" : "bg-slate-700"
            }`}
            onClick={(e) => {
              showCurrentComponent(e);
            }}
          >
            Education
          </button>
          <button
            className={`hover:bg-yellow-900 py-1 px-2 rounded-md ${
              showExperiencePage ? "bg-yellow-900" : "bg-slate-700"
            }`}
            onClick={(e) => {
              showCurrentComponent(e);
            }}
          >
            Experience
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {showBasicInfo && (
            <BasicInput
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              contact={contact}
              setContact={setContact}
              location={location}
              setLocation={setLocation}
              resumeUrl={resumeUrl}
              setResumeUrl={setResumeUrl}
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
            className="bg-slate-500 mt-4 py-3 rounded-md text-2xl text-yellow-400 shadow-[2px_2px_10px] shadow-yellow-400  transition-all ease-in-out hover:scale-x-105 duration-200"
          >
            Register Me
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegisterForm;
