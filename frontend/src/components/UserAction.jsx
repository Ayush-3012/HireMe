import { useState } from "react";
import { useAllContext } from "../context/AuthContext";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";

const UserAction = () => {
  const [currentAction, onActionChange] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { auth } = useAllContext();

  let currentUser = auth.userType === "employer" ? "Company" : "Job Seeker";

  return (
    <>
      <div className="fixed inset-0 bg-slate-500 bg-opacity-70 flex my-12 mx-2 rounded-md  font-serif justify-center items-center">
        <div className="bg-slate-800 w-4/5 h-3/5 max-h-[90%] justify-center max-w-2xl p-6 rounded-lg flex flex-col items-center">
          <h1 className="text-3xl py-2 text-slate-200">
            YOU ARE -{" "}
            <span className="uppercase font-bold text-yellow-400">
              {currentUser}
            </span>{" "}
          </h1>
          <div className="flex items-center justify-around shadow-inner">
            <div
              className={`${
                showRegister ? "hidden" : ""
              } bg-gray-500 flex items-center justify-center px-10 m-2 py-2 rounded-lg group cursor-pointer transition-transform transform hover:scale-105`}
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
              } bg-yellow-400 flex items-center justify-center px-10 m-2 py-2 rounded-lg group cursor-pointer transition-transform transform hover:scale-105`}
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
          {currentAction === "login" && <LoginPage />}
          {currentAction === "register" && <RegisterPage />}
        </div>
      </div>
    </>
  );
};

export default UserAction;
