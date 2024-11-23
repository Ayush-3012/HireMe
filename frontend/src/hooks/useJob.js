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
  unSaveCurrentJob,
  getRecommendedJobs,
  getAppliedJobs,
} from "../services/jobService";

export const useJob = () => {
  const [jobs, setJobs] = useState([]);
  const [employerJobs, setEmployerJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [specificJobs, setSpecificJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

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

  const fetchAppliedJobs = async (userId) => {
    try {
      const data = await getAppliedJobs(userId);
      setAppliedJobs(data);
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

  const getRecommendation = async () => {
    try {
      const data = await getRecommendedJobs();
      setRecommendedJobs(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const bookmarkJob = async (jobId) => {
    try {
      const data = await saveCurrentJob(jobId);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const unSaveJob = async (jobId) => {
    try {
      const data = await unSaveCurrentJob(jobId);
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
    const res = await applyForJob(jobId);
    return res;
    // return res.success ? {status: res.success, data: res.data} : {status: res.success, errorMessage: res.message};
  };

  return {
    jobs,
    employerJobs,
    specificJobs,
    recommendedJobs,
    appliedJobs,
    fetchJobs,
    fetchJobDetails,
    createNewJob,
    fetchSpecificJobs,
    fetchEmployerJobs,
    fetchAppliedJobs,
    updateExistingJob,
    getRecommendation,
    deleteExisingJob,
    bookmarkJob,
    unSaveJob,
    applyJob,
  };
};

export default useJob;
