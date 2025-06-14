import express from "express";
import {
  GetCurrentUser,
  LogIn,
  LogOut,
  OnBoarding,
  SignUp,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/middleware.js";

export const AuthRouter = express.Router();

AuthRouter.post("/signup", SignUp);
AuthRouter.post("/login", LogIn);
AuthRouter.post("/logout", LogOut);
AuthRouter.post("/onboarding", protectRoute, OnBoarding);

AuthRouter.get("/me", protectRoute, GetCurrentUser);
