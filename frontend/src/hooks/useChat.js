import {
  checkConversationExists,
  createConversation,
  getConversation,
  getMessage,
  sendMessage,
  deleteCurrentConversation,
} from "../services/chatService";

export const useChat = () => {
  const fetchConversation = async (userId) => {
    const data = await getConversation(userId);
    if (data) return data.conversations;
  };

  const createNewConversation = async (newConversation) => {
    const data = await createConversation(newConversation);
    return data;
  };

  const checkConversation = async (employerId, employeeId, jobId) => {
    const data = await checkConversationExists(employerId, employeeId, jobId);
    return data;
  };

  const fetchMessage = async (conversationId) => {
    const data = await getMessage(conversationId);

    if (data) {
      return data.message;
    }
  };

  const deleteConversation = async (conversationId) => {
    const data = await deleteCurrentConversation(conversationId);
    return data;
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
    deleteConversation,
  };
};
