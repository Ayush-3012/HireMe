import { useState } from "react";
import { useAllContext } from "../../context/AuthContext";

const NavLoutItem = () => {
  const [showEmployer, setShowEmployer] = useState(true);
  const [showEmployee, setShowEmployee] = useState(true);

  const { auth } = useAllContext();
  return (
    <>
      <div className="flex bg-blue-400 justify-evenly w-3/5 font-serif py-1">
        {showEmployer && (
          <div
            className="bg-red-200 px-8 py-1 rounded-md group cursor-pointer"
            onClick={() => {
              auth.setUserType("employer");
              setShowEmployer(false);
              setShowEmployee(true);
            }}
          >
            <p className="text-2xl group-hover:text-white group-hover:scale-110 transition duration-200 ease-in-out">
              Company
            </p>
          </div>
        )}
        {showEmployee && (
          <div
            className="bg-green-200 px-8 py-1 rounded-md group cursor-pointer"
            onClick={() => {
              auth.setUserType("employee");
              setShowEmployee(false);
              setShowEmployer(true);
            }}
          >
            <p className="text-2xl group-hover:text-white group-hover:scale-110 transition duration-200 ease-in-out">
              Job Seeker
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default NavLoutItem;
