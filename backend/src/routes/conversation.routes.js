import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import {
  createConversation,
  getUserConversation,
  checkConversationExists,
  deleteConversation,
} from "../controllers/conversation.controller.js";

const conversationRouter = Router();

conversationRouter
  .route("/getConversation/:userId")
  .get(verifyToken, getUserConversation);
conversationRouter
  .route("/createConversation")
  .post(verifyToken, createConversation);
conversationRouter
  .route("/deleteConversation/:conversationId")
  .delete(verifyToken, deleteConversation);
conversationRouter
  .route("/checkConversationExists")
  .get(verifyToken, checkConversationExists);

export default conversationRouter;
