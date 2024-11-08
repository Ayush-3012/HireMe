/* eslint-disable react/prop-types */
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
    <div className="flex flex-col items-center gap-4 w-full">
      {education.map((edu, index) => (
        <div
          key={index}
          className="flex items-start p-4 border border-gray-300 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2 gap-4 bg-white"
        >
          <div className="flex flex-col gap-3 w-full">
            <input
              type="text"
              name="institution"
              className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              value={edu.institution || ""}
              onChange={(event) => handleEducationChange(index, event)}
              placeholder="Institution"
            />
            <input
              type="text"
              name="degree"
              className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              value={edu.degree || ""}
              onChange={(event) => handleEducationChange(index, event)}
              placeholder="Degree"
            />
            <input
              type="text"
              name="year"
              className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              value={edu.year || ""}
              onChange={(event) => handleEducationChange(index, event)}
              placeholder="Year"
            />
          </div>
          <button
            type="button"
            onClick={() => removeEducation(index)}
            title="Remove Education"
            className="text-red-600 text-3xl hover:text-red-800 transition duration-200 ease-in-out"
          >
            <MdDeleteForever />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addEducation}
        title="Add New Education"
        className="text-green-600 text-4xl mt-4 hover:text-green-800 transition duration-200 ease-in-out"
      >
        <IoAddCircle />
      </button>
    </div>
  );
};

export default EducationInput;
