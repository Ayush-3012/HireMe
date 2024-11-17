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
      className={`flex flex-col w-full justify-center ${
        !fromEdit && "items-center"
      }`}
    >
      <div
        className={`flex flex-wrap items-center text-yellow-400 gap-2 w-full  p-2 mb-1 ${
          fromEdit ? "bg-inherit" : "bg-slate-800"
        }  shadow-[2px_2px_10px] rounded-lg shadow-yellow-400`}
      >
        {skills?.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-500 text-yellow-300 rounded-full px-3 py-1 font-serif text-lg"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-2 text-yellow-400 hover:text-red-500"
            >
              <MdClose className="text-2xl" />
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
        <div className="relative w-full">
          <div className="absolute top-0 w-3/5 bg-gray-700 rounded-md border border-yellow-400 p-2 text-yellow-400 z-10">
            {suggestions?.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => addSkill(suggestion.name)}
                className="cursor-pointer p-1 hover:bg-slate-500 rounded-md"
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
