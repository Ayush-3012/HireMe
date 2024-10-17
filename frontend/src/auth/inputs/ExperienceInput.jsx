/* eslint-disable react/prop-types */
import { IoAddCircle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

const ExperienceInput = ({experience, setExperience}) => {

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
    <div className="flex flex-col gap-2 justify-center h-fit items-center ">
      {experience.map((exp, index) => (
        <div key={index} className="flex py-4">
          <div className="flex flex-col gap-2 w-80">
            <input
              type="text"
              name="company"
              className="p-2 font-serif text-xl outline"
              value={exp.company || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Company"
            />
            <input
              type="text"
              name="role"
              className="p-2 font-serif text-xl outline"
              value={exp.role || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Role"
            />
            <input
              type="text"
              name="duration"
              className="p-2 font-serif text-xl outline"
              value={exp.duration || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Duration"
            />
          </div>
          <button type="button" onClick={() => removeExperience(index)}>
            <MdDeleteForever className="text-4xl text-red-600" />
          </button>
        </div>
      ))}
      <button type="button" onClick={addExperience}>
        <IoAddCircle className="text-4xl text-green-600" />
      </button>
    </div>
  );
};

export default ExperienceInput;
