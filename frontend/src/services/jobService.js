import axios from "axios";

export const getAllJobs = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/jobs/view`,
      { withCredentials: true }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getEmployerJobs = async (employerId) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/jobs/viewMyJobs${employerId}`,
      { withCredentials: true }
    );
    const data = await res.data.jobs;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getJobDetails = async (jobId) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/jobs/view${jobId}`,
      { withCredentials: true }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createJob = async (jobData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/jobs/create`,
      { jobData },
      { withCredentials: true }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const applyForJob = async (JobId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/jobs/apply:${JobId}`,
      { withCredentials: true }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = async (JobId, updateData) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_ROUTES}/jobs/update:${JobId}`,
      { updateData },
      { withCredentials: true }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteJob = async (JobId) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_ROUTES}/jobs/delete:${JobId}`,
      { withCredentials: true }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
