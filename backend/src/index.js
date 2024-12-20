import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./db/connect.js";

const startServer = () => {
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
