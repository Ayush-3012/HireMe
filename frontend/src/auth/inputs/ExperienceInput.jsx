/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
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
    <motion.div
      className="flex rounded-md flex-col items-center gap-4 shadow-yellow-400 shadow-[2px_2px_10px] p-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      <h1 className="text-xl text-yellow-400 font-medium self-start">
        Experience -{" "}
      </h1>
      {experience.map((exp, index) => (
        <div
          key={index}
          className={`flex items-start p-4 shadow-[2px_2px_10px] rounded-lg shadow-yellow-400 w-full gap-4 max-md:gap-2 max-md:p-2 ${
            fromEdit ? "bg-inherit" : "bg-slate-800"
          }`}
        >
          <div className="flex flex-col gap-3 w-full max-md:gap-2">
            <input
              type="text"
              name="jobTitle"
              className={`bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none max-md:p-2`}
              value={exp.jobTitle || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Job Role"
            />
            <input
              type="text"
              name="companyName"
              className={`bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none max-md:p-2`}
              value={exp.companyName || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Company"
            />

            <input
              type="text"
              name="duration"
              className={`bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none max-md:p-2`}
              value={exp.duration || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Duration"
            />
            <textarea
              type="text"
              name="description"
              className={`bg-gray-600 text-yellow-400 resize-none focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none max-md:p-2`}
              value={exp.description || ""}
              onChange={(event) => handleExperienceChange(index, event)}
              placeholder="Description"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={() => removeExperience(index)}
            title="Remove Experience"
            className="text-yellow-500 text-4xl hover:text-red-500 transition duration-200 ease-in-out max-md:text-3xl max-sm:text-2xl"
          >
            <MdDeleteForever />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addExperience}
        title="Add New Experience"
        className="text-yellow-500 text-4xl hover:text-green-400 transition duration-200 ease-in-out max-md:text-3xl max-sm:text-2xl"
      >
        <IoAddCircle />
      </button>
    </motion.div>
  );
};

export default ExperienceInput;
