// import { useState } from "react";
import { useAllContext } from "../context/HireMeContext";
import EmployeeRegisterForm from "./EmployeeRegisterForm";
import EmployerRegisterForm from "./EmployerRegisterForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { auth } = useAllContext();
  const navigate = useNavigate();

  useEffect(() => {
    auth?.userType === "employer" && navigate("/register/company");
    auth?.userType === "employee" && navigate("/register/employee");
  }, [auth?.userType, navigate]);

  return (
    <>
      {auth.userType === "employer" && <EmployerRegisterForm />}
      {auth.userType === "employee" && <EmployeeRegisterForm />}
    </>
  );
};

export default RegisterPage;
