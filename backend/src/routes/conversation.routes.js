import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import {
  createConversation,
  getUserConversation,
} from "../controllers/conversatoin.controller.js";

const conversationRouter = Router();

conversationRouter.route("/getConversation").get(getUserConversation);
conversationRouter.route("/createConversation").post(createConversation);

export default conversationRouter;
