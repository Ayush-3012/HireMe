import { Router } from "express";
import {
  loginEmployer,
  logoutEmployer,
  registerEmployer,
  updateEmployerProfile,
  viewEmployerProfile,
} from "../controllers/employer.controller.js";
import { verifyToken } from "../utils/token-manager.js";

const employerRouter = Router();

employerRouter.route("/register").post(registerEmployer);
employerRouter.route("/login").post(loginEmployer);
employerRouter.route("/profile").get(verifyToken, viewEmployerProfile);
employerRouter.route("/profile").put(verifyToken, updateEmployerProfile);
employerRouter.route("/logout").get(verifyToken, logoutEmployer);

export default employerRouter;
