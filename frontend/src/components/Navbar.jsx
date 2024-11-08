import { Link } from "react-router-dom";
import { useAllContext } from "../context/AuthContext";
import NavLoutItem from "./navComponents/NavLoutItem";
import NavLinItem from "./navComponents/NavLinItem";

const Navbar = () => {
  const { auth } = useAllContext();

  return (
    <>
      <div className="flex justify-between bg-green-400 ">
        <div className="text-2xl bg-red-300 flex-1 flex items-center justify-center  font-serif text-center">
          {<Link to={auth?.user ? "/home" : "/"}>HireMe</Link>}
        </div>

        <div className="flex-1 bg-blue-300">
          {auth.user ? <NavLinItem /> : <NavLoutItem />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
