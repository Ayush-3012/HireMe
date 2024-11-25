import { Link, useNavigate } from "react-router-dom";
import { useAllContext } from "../../context/AuthContext";
import { enqueueSnackbar } from "notistack";

const NavLinItem = () => {
  const navigate = useNavigate();
  const { auth } = useAllContext();
  return (
    <>
      <div className="flex gap-4 justify-evenly w-full font-serif py-1 max-md:gap-3">
        <Link
          to={"/userProfile"}
          className="bg-gray-600 text-yellow-300 px-8 py-1 rounded-md flex items-center justify-center group cursor-pointer max-md:px-6 max-sm:px-4"
        >
          <p className="text-xl group-hover:text-yellow-500 group-hover:scale-110 transition duration-200 ease-in-out max-sm:text-sm">
            My Profile
          </p>
        </Link>
        <Link
          to={"/chat/chatId"}
          className="bg-gray-600 text-yellow-300 px-8 py-1 flex items-center justify-center rounded-md group cursor-pointer max-md:px-6 max-sm:px-4"
        >
          <p className="text-xl group-hover:text-yellow-500 group-hover:scale-110 transition duration-200 ease-in-out max-sm:text-sm">
            Chat
          </p>
        </Link>
        <div
          className="bg-gray-600 text-yellow-300 px-8 py-1 flex items-center justify-center rounded-md group cursor-pointer max-md:px-6 max-sm:px-4"
          onClick={async () => {
            const res = await auth?.logoutAuth();
            res.status === 200 &&
              enqueueSnackbar(res.data.message, { variant: "success" });
            navigate("/");
          }}
        >
          <p className="text-xl group-hover:text-yellow-500 group-hover:scale-110 transition duration-200 ease-in-out  max-sm:text-sm">
            Logout
          </p>
        </div>
      </div>
    </>
  );
};

export default NavLinItem;
