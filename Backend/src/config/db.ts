import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || "");
    console.log("DataBase Connected");
  } catch (err) {
    console.log("Error Connecting to the DataBase:", err);
  }
};

export default ConnectDb;
