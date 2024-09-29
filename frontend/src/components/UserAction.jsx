/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const UserAction = ({ onActionChange }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { auth } = useAuthContext();

  let currentUser = auth.userType === "employer" ? "Company" : "Job Seeker";
  return (
    <>
      <div className=" flex flex-col mx-1 my-2 rounded-md font-serif bg-purple-800 w-full justify-center items-center">
        <h1 className="text-4xl py-4 text-slate-200">
          THIS IS <span className="uppercase">{currentUser}</span> ACTION
        </h1>
        <div className="flex py-8 bg-lime-400 w-4/5 rounded-md items-center justify-around">
          <div
            className={`${
              showRegister ? "hidden" : ""
            } bg-blue-200 flex items-center justify-center px-16 mx-4 py-4 rounded-md group cursor-pointer`}
            onClick={() => {
              setShowRegister(true);
              setShowLogin(false);
              onActionChange("register");
            }}
          >
            <p className="text-4xl group-hover:text-white group-hover:scale-110 transition duration-200 ease-in-out">
              Register {currentUser}
            </p>
          </div>
          <div
            className={`${
              showLogin ? "hidden" : ""
            } bg-red-200 flex items-center justify-center px-16 mx-4 py-4 rounded-md group cursor-pointer`}
            onClick={() => {
              setShowLogin(true);
              setShowRegister(false);
              onActionChange("login");
            }}
          >
            <p className="text-4xl group-hover:text-white group-hover:scale-110 transition duration-200 ease-in-out">
              Log In {currentUser}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAction;
