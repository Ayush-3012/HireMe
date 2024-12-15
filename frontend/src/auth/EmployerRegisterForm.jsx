import { useEffect, useState } from "react";
import { useAllContext } from "../context/HireMeContext";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";

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

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!companyName) return "Company name is required.";
    if (!email) return "Email is required.";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return "Invalid email format.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
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

  const handleERRegister = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

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

      const res = await auth?.registerAuth(user);
      res?.status === 201
        ? (enqueueSnackbar(res?.data?.message, { variant: "success" }),
          navigate("/home"))
        : enqueueSnackbar(res.response.data.message, { variant: "error" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth?.userType === "employee" && navigate("/register/employee");
  }, [auth?.userType, navigate]);

  return (
    <div className="flex items-center font-serif justify-center w-full bg-gray-800 py-6 px-4">
      <form
        method="post"
        className="w-full max-w-3xl shadow-[2px_2px_10px] shadow-yellow-400 rounded-lg p-8"
        onSubmit={handleERRegister}
      >
        <h2 className="text-3xl text-yellow-400 font-bold text-center mb-6 max-md:text-2xl">
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
            />
            <input
              className="outline-none bg-gray-600 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] w-full p-3 rounded-md "
              type="email"
              placeholder="Company Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col md:flex-row gap-4">
            <div className="flex w-full justify-center items-center relative">
              <input
                className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
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
            <div className="flex w-full justify-center items-center relative">
              <input
                className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
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
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <input
              className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
              type="text"
              placeholder="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
            <input
              className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px]"
              type="text"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <textarea
            className="outline-none bg-gray-600 text-yellow-400 w-full p-3 rounded-md focus:shadow-yellow-400 focus:shadow-[1px_1px_5px] h-32 resize-none"
            type="text"
            placeholder="Company Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="bg-slate-500 py-3 rounded-md text-2xl text-yellow-400 shadow-[2px_2px_10px] shadow-yellow-400  transition-all ease-in-out hover:scale-x-105 duration-200 max-md:text-xl max-sm:text-lg"
          >
            Register My Company
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployerRegisterForm;
