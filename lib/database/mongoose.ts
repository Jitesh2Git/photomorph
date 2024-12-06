import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MongoDB URL is not defined.");
}

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  try {
    return await mongoose.connect(MONGODB_URL, {
      dbName: "photomorph",
      bufferCommands: false,
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Could not connect to the database.");
  }
};
