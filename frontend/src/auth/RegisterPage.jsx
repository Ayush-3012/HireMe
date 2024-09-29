// import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import EmployerRegisterForm from "./EmployerRegisterForm";
import EmployeeRegisterForm from "./EmployeeRegisterForm";

const RegisterPage = () => {
  const { auth } = useAuthContext();

  return (
    <>
      {auth.userType === "employer" && <EmployerRegisterForm />}
      {auth.userType === "employee" && <EmployeeRegisterForm />}
    </>
  );
};

export default RegisterPage;
