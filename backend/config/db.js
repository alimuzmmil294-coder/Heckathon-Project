import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/medflow",
      {
        serverSelectionTimeoutMS: 3000,
      },
    );
    console.log(`[MedFlow DB] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(
      `[MedFlow DB Warning] MongoDB connection failed: ${error.message}`,
    );
    console.warn(
      `[MedFlow DB Warning] Server will continue running in in-memory / mock-assisted mode for demonstration.`,
    );
  }
};

export default connectDB;
