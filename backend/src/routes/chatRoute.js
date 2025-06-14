import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import { getStreamToken } from "../controllers/chatController.js";

export const ChatRouter = express.Router();

ChatRouter.get("/token" , protectRoute , getStreamToken)