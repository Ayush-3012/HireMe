import { useEffect } from "react";
import {
  createConversation,
  getConversation,
  getMessage,
  sendMessage,
} from "../services/chatService";

export const useAuth = () => {
  //   const [user, setUser] = useState(null);
  //   const [userType, setUserType] = useState(null);

  useEffect(() => {}, []);

  const fetchConversation = async (user) => {
    const data = await getConversation(user);
    if (data) {
      console.log(data);
    }
  };

  const buildConversatin = async (user, conversation) => {
    const data = await createConversation(user, conversation);
    if (data) {
      console.log(data);
    }
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
    buildConversatin,
    fetchMessage,
    postMessage,
  };
};
