import { Link } from "react-router-dom";
import { useAllContext } from "../../context/AuthContext";

const NavLinItem = () => {
  const { auth } = useAllContext();
  return (
    <>
      <div className="flex bg-blue-400 justify-evenly w-3/5 font-serif py-1">
        <Link
          to={"/userProfile"}
          className="bg-red-200 px-8 py-1 rounded-md group cursor-pointer"
        >
          <p className="text-2xl group-hover:text-white group-hover:scale-110 transition duration-200 ease-in-out">
            My Profile
          </p>
        </Link>
        <Link
          to={"/chat/chatId"}
          className="bg-purple-300 px-8 py-1 rounded-md group cursor-pointer"
        >
          <p className="text-2xl group-hover:text-white group-hover:scale-110 transition duration-200 ease-in-out">
            Chat
          </p>
        </Link>
        <div
          className="bg-green-200 px-8 py-1 rounded-md group cursor-pointer"
          onClick={async () => await auth?.logoutAuth()}
        >
          <p className="text-2xl group-hover:text-white group-hover:scale-110 transition duration-200 ease-in-out">
            Logout
          </p>
        </div>
      </div>
    </>
  );
};

export default NavLinItem;
