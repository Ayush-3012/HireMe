import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected!");
    return;
  }

  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true; // Set the connection status to true
    console.log(
      `MongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection failed: ", error);
    throw error; // Rethrow the error to stop further execution
  }
};

export default connectDB;
