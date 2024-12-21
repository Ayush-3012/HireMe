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
jobRouter.route("/update/:jobId").put(verifyToken, updateJob);
jobRouter.route("/delete/:jobId").delete(verifyToken, deleteJob);

jobRouter.route("/view").get(verifyToken, getAllJobs);
jobRouter.route("/view/:jobId").get(verifyToken, getJobDetails);
jobRouter.route("/viewMyJobs/:employerId").get(verifyToken, getJobsByEmployer);
jobRouter
  .route("/viewAppliedJobs/:employeeId")
  .get(verifyToken, getAppliedJobs);
jobRouter.route("/getSpecificJobs").get(verifyToken, getSpecificJobs);
jobRouter.route("/getRecommendedJobs").get(verifyToken, getRecommendedJobs);

jobRouter.route("/apply/:jobId").post(verifyToken, applyForJob);
jobRouter.route("/save").post(verifyToken, saveJob);
jobRouter.route("/unSave").post(verifyToken, unSaveJob);

export default jobRouter;
