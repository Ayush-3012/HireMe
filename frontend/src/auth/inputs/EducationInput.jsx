import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
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
    <div className="flex flex-col gap-4 justify-center h-fit items-center">
      {education.map((edu, index) => (
        <div key={index} className="flex py-4">
          <div className="flex flex-col gap-2 w-80">
            <input
              type="text"
              name="institution"
              className="p-2 font-serif text-xl outline"
              value={edu.institution || ""}
              onChange={(event) => handleEducationChange(index, event)}
              placeholder="Institution"
            />
            <input
              type="text"
              name="degree"
              className="p-2 font-serif text-xl outline"
              value={edu.degree || ""}
              onChange={(event) => handleEducationChange(index, event)}
              placeholder="Degree"
            />
            <input
              type="text"
              name="year"
              className="p-2 font-serif text-xl outline"
              value={edu.year || ""}
              onChange={(event) => handleEducationChange(index, event)}
              placeholder="Year"
            />
          </div>
          <button type="button" onClick={() => removeEducation(index)}>
            <MdDeleteForever className="text-4xl text-red-600" />
          </button>
        </div>
      ))}
      <button type="button" onClick={addEducation}>
        <IoAddCircle className="text-4xl text-green-600" />
      </button>
    </div>
  );
};

export default EducationInput;
