/* eslint-disable react/prop-types */
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import skillsData from "../../partials/skillsData.js";

const SkillsInput = ({ skills, setSkills }) => {
  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillChange = (index, e) => {
    const newSkills = skills.slice();
    newSkills[index] = e.target.value;
    setSkills(newSkills);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2 gap-4 bg-white"
        >
          <select
            className="outline-none p-2 font-serif text-xl w-3/4 border-b-2 border-gray-300 focus:border-blue-500"
            value={skill}
            onChange={(e) => handleSkillChange(index, e)}
          >
            <option value="">Select Skill</option>
            {skillsData.map((skillOption) => (
              <option
                key={skillOption.id}
                value={skillOption.name}
                disabled={skills.includes(skillOption.name) && skills[index] !== skillOption.name}
              >
                {skillOption.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => removeSkill(index)}
            title="Remove Skill"
            className="text-red-600 text-3xl hover:text-red-800 transition duration-200 ease-in-out"
          >
            <MdDeleteForever />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSkill}
        title="Add Skill"
        className="text-green-600 text-4xl mt-4 hover:text-green-800 transition duration-200 ease-in-out"
      >
        <IoAddCircle />
      </button>
    </div>
  );
};

export default SkillsInput;
