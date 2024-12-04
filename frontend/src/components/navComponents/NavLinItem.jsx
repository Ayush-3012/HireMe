import { Link, useNavigate } from "react-router-dom";
import { useAllContext } from "../../context/AuthContext";
import { enqueueSnackbar } from "notistack";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";

const NavLinItem = () => {
  const navigate = useNavigate();
  const { auth } = useAllContext();
  return (
    <>
      <div className="flex gap-4 justify-evenly w-full font-serif py-1 max-md:gap-3">
        <Link
          to={"/userProfile"}
          className="bg-gray-600 text-xl text-yellow-300 hover:text-yellow-400 px-8 hover:bg-slate-950 hover:scale-110 transition duration-200 ease-in-out py-1 rounded-md flex items-center justify-center group cursor-pointer max-md:px-6 max-sm:px-4 max-md:text-sm"
        >
          <FaUserCircle className="md:hidden text-xl" />
          <span className="max-md:hidden">My Profile</span>
        </Link>
        <Link
          to={"/chats"}
          className="bg-gray-600 text-xl text-yellow-300 hover:text-yellow-400 px-8 hover:bg-slate-950 hover:scale-110 transition duration-200 ease-in-out py-1 rounded-md flex items-center justify-center cursor-pointer max-md:px-6 max-sm:px-4 max-md:text-sm"
        >
          <BsChatSquareDotsFill className="md:hidden text-xl" />
          <span className="max-md:hidden">Chats</span>
        </Link>
        <div
          className="bg-gray-600 text-xl text-yellow-300 hover:text-yellow-400 px-8 hover:bg-slate-950 hover:scale-110 transition duration-200 ease-in-out py-1 rounded-md flex items-center justify-center group cursor-pointer max-md:px-6 max-sm:px-4 max-md:text-sm"
          onClick={async () => {
            const res = await auth?.logoutAuth();
            res.status === 200 &&
              enqueueSnackbar(res.data.message, { variant: "success" });
            navigate("/");
          }}
        >
          <RiLogoutBoxRFill className="md:hidden text-xl" />
          <span className="max-md:hidden">Logout</span>
        </div>
      </div>
    </>
  );
};

export default NavLinItem;
