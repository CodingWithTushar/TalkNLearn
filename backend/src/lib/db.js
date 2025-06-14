import mongoose from "mongoose";

export async function ConnectMongoDB() {
  const MONGOOSE_URL = process.env.MONGOOSE_URL;

  try {
    if (!MONGOOSE_URL) {
      console.error("❌ Missing MONGOOSE_URL in environment variables.");
      throw new Error("MONGOOSE_URL is required to connect to MongoDB.");
    }
    const conn = await mongoose.connect(MONGOOSE_URL);
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
}
