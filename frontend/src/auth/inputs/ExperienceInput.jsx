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
    <div className="flex flex-col items-center gap-4 w-full ">
      {experience.map((exp, index) => (
        <div
          key={index}
          className={`flex items-start p-4 border border-gray-300 rounded-lg shadow-md w-full md:w-3/4  gap-4 ${
            fromEdit ? "bg-inherit" : "bg-white"
          }`}
        >
          <div className="flex flex-col gap-3 w-full">
            <input
              type="text"
              name="jobTitle"
              className={`p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
                fromEdit && "bg-inherit"
              }`}
              value={exp.jobTitle || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Job Role"
            />
            <input
              type="text"
              name="companyName"
              className={`p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
                fromEdit && "bg-inherit"
              }`}
              value={exp.companyName || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Company"
            />

            <input
              type="text"
              name="duration"
              className={`p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
                fromEdit && "bg-inherit"
              }`}
              value={exp.duration || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Duration"
            />
            <textarea
              type="text"
              name="description"
              className={`p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
                fromEdit && "bg-inherit"
              }`}
              value={exp.description || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Description"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={() => removeExperience(index)}
            title="Remove Experience"
            className="text-white text-3xl hover:text-red-500 transition duration-200 ease-in-out"
          >
            <MdDeleteForever />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addExperience}
        title="Add New Experience"
        className="text-white text-4xl hover:text-green-400 transition duration-200 ease-in-out"
      >
        <IoAddCircle />
      </button>
    </div>
  );
};

export default ExperienceInput;
