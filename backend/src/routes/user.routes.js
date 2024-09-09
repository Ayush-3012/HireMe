import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";

const userRouter = Router();

userRouter.route("/auth-status").get(verifyToken);

export default userRouter;
