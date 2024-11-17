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
  return (
    <div className="shadow-[2px_2px_10px] rounded-lg shadow-yellow-400 flex flex-col gap-2 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 ">
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none"
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none "
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none"
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-between items-center">
        <input
          className="bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] rounded-lg p-3 w-full outline-none"
          type="text"
          placeholder="Resume Link"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default BasicInput;
