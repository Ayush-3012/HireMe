import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import NavLoutItem from "./navComponents/NavLoutItem";
import NavLinItem from "./navComponents/NavLinItem";

const Navbar = () => {
  const { auth } = useAuthContext();

  return (
    <>
      <div className="flex p-2 bg-green-400 rounded-md">
        <div className="text-3xl flex items-center justify-center bg-red-400 font-serif w-2/5 text-center">
          <Link to={"/home"}>HireMe</Link>
        </div>

        {!auth.user && <NavLoutItem />}
        {auth.user && <NavLinItem />}
      </div>
    </>
  );
};

export default Navbar;
