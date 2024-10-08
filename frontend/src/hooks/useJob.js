import { useState } from "react";
import { getAllJobs, createJob } from "../services/jobService";

export const useJob = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const fetchJobDetails = async (jobId) => {};

  const createNewJob = async (jobData) => {
    try {
      const data = await createJob(jobData);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updateExistingJob = async (jobId, updateData) => {};

  const deleteExisingJob = async (jobId) => {};

  const applyJob = async (jobId) => {};

  return {
    jobs,
    fetchJobs,
    fetchJobDetails,
    createNewJob,
    updateExistingJob,
    deleteExisingJob,
    applyJob,
  };
};

export default useJob;
