/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import EEHome from "../components/eeComponents/EEHome";
import ERHome from "../components/erComponents/ERHome";
import Welcome from "../components/Welcome";
import { useAllContext } from "../context/AuthContext";
// import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const currentUser = localStorage.getItem("userType");
  const { auth } = useAllContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user) {
      navigate("/");
    }
    // const fetchData = async () => {
    //   try {
    //     if (profile) await profile.fetchProfile(currentUser);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // auth.user && fetchData();
  }, [auth.user, auth.userType]);

  return (
    <>
      {auth?.user && auth?.userType && (
        <div className="font-serif bg-gray-800">
          <Welcome />
          <div className="px-1">
            {currentUser === "employee" && <EEHome />}
            {currentUser === "employer" && <ERHome />}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
