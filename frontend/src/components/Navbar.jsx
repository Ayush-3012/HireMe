import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth?.logoutAuth();
    navigate("/");
  };
  return (
    <nav>
      <ul className="flex gap-4 border justify-evenly text-2xl font-serif py-2">
        {!auth?.user && <Link to={"/login"}>Login</Link>}
        {!auth?.user && <Link to="/register">Register</Link>}
        {auth?.user && <Link to={"/userProfile"}>My Profile</Link>}
        {auth?.user && <button onClick={() => handleLogout()}>Logout</button>}

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
