import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ImProfile } from "react-icons/im";
import ExperienceInput from "./inputs/ExperienceInput";
import SkillsInput from "./inputs/SkillsInput";
import EducationInput from "./inputs/EducationInput";
import { useAllContext } from "../context/HireMeContext";
import BasicInput from "./inputs/BasicInput";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa6";
import { RiUserStarFill } from "react-icons/ri";
import { MdSelfImprovement } from "react-icons/md";

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
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  const [showSkillsPage, setShowSkillsPage] = useState(false);
  const [showExperiencePage, setShowExperiencePage] = useState(false);
  const [showEducationPage, setShowEducationPage] = useState(false);
  const [showBasicInfo, setShowBasicInfo] = useState(true);

  const navigate = useNavigate();

  const showCurrentComponent = (e) => {
    e.preventDefault();
    switch (e.target.innerText) {
      case "My Profile":
        setShowBasicInfo(true);
        setShowSkillsPage(false);
        setShowExperiencePage(false);
        setShowEducationPage(false);
        break;
      case "Skills":
        setShowBasicInfo(false);
        setShowSkillsPage(true);
        setShowExperiencePage(false);
        setShowEducationPage(false);
        break;
      case "Education":
        setShowBasicInfo(false);
        setShowSkillsPage(false);
        setShowExperiencePage(false);
        setShowEducationPage(true);
        break;
      case "Experience":
        setShowBasicInfo(false);
        setShowSkillsPage(false);
        setShowExperiencePage(true);
        setShowEducationPage(false);
        break;
    }
  };

  useEffect(() => {
    auth?.userType === "employer" && navigate("/register/company");
  }, [auth?.userType, navigate]);

  const validateForm = () => {
    if (!fullName.trim()) return "Full name is required.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      return "A valid email is required.";
    if (!password.trim() || password.length < 6)
      return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
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

  const handleEERegister = async (e) => {
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
        password,
        contactNumber: contact,
        location,
        resumeUrl,
        skills,
        education,
        experience,
      };

      const res = await auth?.registerAuth(user);

      res?.status === 201
        ? (enqueueSnackbar(res?.data?.message + "Please Login", {
            variant: "success",
          }),
          navigate("/"))
        : enqueueSnackbar(res.response.data.message, { variant: "error" });
    } catch (error) {
      enqueueSnackbar("Registration failed. Please try again.", {
        variant: "error",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center font-serif py-6 px-4 w-full bg-gray-800">
      <form
        method="post"
        onSubmit={(e) => handleEERegister(e)}
        className="w-full max-w-3xl hover:shadow-[2px_2px_10px] hover:shadow-yellow-400 rounded-lg p-8 max-md:p-6 max-sm:p-4"
      >
        <h2 className="text-3xl underline text-yellow-400 font-bold text-center mb-6 max-md:text-2xl max-sm:text-xl">
          Register Yourself
        </h2>
        <div className="flex gap-1 text-yellow-300 justify-evenly text-xl my-3 rounded-md font-serif max-md:text-lg max-sm:text-sm ">
          <motion.button
            className={`flex items-center justify-center gap-1 hover:bg-yellow-900 py-1 px-2 rounded-md max-md:px-4 max-md:py-2 ${
              showBasicInfo ? "bg-slate-950" : "bg-slate-700"
            }`}
            onClick={(e) => showCurrentComponent(e)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          >
            <ImProfile className="max-md:text-xl" />
            <span className="max-sm:hidden">My Profile</span>
          </motion.button>
          <motion.button
            className={`flex items-center justify-center gap-1 hover:bg-yellow-900 py-1 px-2 rounded-md max-md:px-4 max-md:py-2 ${
              showSkillsPage ? "bg-slate-950" : "bg-slate-700"
            }`}
            onClick={(e) => showCurrentComponent(e)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
          >
            <MdSelfImprovement className="max-md:text-xl" />
            <span className="max-sm:hidden">Skills</span>
          </motion.button>
          <motion.button
            className={`flex justify-center items-center gap-1 hover:bg-yellow-900 py-1 px-2 rounded-md max-md:px-4 max-md:py-2 ${
              showEducationPage ? "bg-slate-950" : "bg-slate-700"
            }`}
            onClick={(e) => showCurrentComponent(e)}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.7, type: "spring", bounce: 0.5 }}
          >
            <FaBook className="max-md:text-xl" />
            <span className="max-sm:hidden">Education</span>
          </motion.button>
          <motion.button
            className={`flex items-center justify-center gap-1 hover:bg-yellow-900 py-1 px-2 rounded-md max-md:px-4 max-md:py-2 ${
              showExperiencePage ? "bg-slate-950" : "bg-slate-700"
            }`}
            onClick={(e) => showCurrentComponent(e)}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.2, type: "spring", bounce: 0.5 }}
          >
            <RiUserStarFill className="max-md:text-xl" />
            <span className="max-sm:hidden">Experience</span>
          </motion.button>
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
            className="bg-slate-900 mt-4 py-3 rounded-md text-2xl text-yellow-400 shadow-[2px_2px_10px] shadow-yellow-400 transition-all ease-in-out hover:scale-105 max-md:text-xl max-sm:text-lg"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegisterForm;
