import { useState } from "react";
import { useAllContext } from "../context/AuthContext";

const EmployerRegisterForm = () => {
  const { auth } = useAllContext();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const handleERRegister = async (e) => {
    e.preventDefault();

    try {
      const user = {
        companyName,
        email,
        password,
        contactNumber: contact,
        location,
        industry,
        website,
        companyDescription: description,
      };

      await auth?.registerAuth(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full bg-purple-300 py-6 px-4">
      <form
        method="post"
        className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8"
        onSubmit={handleERRegister}
      >
        <h2 className="text-3xl font-serif font-bold text-center mb-6">
          Register Your Company
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="outline-none border border-gray-300 w-full p-3 rounded-md focus:border-blue-500"
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <input
              className="outline-none border border-gray-300 w-full p-3 rounded-md focus:border-blue-500"
              type="email"
              placeholder="Company Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="outline-none border border-gray-300 w-full p-3 rounded-md focus:border-blue-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="outline-none border border-gray-300 w-full p-3 rounded-md focus:border-blue-500"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="outline-none border border-gray-300 w-full p-3 rounded-md focus:border-blue-500"
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <input
              className="outline-none border border-gray-300 w-full p-3 rounded-md focus:border-blue-500"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="outline-none border border-gray-300 w-full p-3 rounded-md focus:border-blue-500"
              type="text"
              placeholder="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
            <input
              className="outline-none border border-gray-300 w-full p-3 rounded-md focus:border-blue-500"
              type="text"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
          <textarea
            className="outline-none border border-gray-300 w-full p-3 rounded-md focus:border-blue-500 h-32 resize-none"
            type="text"
            placeholder="Company Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 py-3 rounded-md text-2xl font-serif text-white transition-transform transform hover:scale-105 duration-150"
          >
            Register My Company
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployerRegisterForm;
