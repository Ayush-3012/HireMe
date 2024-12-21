// import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/connect.js";

const startServer = () => {
  // dotenv.config();
  connectDB()
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(` Server is listening to port ${process.env.PORT}`);
      });
    })
    .catch((err) => console.log("MongoDb connection failed: ", err));
};

startServer();

export default startServer;
