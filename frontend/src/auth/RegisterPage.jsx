import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import EmployerRegisterForm from "./EmployerRegisterForm";
import EmployeeRegisterForm from "./EmployeeRegisterForm";

const RegisterPage = () => {
  const [registeringUser, setRegisteringUser] = useState(null);
  const { auth } = useAuthContext();

  return (
    <>
      <h1 className="text-xl">Hi, You Are?</h1>
      <div className="flex border-2 my-2 py-2 mx-4 rounded-md border-black justify-evenly">
        <button
          className="p-4 rounded-md bg-blue-600 text-white font-serif"
          onClick={() => {
            auth.setUserType("employer");
            // profile.setUserType("employer");
            setRegisteringUser("employer");
          }}
        >
          Company
        </button>
        <button
          className="border p-4 rounded-md bg-blue-600 text-white font-serif"
          onClick={() => {
            auth.setUserType("employee");
            setRegisteringUser("employee");
          }}
        >
          Job Seeker
        </button>
      </div>

      {registeringUser === "employer" && <EmployerRegisterForm />}
      {registeringUser === "employee" && <EmployeeRegisterForm />}
    </>
  );
};

export default RegisterPage;
