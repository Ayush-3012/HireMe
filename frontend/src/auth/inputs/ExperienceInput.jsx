import { useState } from "react";

const ExperienceInput = () => {
  const [experience, setExperience] = useState([{}]);

  const handleExperienceChange = (index, event) => {
    const { name, value } = event.target;
    const newExperience = experience.slice();
    newExperience[index] = { ...newExperience[index], [name]: value };
    setExperience(newExperience);
  };

  const addExperience = () => {
    setExperience([...experience, {}]);
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  return (
    <div>
      {experience.map((exp, index) => (
        <div key={index}>
          <input
            type="text"
            name="company"
            value={exp.company || ""}
            onChange={(event) => handleExperienceChange(index, event)}
            placeholder="Company"
          />
          <input
            type="text"
            name="role"
            value={exp.role || ""}
            onChange={(event) => handleExperienceChange(index, event)}
            placeholder="Role"
          />
          <input
            type="text"
            name="duration"
            value={exp.duration || ""}
            onChange={(event) => handleExperienceChange(index, event)}
            placeholder="Duration"
          />
          <button type="button" onClick={() => removeExperience(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addExperience}>
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceInput;
