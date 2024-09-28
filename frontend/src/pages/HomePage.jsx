import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { profile } = useAuthContext();
  useEffect(() => {
    if (!profile.profile) fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    await profile?.fetchProfile();
  };
  return (
    <>
      <div className="flex flex-col text-4xl items-center justify-center font-serif">
        <div className="text-center py-2">Welcome to HireMe - Home Page</div>
      </div>
    </>
  );
};

export default HomePage;
