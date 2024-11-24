import { useState } from "react";
import { useAllContext } from "../../context/AuthContext";

const NavLoutItem = () => {
  const [showEmployer, setShowEmployer] = useState(true);
  const [showEmployee, setShowEmployee] = useState(true);

  const { auth } = useAllContext();
  return (
    <>
      <div className="flex gap-4 justify-evenly w-full font-serif py-1">
        {showEmployer && (
          <div
            className="bg-gray-600 text-yellow-300 px-8 py-1 rounded-md flex items-center justify-center group cursor-pointer max-md:px-6 max-sm:px-4"
            onClick={() => {
              auth.setUserType("employer");
              setShowEmployer(false);
              setShowEmployee(true);
            }}
          >
            <p className="text-xl group-hover:text-yellow-500 group-hover:scale-110 transition duration-200 ease-in-out max-sm:text-sm">
              Company
            </p>
          </div>
        )}
        {showEmployee && (
          <div
            className="bg-gray-600 text-yellow-300 px-8 py-1 rounded-md flex items-center justify-center group cursor-pointer max-md:px-6 max-sm:px-4"
            onClick={() => {
              auth.setUserType("employee");
              setShowEmployee(false);
              setShowEmployer(true);
            }}
          >
            <p className="text-xl group-hover:text-yellow-500 group-hover:scale-110 transition duration-200 ease-in-out max-sm:text-sm">
              Job Seeker
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default NavLoutItem;
