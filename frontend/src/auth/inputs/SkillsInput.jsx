import { useState } from 'react';

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
    <div>
      {skills.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            value={skill}
            onChange={(event) => handleSkillChange(index, event)}
            placeholder="Skill"
          />
          <button type="button" onClick={() => removeSkill(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addSkill}>Add Skill</button>
    </div>
  );
};

export default SkillsInput;
