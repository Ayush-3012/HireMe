import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/connect.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(` Server is listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MongoDb connection failed: ", err));
