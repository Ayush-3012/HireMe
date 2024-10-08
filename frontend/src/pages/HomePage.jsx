// import { Link } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContext";

import ERHome from "../components/erComponents/ERHome";
import Welcome from "../components/Welcome";

const HomePage = () => {
  // const { auth } = useAuthContext();
  return (
    <>
      <div className="flex flex-col text-4xl items-center justify-center font-serif">
        <Welcome />
        <ERHome />
      </div>
    </>
  );
};

export default HomePage;
