import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-4 border justify-evenly text-2xl font-serif py-2">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
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
