import { Router } from "express";
import {
  registerEmployee,
  loginEmployee,
  viewEmployeeProfile,
  updateEmployeeProfile,
  viewApplicantProfile,
  logoutEmployee,
} from "../controllers/employee.controller.js";
import { verifyToken } from "../utils/token-manager.js";

const employeeRouter = Router();

employeeRouter.route("/register").post(registerEmployee);
employeeRouter.route("/login").post(loginEmployee);
employeeRouter.route("/auth-status").get(verifyToken, (req, res) => {
  res
    .status(200)
    .json({ message: "User is authenticated", userId: req.user.userId });
});
employeeRouter.route("/profile").get(verifyToken, viewEmployeeProfile);
employeeRouter.route("/getApplicants").post(verifyToken, viewApplicantProfile);
employeeRouter.route("/profile").put(verifyToken, updateEmployeeProfile);
employeeRouter.route("/logout").get(verifyToken, logoutEmployee);

export default employeeRouter;
