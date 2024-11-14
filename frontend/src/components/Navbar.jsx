import { Link } from "react-router-dom";
import { useAllContext } from "../context/AuthContext";
import NavLoutItem from "./navComponents/NavLoutItem";
import NavLinItem from "./navComponents/NavLinItem";

const Navbar = () => {
  const { auth } = useAllContext();

  return (
    <>
      <div className="flex justify-between mb-1">
        <div className="text-2xl bg-gray-800 flex-1 flex items-center justify-center  font-serif text-center">
          {
            <Link
              to={auth?.user ? "/home" : "/"}
              className="text-yellow-400 font-bold"
            >
              HireMe
            </Link>
          }
        </div>

        <div className="flex-1 bg-gray-700">
          {auth.user ? <NavLinItem /> : <NavLoutItem />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
