import { Router } from "express";
import {
  registerEmployee,
  loginEmployee,
  viewEmployeeProfile,
  updateEmployeeProfile,
  logoutEmployee,
} from "../controllers/employee.controller.js";
import { verifyToken } from "../utils/token-manager.js";

const employeeRouter = Router();

employeeRouter.route("/register").post(registerEmployee);
employeeRouter.route("/login").post(loginEmployee);
employeeRouter.route("/profile").get(verifyToken, viewEmployeeProfile);
employeeRouter.route("/profile").put(verifyToken, updateEmployeeProfile);
employeeRouter.route("/logout").get(verifyToken, logoutEmployee);

export default employeeRouter;
