import axios from "axios";

const getUserRoute = (userType) => {
  return userType === "employer" ? "employer" : "employee";
};

export const registerUser = async (user, userType) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/${getUserRoute(userType)}/register`,
      { user },
      { withCredentials: true }
    );
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Unable to Register" + error.message);
  }
};

export const loginUser = async (user, userType) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/${getUserRoute(userType)}/login`,
      { user },
      { withCredentials: true }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error("Unable to Login" + error.message);
  }
};

export const checkAuthStatus = async (userType) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/${getUserRoute(
        userType
      )}/auth-status`,
      { withCredentials: true }
    );
    const data = res.data;
    return data;
  } catch (error) {
    if (error) {
      throw new Error("Unable to Authenticate" + error.message);
    }
  }
};

export const logoutUser = async (userType) => {
  try {
    await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/${getUserRoute(userType)}/logout`,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
