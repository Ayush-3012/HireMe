import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import {
  createConversation,
  getUserConversation,
} from "../controllers/conversation.controller.js";

const conversationRouter = Router();

conversationRouter.route("/getConversation/:userId").get(getUserConversation);
conversationRouter.route("/createConversation").post(createConversation);

export default conversationRouter;
