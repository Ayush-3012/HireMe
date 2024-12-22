import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./db/connect.js";

const startServer = async () => {
  try {
    await connectDB();
    console.log(" MongoDB connected!");
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
    process.exit(1);
  }
};

startServer();

export default startServer;
