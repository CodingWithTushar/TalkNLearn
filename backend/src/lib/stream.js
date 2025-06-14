  import { StreamChat } from "stream-chat";
  import dotenv from "dotenv";
  dotenv.config();

  const API_KEY = process.env.GETSTREAM_API_KEY;
  const SECRET_KEY = process.env.GETSTREAM_API_SECRET;

  if (!API_KEY || !SECRET_KEY) {
    console.error("❌ Stream Chat API key or secret is missing in environment variables.");
  }

  const streamClient = StreamChat.getInstance(API_KEY, SECRET_KEY);

  export const UpsertStreamUser = async (userData) => {
    try {
      await streamClient.upsertUsers([userData]);
      return userData;
    } catch (error) {
      console.error("❌ Failed to upsert Stream user:", error.message);
    }
  };

  export const generateStreamToken = async(userId) => {
  try {
    const userIdString = userId.toString();
    const token = streamClient.createToken(userIdString)
    return token
  } catch (e) {
    console.error("❌ Failed to generate Stream token:", e.message);
  }
  }