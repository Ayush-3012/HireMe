import { useState } from "react";
import LoginPage from "../auth/LoginPage";
import UserAction from "../components/UserAction";
import RegisterPage from "../auth/RegisterPage";
import { useAllContext } from "../context/AuthContext";

const Index = () => {
  const [currentAction, setCurrentAction] = useState("");
  const { auth } = useAllContext();
  return (
    <>
      {!auth.user && !auth.userType && (
        <div className="flex items-center justify-center py-4 border-4 border-emerald-800 text-4xl ">
          <img src="../../HomePageImage.png" className="bg-red-500 " />
          <h2>Hire Me</h2>
        </div>
      )}

      {auth.userType && !auth.user && (
        <UserAction onActionChange={(action) => setCurrentAction(action)} />
      )}

      {currentAction === "login" && <LoginPage logingUser={auth.userType} />}
      {currentAction === "register" && (
        <RegisterPage registeringUser={auth.userType} />
      )}
    </>
  );
};

export default Index;
