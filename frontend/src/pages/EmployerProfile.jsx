/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAllContext } from "../context/AuthContext";
import { enqueueSnackbar } from "notistack";
import { FaLocationDot } from "react-icons/fa6";

const EmployerProfile = ({ employerProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState(employerProfile.companyName);
  const [email, setEmail] = useState(employerProfile.email);
  const [contact, setContact] = useState(employerProfile.contactNumber);
  const [location, setLocation] = useState(employerProfile.location);
  const [industry, setIndustry] = useState(employerProfile.industry);
  const [website, setWebsite] = useState(employerProfile.website);

  const { profile } = useAllContext();

  const handleSaveProfile = async (e) => {
    e.preventDefault();

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
        <form
          method="post"
          onSubmit={handleSaveProfile}
          className="p-6 shadow-[1px_1px_10px] shadow-slate-400 rounded-xl text-yellow-400 space-y-6"
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
              <label className="block mb-1 font-semibold">Contact Number</label>
              <input
                type="text"
                className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Location</label>
              <input
                type="text"
                className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Industry</label>
              <input
                type="text"
                className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Website</label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-700 text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
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
        </form>
      ) : (
        <div className="p-6 rounded-xl shadow-[1px_1px_10px] shadow-slate-400 text-yellow-400">
          <div className="text-center text-3xl font-bold mb-4 max-sm:text-2xl">
            {employerProfile.companyName}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-sm:gap-2">
            <p>
              <strong>Contact Number:</strong> {employerProfile.contactNumber}
            </p>
            <p>
              <strong>Email:</strong> {employerProfile.email}
            </p>
            <p>
              <strong><FaLocationDot /> Location:</strong> {employerProfile.location}
            </p>
            <p>
              <strong>Industry:</strong> {employerProfile.industry}
            </p>
          </div>
          <div className="mt-4 max-sm:mt-2">
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={employerProfile.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                {employerProfile.website}
              </a>
            </p>
          </div>
          <div className="text-center mt-6">
            <button
              className="px-6 py-2 bg-slate-700 text-yellow-300 rounded-md hover:bg-slate-900 hover:shadow-[1px_1px_5px] hover:shadow-yellow-400 hover:scale-x-110 transition-all duration-150 ease-in-out"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerProfile;
