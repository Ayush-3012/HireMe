import app from "./app.js";
import { connectDB } from "./db/connect.js";

app.get("/", (req, res) => res.json("Hello Welcome"));

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(` Server is listening to port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => console.log("MongoDb connnection failed: ", err));
