import axios from "axios";

export const getConversation = async (userId) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_ROUTES
      }/conversations/getConversation/${userId}`,
      { withCredentials: true }
    );
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Unable to Register" + error.message);
  }
};

export const createConversation = async (newConversation) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/conversations/createConversation`,
      { newConversation },
      { withCredentials: true }
    );
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Unable to Register" + error.message);
  }
};

export const checkConversationExists = async (employerId, employeeId) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_ROUTES
      }/conversations/checkConversationExists?employerId=${employerId}&employeeId=${employeeId}`,
      { withCredentials: true }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Error checking conversation status", error);
  }
};

export const deleteCurrentConversation = async (conversationId) => {
  try {
    const res = await axios.delete(
      `${
        import.meta.env.VITE_API_ROUTES
      }/conversations/deleteConversation/${conversationId}`,
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    throw new Error("Unable to Register" + error.message);
  }
};

export const getMessage = async (conversationId) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_ROUTES
      }/messages/getMessage/${conversationId}`,
      { withCredentials: true }
    );
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Unable to Register" + error.message);
  }
};


export const sendMessage = async (messageData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/messages/sendMessage`,
      { messageData },
      { withCredentials: true }
    );
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Unable to Register" + error.message);
  }
};
