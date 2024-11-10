/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdClose } from "react-icons/md";
import skillsData from "../../partials/skillsData.js";

const SkillsInput = ({ skills, setSkills, fromEdit }) => {
  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);

    if (value) {
      const filteredSuggestions = skillsData
        .filter(
          (skill) =>
            skill.name.toLowerCase().includes(value.toLowerCase()) &&
            !skills.includes(skill.name)
        )
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const addSkill = (skill) => {
    setSkills([...skills, skill]);
    setSkillInput("");
    setSuggestions([]);
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div
      className={`flex flex-col w-full  justify-center ${
        !fromEdit && "items-center"
      }`}
    >
      <div
        className={`flex flex-wrap items-center gap-2 w-full p-2 mb-1 md:w-3/4 ${
          fromEdit ? "bg-inherit" : "bg-white"
        } border border-gray-300 rounded-lg shadow-sm`}
      >
        {skills?.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-red-100 rounded-full px-3 py-1 font-serif text-lg"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-2 text-blue-800 hover:text-red-800"
            >
              <MdClose />
            </button>
          </div>
        ))}

        <input
          type="text"
          value={skillInput}
          onChange={handleSkillInputChange}
          placeholder="Add a skill"
          className="flex-grow text-xl font-serif bg-transparent outline-none"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="relative w-full md:w-3/4 lg:w-1/2">
          <div className="absolute top-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10">
            {suggestions?.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => addSkill(suggestion.name)}
                className="cursor-pointer p-1 hover:bg-blue-100"
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsInput;
