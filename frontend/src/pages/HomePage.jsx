import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col text-4xl items-center justify-center font-serif">
        <div className="text-center py-2">
          Welcome to HireMe - Home Page
        </div>
        <Link to={"/userProfile"}>Profile</Link>
      </div>
    </>
  );
};

export default HomePage;
