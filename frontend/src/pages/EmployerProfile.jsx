/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAllContext } from "../context/AuthContext";

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isEditing && (
        <form method="post" onSubmit={handleSaveProfile}>
          <div className="flex flex-col p-4 text-slate-200 bg-zinc-600 m-4  font-serif shadow-md shadow-cyan-300 rounded-xl">
            <div className="flex items-center justify-center text-4xl font-bold">
              <input
                className="bg-inherit outline rounded-md text-center focus-outline outline-neutral-50"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="flex justify-around items-center my-2 py-2">
              <p className="flex gap-2 py-1 items-center">
                <strong>Contact Number:</strong>
                <input
                  className="bg-inherit outline rounded-sm p-0.5 focus-outline outline-neutral-50"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </p>
              <p className="flex gap-2 py-1 items-center">
                <strong>Email:</strong>
                <input
                  className="bg-inherit outline rounded-sm p-0.5 focus-outline outline-neutral-50"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p className="flex gap-2 py-1 items-center">
                <strong>Location:</strong>
                <input
                  className="bg-inherit outline rounded-sm p-0.5 focus-outline outline-neutral-50"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </p>

              <p className="flex gap-2 py-1 items-center">
                <strong>Industry:</strong>
                <input
                  className="bg-inherit outline rounded-sm p-0.5 focus-outline outline-neutral-50"
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </p>
            </div>

            <div className="flex my-1 items-center py-2 gap-2">
              <strong>Website:</strong>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="text-blue-400 px-2 outline outline-white outlin w-3/6  focus:border  focus:text-white bg-inherit"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 p-2 rounded-sm text-xl font-serif text-white hover:text-2xl transition-all duration-150"
              >
                Save Profile
              </button>
            </div>
          </div>
        </form>
      )}
      {!isEditing && (
        <div className="flex flex-col p-4 text-slate-200 bg-zinc-600 m-4  font-serif shadow-md shadow-cyan-300 rounded-xl">
          <div className="flex items-center justify-center text-4xl font-bold">
            <h1>{employerProfile.companyName}</h1>
          </div>
          <div className="flex justify-around items-center my-2 py-2">
            <p>
              <strong>Contact Number:</strong> {employerProfile.contactNumber}
            </p>
            <p>
              <strong>Email:</strong> {employerProfile.email}
            </p>
            <p>
              <strong>Location:</strong> {employerProfile.location}
            </p>
            <p>
              <strong>Location:</strong> {employerProfile.industry}
            </p>
          </div>

          <div className="flex my-1 py-2">
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={employerProfile.website}
                target="_blank"
                className="text-blue-400 hover:text-cyan-400"
              >
                Visit {employerProfile.companyName}
              </a>
            </p>
          </div>
        </div>
      )}

      {!isEditing && (
        <button
          className="bg-blue-700 p-2 w-fit rounded-md hover:bg-blue-900"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      )}
    </>
  );
};

export default EmployerProfile;
