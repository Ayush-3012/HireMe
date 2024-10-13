// import { useState } from "react";
import { useAllContext } from "../context/AuthContext";
import EmployerRegisterForm from "./EmployerRegisterForm";
import EmployeeRegisterForm from "./EmployeeRegisterForm";

const RegisterPage = () => {
  const { auth } = useAllContext();

  return (
    <>
      {auth.userType === "employer" && <EmployerRegisterForm />}
      {auth.userType === "employee" && <EmployeeRegisterForm />}
    </>
  );
};

export default RegisterPage;
