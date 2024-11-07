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

  const createNewConversation = async (newConversation) => {
    await createConversation(newConversation);
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
    fetchMessage,
    postMessage,
  };
};
