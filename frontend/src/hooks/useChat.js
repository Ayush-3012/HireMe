import { useEffect } from "react";
import {
  checkConversationExists,
  createConversation,
  getConversation,
  getMessage,
  sendMessage,
} from "../services/chatService";

export const useChat = () => {
  useEffect(() => {}, []);

  const fetchConversation = async (userId) => {
    const data = await getConversation(userId);
    if (data) return data.conversations;
  };

  const createNewConversation = async (newConversation) => {
    await createConversation(newConversation);
  };

  const checkConversation = async (employerId, employeeId) => {
    const data = await checkConversationExists(employerId, employeeId);
    return data;
  };

  const fetchMessage = async (conversationId) => {
    const data = await getMessage(conversationId);

    if (data) {
      return data.message;
    }
  };

  const postMessage = async (messageData) => {
    const data = await sendMessage(messageData);
    if (data) {
      return data.message;
    }
  };

  return {
    fetchConversation,
    createNewConversation,
    checkConversation,
    fetchMessage,
    postMessage,
  };
};
