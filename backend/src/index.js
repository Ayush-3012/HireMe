import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://hire-me-ayush-3012.vercel.app"],
    credentials: true,
  },
});

app.get("/", (req, res) => res.send("Hello, Welcome!"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A User disconnected");
  });
});

connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(` Server is listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MongoDb Connection failed: ", err));
