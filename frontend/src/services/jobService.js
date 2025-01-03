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

export const getSpecificJobs = async (keywords) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/jobs/getSpecificJobs`,
      {
        params: { keywords },
        withCredentials: true,
      }
    );
    const data = await res.data.foundJobs;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getEmployerJobs = async (employerId) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/jobs/viewMyJobs/${employerId}`,
      { withCredentials: true }
    );
    const data = await res.data.jobs;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (employeeId) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/jobs/viewAppliedJobs/${employeeId}`,
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
      `${import.meta.env.VITE_API_ROUTES}/jobs/view/${jobId}`,
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
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const applyForJob = async (jobId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/jobs/apply/${jobId}`,
      null,
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const updateJob = async (jobId, updateData) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_ROUTES}/jobs/update/${jobId}`,
      { updateData },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getRecommendedJobs = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/jobs/getRecommendedJobs`,
      { withCredentials: true }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const saveCurrentJob = async (jobId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/jobs/save`,
      { jobId },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const unSaveCurrentJob = async (jobId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/jobs/unSave`,
      { jobId },
      { withCredentials: true }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteJob = async (jobId) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_ROUTES}/jobs/delete/${jobId}`,
      { withCredentials: true }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
