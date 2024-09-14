import { useState } from "react";
const EducationInput = () => {
  const [education, setEducation] = useState([{}]);

  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const newEducation = education.slice();
    newEducation[index] = { ...newEducation[index], [name]: value };
    setEducation(newEducation);
  };

  const addEducation = () => {
    setEducation([...education, {}]);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  return (
    <div>
      {education.map((edu, index) => (
        <div key={index}>
          <input
            type="text"
            name="institution"
            value={edu.institution || ""}
            onChange={(event) => handleEducationChange(index, event)}
            placeholder="Institution"
          />
          <input
            type="text"
            name="degree"
            value={edu.degree || ""}
            onChange={(event) => handleEducationChange(index, event)}
            placeholder="Degree"
          />
          <input
            type="text"
            name="year"
            value={edu.year || ""}
            onChange={(event) => handleEducationChange(index, event)}
            placeholder="Year"
          />
          <button type="button" onClick={() => removeEducation(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addEducation}>
        Add Education
      </button>
    </div>
  );
};

export default EducationInput;
