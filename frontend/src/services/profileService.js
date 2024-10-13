import axios from "axios";

const getUserRoute = (userType) => {
  return userType === "employer" ? "employer" : "employee";
};

export const viewProfile = async (userType) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/${getUserRoute(userType)}/profile`,
      { withCredentials: true }
    );
    const data = res.data.foundUser;
    return data;
  } catch (error) {
    throw new Error("Unable to View Profile" + error.message);
  }
};

export const updateProfile = async (userType, updatedProfile) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_ROUTES}/${getUserRoute(userType)}/profile`,
      { updatedProfile },
      { withCredentials: true }
    );
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Unable to Update Profile" + error.message);
  }
};
