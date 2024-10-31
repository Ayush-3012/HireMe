import axios from "axios";

// const getUserRoute = (userType) => {
//   return userType === "employer" ? "employer" : "employee";
// };

export const getConversation = async (userId) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_ROUTES
      }/conversation/getConversation/${userId}`,
      { withCredentials: true }
    );
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Unable to Register" + error.message);
  }
};

export const createConversation = async (userId, conversation) => {
  try {
    const res = await axios.post(
      `${
        import.meta.env.VITE_API_ROUTES
      }/conversation/createConversation/${userId}`,
      { conversation },
      { withCredentials: true }
    );
    const data = res.data;
    return data;
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

export const sendMessage = async (conversationId, message) => {
  try {
    const res = await axios.post(
      `${
        import.meta.env.VITE_API_ROUTES
      }/message/sendMessage/${conversationId}`,
      { message },
      { withCredentials: true }
    );
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Unable to Register" + error.message);
  }
};
