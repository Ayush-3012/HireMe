/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { IoAddCircle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

const EducationInput = ({ education, setEducation }) => {
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
    <motion.div
      className="flex flex-col rounded-md items-center gap-4 shadow-yellow-400 shadow-[2px_2px_10px] p-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      <h1 className="text-xl text-yellow-400 font-medium self-start">
        Education -{" "}
      </h1>
      {education.map((edu, index) => (
        <div
          key={index}
          className={`flex items-start p-4 shadow-[1px_1px_10px] rounded-lg shadow-yellow-400 w-full gap-4 max-md:p-2 max-md:gap-2
          `}
        >
          <div className="flex flex-col gap-3 w-full max-md:gap-2">
            <input
              type="text"
              name="degree"
              className={`bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none max-md:p-2`}
              value={edu.degree || ""}
              onChange={(event) => handleEducationChange(index, event)}
              placeholder="Degree"
            />
            <input
              type="text"
              name="institution"
              className={`text-yellow-400 bg-gray-600 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none max-md:p-2`}
              value={edu.institution || ""}
              onChange={(event) => handleEducationChange(index, event)}
              placeholder="Institution/Board"
            />
            <input
              type="text"
              name="yearOfGraduation"
              className={`bg-slate-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none max-md:p-2`}
              value={edu.yearOfGraduation || ""}
              onChange={(event) => handleEducationChange(index, event)}
              placeholder="Completion Year"
            />
            <input
              type="text"
              name="grade"
              className={`bg-slate-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-md p-3 w-full outline-none max-md:p-2`}
              value={edu.grade || ""}
              onChange={(event) => handleEducationChange(index, event)}
              placeholder="Grade"
            />
          </div>
          <button
            type="button"
            onClick={() => removeEducation(index)}
            title="Remove Education"
            className="text-yellow-500 text-4xl hover:text-red-500 transition duration-200 ease-in-out max-md:text-3xl max-sm:text-2xl"
          >
            <MdDeleteForever />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addEducation}
        title="Add New Education"
        className="text-yellow-500 text-4xl hover:text-green-400 transition duration-200 ease-in-out max-md:text-3xl max-sm:text-2xl"
      >
        <IoAddCircle />
      </button>
    </motion.div>
  );
};

export default EducationInput;
