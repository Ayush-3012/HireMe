import { useState } from "react";
import {
  getAllJobs,
  createJob,
  getJobDetails,
  getEmployerJobs,
  updateJob,
  deleteJob,
  getSpecificJobs,
  saveCurrentJob,
  applyForJob,
} from "../services/jobService";

export const useJob = () => {
  const [jobs, setJobs] = useState([]);
  const [employerJobs, setEmployerJobs] = useState([]);
  const [specificJobs, setSpecificJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const fetchSpecificJobs = async (keywords) => {
    try {
      const data = await getSpecificJobs(keywords);
      setSpecificJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployerJobs = async (userId) => {
    try {
      const data = await getEmployerJobs(userId);
      setEmployerJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJobDetails = async (jobId) => {
    try {
      const data = await getJobDetails(jobId);
      return data.foundJob;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const createNewJob = async (jobData) => {
    try {
      const data = await createJob(jobData);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updateExistingJob = async (jobId, updateData) => {
    try {
      const data = await updateJob(jobId, updateData);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const bookmarkJob = async (jobId) => {
    try {
      const data = await saveCurrentJob(jobId);
      console.log(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const deleteExisingJob = async (jobId) => {
    try {
      const data = await deleteJob(jobId);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const applyJob = async (jobId) => {
    try {
      const data = await applyForJob(jobId);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return {
    jobs,
    employerJobs,
    specificJobs,
    fetchJobs,
    fetchJobDetails,
    createNewJob,
    fetchSpecificJobs,
    fetchEmployerJobs,
    updateExistingJob,
    deleteExisingJob,
    bookmarkJob,
    applyJob,
  };
};

export default useJob;
