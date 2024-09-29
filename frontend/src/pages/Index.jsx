import { useState } from "react";
import LoginPage from "../auth/LoginPage";
import UserAction from "../components/UserAction";
import RegisterPage from "../auth/RegisterPage";
import { useAuthContext } from "../context/AuthContext";

const Index = () => {
  const [currentAction, setCurrentAction] = useState("");
  const { auth } = useAuthContext();
  return (
    <>
      {!auth.userType && (
        <div className="flex items-center justify-center text-4xl text-white py-32">
          THIS IS HIRE ME.. HIRE FROM HERE
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
