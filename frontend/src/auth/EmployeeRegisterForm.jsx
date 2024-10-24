import { useState } from "react";
import ExperienceInput from "./inputs/ExperienceInput";
import SkillsInput from "./inputs/SkillsInput";
import EducationInput from "./inputs/EducationInput";
import { useAllContext } from "../context/AuthContext";

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
    <>
      <div className="flex items-center justify-center w-full border-4">
        <form method="post" onSubmit={handleEERegister}>
          <div className="flex m-4 justify-center flex-col gap-4 p-4 border-4 border-black">
            <div className=" flex justify-evenly gap-4">
              <input
                className="outline w-96 p-2 font-serif text-xl "
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                className="outline w-96 p-2 font-serif text-xl "
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className=" flex justify-evenly gap-4">
              <input
                className="outline w-96 p-2 font-serif text-xl "
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="outline w-96 p-2 font-serif text-xl "
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className=" flex justify-evenly gap-4">
              <input
                className="outline w-96 p-2 font-serif text-xl  "
                type="text"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <input
                className="outline w-96 p-2 font-serif text-xl  "
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-evenly gap-10">
              <input
                className="outline h-12 w-96 p-2 font-serif text-xl  "
                type="text"
                placeholder="Website"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                required
              />
              <SkillsInput skills={skills} setSkills={setSkills} />
            </div>
            <div className="flex justify-evenly gap-4">
              <EducationInput
                education={education}
                setEducation={setEducation}
              />
              <ExperienceInput
                experience={experience}
                setExperience={setExperience}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 py-4 text-2xl font-serif text-white hover:text-3xl transition-all duration-150"
            >
              Register Me
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployeeRegisterForm;
