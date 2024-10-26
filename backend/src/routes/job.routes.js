import { Router } from "express";
import {
  applyForJob,
  createJob,
  deleteJob,
  getAllJobs,
  getJobDetails,
  getJobsByEmployer,
  getRecommendedJobs,
  getSpecificJobs,
  getAppliedJobs,
  saveJob,
  unSaveJob,
  updateJob,
} from "../controllers/job.controller.js";
import { verifyToken } from "../utils/token-manager.js";

const jobRouter = Router();

jobRouter.route("/create").post(verifyToken, createJob);
jobRouter.route("/view").get(verifyToken, getAllJobs);
jobRouter.route("/viewMyJobs:employerId").get(verifyToken, getJobsByEmployer);
jobRouter.route("/viewAppliedJobs:employeeId").get(verifyToken, getAppliedJobs);
jobRouter.route("/getSpecificJobs").get(verifyToken, getSpecificJobs);
jobRouter.route("/view:jobId").get(verifyToken, getJobDetails);
jobRouter.route("/apply:jobId").post(verifyToken, applyForJob);
jobRouter.route("/update:jobId").put(verifyToken, updateJob);
jobRouter.route("/save").put(verifyToken, saveJob);
jobRouter.route("/unSave").put(verifyToken, unSaveJob);
jobRouter.route("/getRecommendedJobs").get(verifyToken, getRecommendedJobs);
jobRouter.route("/delete:jobId").delete(verifyToken, deleteJob);

export default jobRouter;
