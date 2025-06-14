import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controllers/userController.js";

export const UserRouter = express.Router();

UserRouter.use(protectRoute);

UserRouter.get("/", getRecommendedUsers);
UserRouter.get("/friends", getMyFriends);

UserRouter.post("/friend-request/:id", sendFriendRequest);
UserRouter.put("/friend-request/:id/accept", acceptFriendRequest);

UserRouter.get("/friend-request", getFriendRequests);
UserRouter.get("/outgoing-friend-requests", getOutgoingFriendReqs);
