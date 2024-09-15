import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

const SkillsInput = () => {
  const [skills, setSkills] = useState([""]);

  const handleSkillChange = (index, event) => {
    const newSkills = skills.slice();
    newSkills[index] = event.target.value;
    setSkills(newSkills);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center ">
      {skills.map((skill, index) => (
        <div key={index} className="flex justify-center items-center">
          <input
            type="text"
            className="outline w-80 p-2 font-serif text-xl "
            value={skill}
            onChange={(event) => handleSkillChange(index, event)}
            placeholder="Skill"
          />
          <button type="button" onClick={() => removeSkill(index)}>
            <MdDeleteForever className="text-4xl text-red-600" />
          </button>
        </div>
      ))}
      <button type="button" onClick={addSkill}>
        <IoAddCircle className="text-4xl text-green-600" />
      </button>
    </div>
  );
};

export default SkillsInput;
