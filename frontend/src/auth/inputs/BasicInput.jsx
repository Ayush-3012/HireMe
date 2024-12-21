import { useState } from "react";
import { motion } from "framer-motion";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";

/* eslint-disable react/prop-types */
const BasicInput = ({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  contact,
  setContact,
  location,
  setLocation,
  resumeUrl,
  setResumeUrl,
}) => {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  return (
    <motion.div
      className="shadow-[2px_2px_10px] rounded-lg shadow-yellow-400 flex flex-col gap-2 p-4 max-md:p-2 max-md:gap-1"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      <h1 className="text-xl text-yellow-400 font-medium self-start">
        Profile -{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-md:gap-1">
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none max-md:p-2"
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none max-md:p-2"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-md:gap-1">
        <div className="relative flex items-center justify-center">
          <input
            className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none max-md:p-2"
            type={`${viewPassword ? "text" : "password"}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {viewPassword ? (
            <FaEyeSlash
              className="text-2xl text-yellow-300 absolute right-2 cursor-pointer transition duration-150 hover:text-yellow-400 hover:-translate-y-1"
              onClick={() => setViewPassword(!viewPassword)}
            />
          ) : (
            <FaRegEye
              className="text-2xl text-slate-300 absolute right-2  cursor-pointer transition duration-150 hover:text-yellow-400 hover:-translate-y-1"
              onClick={() => setViewPassword(!viewPassword)}
            />
          )}
        </div>
        <div className="flex items-center justify-center relative">
          <input
            className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none max-md:p-2"
            type={`${viewConfirmPassword ? "text" : "password"}`}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {viewConfirmPassword ? (
            <FaEyeSlash
              className="text-2xl text-yellow-300 absolute right-2 cursor-pointer transition duration-150 hover:text-yellow-400 hover:-translate-y-1"
              onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
            />
          ) : (
            <FaRegEye
              className="text-2xl text-slate-300 absolute right-2  cursor-pointer transition duration-150 hover:text-yellow-400 hover:-translate-y-1"
              onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-md:gap-1">
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none max-md:p-2"
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none max-md:p-2"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none max-md:p-2"
          type="text"
          placeholder="Resume Link"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
        />
      </div>
    </motion.div>
  );
};

export default BasicInput;
