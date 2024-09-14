import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_SECRET));

import employerRouter from "./routes/employer.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import jobRouter from "./routes/job.routes.js";

app.use("/api/v1/employer", employerRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/jobs", jobRouter);

export default app;
