import { Link } from "react-router-dom";
import { useAllContext } from "../context/AuthContext";
import NavLoutItem from "./navComponents/NavLoutItem";
import NavLinItem from "./navComponents/NavLinItem";

const Navbar = () => {
  const { auth } = useAllContext();

  return (
    <>
      <div className="bg-slate-800 fixed shadow-sm shadow-yellow-400 top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center px-4 py-2 mb-1 max-md:flex-col">
          <div className="text-3xl font-serif max-md:text-2xl">
            <Link
              to={auth?.user ? "/home" : "/"}
              className="text-yellow-400 font-bold hover:text-yellow-300 transition"
            >
              HireMe
            </Link>
          </div>

          <div className="">{auth.user ? <NavLinItem /> : <NavLoutItem />}</div>
        </div>
      </div>
      <div className="h-[70px] max-md:h-[96px]"></div>
    </>
  );
};

export default Navbar;
