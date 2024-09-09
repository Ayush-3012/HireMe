import axios from "axios";

export const checkAuthStatus = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/user/auth-status`,
      { withCredentials: true }
    );
    const data = res.data;
    console.log(data);
    // return data;
  } catch (error) {
    if (error) {
      throw new Error("Unable to Authenticate" + error.message);
    }
  }
};
