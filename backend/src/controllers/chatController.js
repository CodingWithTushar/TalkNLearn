import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID not found" });
    }
    
    const token = await generateStreamToken(userId);

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (e) {
    console.error("Stream token generation failed:", e);
    return res.status(500).json({
      success: false,
      message: "Failed to generate Stream token. Please try again later.",
    });
  }
}
