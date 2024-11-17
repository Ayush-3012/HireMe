import { useEffect, useState } from "react";
import { useAllContext } from "../context/AuthContext";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

  useEffect(() => {
    auth?.userType === "employee" && navigate("/register/employee");
    auth?.userType === "employer" &&
      enqueueSnackbar("Registering as Company", { variant: "info" });
  }, [auth?.userType, navigate]);

  return (
    <div className="flex items-center font-serif justify-center w-full bg-gray-800 py-6 px-4">
      <form
        method="post"
        className="w-full max-w-3xl shadow-[2px_2px_10px] shadow-yellow-400 rounded-lg p-8"
        onSubmit={handleERRegister}
      >
        <h2 className="text-3xl text-yellow-400 font-bold text-center mb-6">
          Register Your Company
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <input
              className="outline-none bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] w-full p-3 rounded-md "
              type="email"
              placeholder="Company Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <input
              className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
              type="text"
              placeholder="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
            <input
              className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
              type="text"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
          <textarea
            className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] h-32 resize-none"
            type="text"
            placeholder="Company Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-slate-500 py-3 rounded-md text-2xl text-yellow-400 shadow-[2px_2px_10px] shadow-yellow-400  transition-all ease-in-out hover:scale-x-105 duration-200"
          >
            Register My Company
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployerRegisterForm;
