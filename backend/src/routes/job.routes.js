import { Router } from "express";
import {
  applyForJob,
  createJob,
  deleteJob,
  getAllJobs,
  getJobDetails,
  getJobsByEmployer,
  getSpecificJobs,
  updateJob,
} from "../controllers/job.controller.js";
import { verifyToken } from "../utils/token-manager.js";

const jobRouter = Router();

jobRouter.route("/create").post(verifyToken, createJob);
jobRouter.route("/view").get(verifyToken, getAllJobs);
jobRouter.route("/viewMyJobs:employerId").get(verifyToken, getJobsByEmployer);
jobRouter.route("/getSpecificJobs").get(verifyToken, getSpecificJobs);
jobRouter.route("/view:jobId").get(verifyToken, getJobDetails);
jobRouter.route("/apply:jobId").post(verifyToken, applyForJob);
jobRouter.route("/update:jobId").put(verifyToken, updateJob);
jobRouter.route("/delete:jobId").delete(verifyToken, deleteJob);

export default jobRouter;
