import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const auth = useAuthContext();

  const handleLogout = async () => {
    await auth?.logoutAuth();
  };
  return (
    <nav>
      <ul className="flex gap-4 border justify-evenly text-2xl font-serif py-2">
        <Link to={"/"}>Home</Link>
        <Link to={"/login"}>Login</Link>
        <Link to="/register">Register</Link>
        <Link to={"/userProfile"}>My Profile</Link>
        <button onClick={() => handleLogout()}>Logout</button>

        {/*    <li>
              <Link to="/employee/profile">Employee Profile</Link>
            </li>
            <li>
              <Link to="/employer/profile">Employer Profile</Link>
            </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
