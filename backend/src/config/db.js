import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
    console.log("Connect DB success");
  } catch (error) {
    console.log("Connect DB error: ", error);
    process.exit(1);
  }
};
