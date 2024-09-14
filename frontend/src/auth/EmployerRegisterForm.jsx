import { useState } from "react";

const EmployerRegisterForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <div className="flex items-center justify-center w-full border-4">
        <form method="post">
          <div className="flex m-4 justify-center flex-col gap-4 p-4 border-4 border-black">
            <div className=" flex justify-evenly gap-4">
              <input
                className="outline w-96 p-2 font-serif text-xl "
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              <input
                className="outline w-96 p-2 font-serif text-xl "
                type="email"
                placeholder="Company Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className=" flex justify-evenly gap-4">
              <input
                className="outline w-96 p-2 font-serif text-xl "
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="outline w-96 p-2 font-serif text-xl "
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className=" flex justify-evenly gap-4">
              <input
                className="outline w-96 p-2 font-serif text-xl  "
                type="text"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <input
                className="outline w-96 p-2 font-serif text-xl  "
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-evenly gap-4">
              <input
                className="outline w-96 p-2 font-serif text-xl  "
                type="text"
                placeholder="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
              />
              <input
                className="outline w-96 p-2 font-serif text-xl  "
                type="text"
                placeholder="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
              />
            </div>
            <textarea
              className="outline p-2 font-serif text-xl flex items-center justify-center"
              type="text"
              placeholder="Company Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 py-4 text-2xl font-serif text-white hover:text-3xl transition-all duration-150"
            >
              Register My Company
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployerRegisterForm;
