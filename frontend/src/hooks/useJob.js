import { useState } from "react";
import { getAllJobs } from "../services/jobService";

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

  const createJob = async (jobData) => {};

  const updateJob = async (ojbId, updateData) => {};

  const deleteJob = async (jobId) => {};

  const applyJob = async (jobId) => {};

  return {
    jobs,
    fetchJobs,
    fetchJobDetails,
    createJob,
    updateJob,
    deleteJob,
    applyJob,
  };
};

export default useJob;
