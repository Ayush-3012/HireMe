import { useEffect } from "react";
import {
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

  const createNewConversation = async (employee, employer, firstMessage) => {
    await createConversation(employee, employer, firstMessage);
  };

  const fetchMessage = async (conversationId) => {
    const data = await getMessage(conversationId);
    if (data) {
      console.log(data);
    }
  };

  const postMessage = async (conversationId, message) => {
    const data = await sendMessage(conversationId, message);
    if (data) {
      console.log(data);
    }
  };

  return {
    fetchConversation,
    createNewConversation,
    fetchMessage,
    postMessage,
  };
};
