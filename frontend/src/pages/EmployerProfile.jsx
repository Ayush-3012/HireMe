/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";
import { useAllContext } from "../context/HireMeContext";
import { enqueueSnackbar } from "notistack";
import { FaIndustry, FaLocationDot } from "react-icons/fa6";
import { IoCall, IoMail } from "react-icons/io5";
import { TbWorldWww } from "react-icons/tb";
import { TiBriefcase } from "react-icons/ti";
import { MdDescription, MdOutlineEditLocation } from "react-icons/md";
import JobCard from "../components/JobCard";

const EmployerProfile = ({ employerProfile, fromViewEmployerProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState(employerProfile.companyName);
  const [description, setDescription] = useState(
    employerProfile.companyDescription
  );
  const [email, setEmail] = useState(employerProfile.email);
  const [contact, setContact] = useState(employerProfile.contactNumber);
  const [location, setLocation] = useState(employerProfile.location);
  const [industry, setIndustry] = useState(employerProfile.industry);
  const [website, setWebsite] = useState(employerProfile.website);

  const { profile } = useAllContext();

  const validateForm = () => {
    if (!companyName) return "Company name is required.";
    if (!email) return "Email is required.";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return "Invalid email format.";
    if (!contact) return "Contact number is required.";
    if (!/^\d{10}$/.test(contact)) return "Contact number must be 10 digits.";
    if (!location) return "Location is required.";
    if (!industry) return "Industry is required.";
    if (!website) return "Website is required.";
    if (!/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(website))
      return "Invalid website URL.";
    if (!description) return "Company description is required.";
    return null;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

    try {
      if (
        employerProfile.companyName !== companyName ||
        employerProfile.email !== email ||
        employerProfile.contactNumber !== contact ||
        employerProfile.location !== location ||
        employerProfile.industry !== industry
      ) {
        const user = {
          companyName,
          email,
          industry,
          contactNumber: contact,
          location,
        };
        await profile?.saveProfile(user);
        enqueueSnackbar("Employer Profile Saved", { variant: "success" });
        await profile?.fetchProfile("employer");
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto font-serif p-6">
      {isEditing ? (
        <motion.form
          method="post"
          onSubmit={handleSaveProfile}
          className="p-6 shadow-[1px_1px_10px] shadow-slate-400 rounded-xl text-yellow-400 space-y-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
        >
          <div className="text-center text-3xl font-bold mb-4">
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex gap-1 items-center mb-1 font-semibold">
                <IoCall /> Contact Number
              </label>
              <input
                type="text"
                className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div>
              <label className="flex gap-1 items-center mb-1 font-semibold">
                <IoMail /> Email
              </label>
              <input
                type="email"
                className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="flex gap-1 items-center mb-1 font-semibold">
                <MdOutlineEditLocation /> Location
              </label>
              <input
                type="text"
                className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 font-semibold flex gap-1 items-center">
                <FaIndustry /> Industry
              </label>
              <input
                type="text"
                className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="flex gap-1 items-center mb-1 font-semibold">
              <TbWorldWww /> Website
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <label className="flex gap-1 items-center mb-1 font-semibold">
              <MdDescription /> Description
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="text-center flex gap-4 items-center justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-slate-700 text-yellow-300 hover:shadow-[1px_1px_5px] hover:shadow-yellow-400 rounded-md hover:bg-slate-900 hover:scale-x-110 transition-all duration-150 ease-in-out"
            >
              Save Profile
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-yellow-300 rounded-md hover:bg-red-600 hover:scale-x-110 transition-all duration-150 ease-in-out"
              onClick={() => setIsEditing(!isEditing)}
            >
              Cancel
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.div
          className="p-6 rounded-xl shadow-[1px_1px_10px] shadow-slate-400 text-yellow-400"
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
        >
          <div className="text-center text-3xl font-bold mb-4 max-sm:text-2xl">
            {employerProfile.companyName}
          </div>
          <div className="grid grid-cols- sm:grid-cols-2 gap-4 max-sm:gap-2">
            <p>
              <strong className="flex items-center gap-1">
                <IoCall className="text-lg" /> Contact Number:{" "}
                <span className="font-light">
                  {employerProfile.contactNumber}
                </span>
              </strong>
            </p>
            <p>
              <strong className="flex items-center gap-1">
                <IoMail className="text-lg" /> Email:{" "}
                <span className="font-light">{employerProfile.email}</span>
              </strong>
            </p>
            <p>
              <strong className="flex items-center gap-1">
                <FaLocationDot /> Location:{" "}
                <span className="font-light">{employerProfile.location}</span>
              </strong>
            </p>
            <p>
              <strong className="flex items-center gap-1">
                <FaIndustry className="text-lg" /> Industry:{" "}
                <span className="font-light">{employerProfile.industry}</span>
              </strong>
            </p>
            <p>
              <strong className="flex items-center gap-1">
                <TbWorldWww /> Website:{" "}
                <a
                  href={employerProfile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline hover:text-yellow-200"
                >
                  {employerProfile.companyName}
                </a>
              </strong>
            </p>
            <p>
              <strong className="flex items-center gap-1">
                <TiBriefcase className="text-xl" /> Total Jobs Posted:{" "}
                <span className="font-light text-xl">
                  {employerProfile?.jobsPosted?.length}
                </span>
              </strong>
            </p>
          </div>
          <div className="border-b-2 border-yellow-400">
            <p className="">
              <strong className="flex flex-col my-2 gap-1">
                <div className="flex">
                  <MdDescription className="text-xl" /> Description:{" "}
                </div>
                <span className="font-light text-xl mx-10">
                  {employerProfile?.companyDescription}
                </span>
              </strong>
            </p>
          </div>
          {fromViewEmployerProfile && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-center my-4 max-md:text-xl">
                  All Jobs by {employerProfile.companyName}
                </h2>
                {employerProfile?.jobsPosted?.length === 0 ? (
                  <p className="text-yellow-400">
                    No jobs posted yet. Post your first job.
                  </p>
                ) : (
                  <div className="flex gap-4 w-fit max-w-full px-2 py-3 overflow-x-auto max-md:gap-2 max-md:px-1">
                    {employerProfile?.jobsPosted?.map((jobId) => (
                      <JobCard key={jobId} jobId={jobId} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          {!fromViewEmployerProfile && (
            <div className="text-center mt-6">
              <button
                className="px-6 py-2 bg-slate-700 text-yellow-300 rounded-md hover:bg-slate-900 hover:shadow-[1px_1px_5px] hover:shadow-yellow-400 hover:scale-x-110 transition-all duration-150 ease-in-out"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default EmployerProfile;
