/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAllContext } from "../context/AuthContext";

const UserAction = ({ onActionChange }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { auth } = useAllContext();

  let currentUser = auth.userType === "employer" ? "Company" : "Job Seeker";

  return (
    <div className="flex flex-col mx-2 my-4 rounded-lg font-serif bg-purple-900 shadow-lg justify-center items-center">
      <h1 className="text-3xl py-2 text-slate-200">
        THIS IS{" "}
        <span className="uppercase font-bold text-yellow-400">
          {currentUser}
        </span>{" "}
        ACTION
      </h1>
      <div className="flex items-center justify-around shadow-inner">
        <div
          className={`${
            showRegister ? "hidden" : ""
          } bg-blue-500 flex items-center justify-center px-10 m-2 py-2 rounded-lg group cursor-pointer transition-transform transform hover:scale-105`}
          onClick={() => {
            setShowRegister(true);
            setShowLogin(false);
            onActionChange("register");
          }}
        >
          <p className="text-xl text-white font-medium group-hover:scale-110 transition duration-200 ease-in-out">
            Register {currentUser}
          </p>
        </div>
        <div
          className={`${
            showLogin ? "hidden" : ""
          } bg-red-500 flex items-center justify-center px-10 m-2 py-2 rounded-lg group cursor-pointer transition-transform transform hover:scale-105`}
          onClick={() => {
            setShowLogin(true);
            setShowRegister(false);
            onActionChange("login");
          }}
        >
          <p className="text-xl text-white font-medium group-hover:scale-110 transition duration-200 ease-in-out">
            Log In {currentUser}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAction;
