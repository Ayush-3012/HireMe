import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/connect.js";

dotenv.config({
  path: "./env",
});

const startServer = () => {
  connectDB()
    .then(() => {
      app.listen(process.env.PORT || 3000, () => {
        console.log(` Server is listening to port ${process.env.PORT || 3000}`);
      });
    })
    .catch((err) => console.log("MongoDb connection failed: ", err));
};

startServer();

export default startServer;
