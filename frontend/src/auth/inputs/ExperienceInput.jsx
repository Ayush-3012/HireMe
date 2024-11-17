/* eslint-disable react/prop-types */
import { IoAddCircle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

const ExperienceInput = ({ experience, setExperience, fromEdit }) => {
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
    <div className="flex flex-col items-center gap-4 ">
      {experience.map((exp, index) => (
        <div
          key={index}
          className={`flex items-start p-4 shadow-[2px_2px_10px] rounded-lg shadow-yellow-400 w-full gap-4 ${
            fromEdit ? "bg-inherit" : "bg-slate-800"
          }`}
        >
          <div className="flex flex-col gap-3 w-full">
            <input
              type="text"
              name="jobTitle"
              className={`bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none`}
              value={exp.jobTitle || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Job Role"
            />
            <input
              type="text"
              name="companyName"
              className={`bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none `}
              value={exp.companyName || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Company"
            />

            <input
              type="text"
              name="duration"
              className={`bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none `}
              value={exp.duration || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Duration"
            />
            <textarea
              type="text"
              name="description"
              className={`bg-gray-600 text-yellow-400 resize-none focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none `}
              value={exp.description || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Description"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={() => removeExperience(index)}
            title="Remove Experience"
            className="text-yellow-500 text-4xl hover:text-red-500 transition duration-200 ease-in-out"
          >
            <MdDeleteForever />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addExperience}
        title="Add New Experience"
        className="text-yellow-500 text-4xl hover:text-green-400 transition duration-200 ease-in-out"
      >
        <IoAddCircle />
      </button>
    </div>
  );
};

export default ExperienceInput;
