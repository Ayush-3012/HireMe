/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdClose } from "react-icons/md";
import skillsData from "../../partials/skillsData.js";

const SkillsInput = ({ skills, setSkills, fromEdit }) => {
  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);
    setSelectedIndex(-1);

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
    setSelectedIndex(-1);
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
        );
      } else if (e.key === "Enter" && selectedIndex !== -1) {
        e.preventDefault();
        addSkill(suggestions[selectedIndex].name);
      }
    }
  };

  return (
    <div
      className={`flex flex-col w-full shadow-yellow-400 shadow-[2px_2px_10px] p-4 rounded-md justify-center ${
        !fromEdit ? "items-center" : "shadow-[1px_1px_10px]"
      }`}
    >
    <h1 className="text-xl text-yellow-400 font-medium self-start mb-1">Skills - </h1>
      <div
        className={`flex flex-wrap items-center text-yellow-400 gap-1 w-full  p-2 mb-1 ${
          !fromEdit && "bg-slate-950"
        } rounded-lg shadow-yellow-400`}
      >
        {skills?.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center bg-gray-700 text-slate-50 rounded-full px-3 py-1 font-serif text-lg max-md:px-2 ${
              fromEdit && "bg-gray-400 text-yellow-400"
            }`}
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className={`ml-2 text-yellow-400 hover:text-red-500 ${fromEdit && 'text-yellow-500'}`}
            >
              <MdClose className="text-2xl max-md:text-xl" />
            </button>
          </div>
        ))}

        <input
          type="text"
          value={skillInput}
          onChange={handleSkillInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill"
          className="flex-grow text-xl text-yellow-400  font-serif bg-transparent outline-none"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="relative w-full">
          <div className="absolute top-0 w-3/5 bg-gray-800 rounded-md border border-yellow-400 p-2 text-yellow-400 z-10">
            {suggestions?.map((suggestion, index) => (
              <div
                key={suggestion.id}
                onClick={() => addSkill(suggestion.name)}
                className={`cursor-pointer p-1 hover:bg-slate-500 rounded-md ${
                  index === selectedIndex ? "bg-slate-700" : ""
                }`}
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
