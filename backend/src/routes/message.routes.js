import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import {
  getConversationMessage,
  sendMessage,
} from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.route("/getMessage").get(getConversationMessage);
messageRouter.route("/sendMessage").post(sendMessage);

export default messageRouter;
