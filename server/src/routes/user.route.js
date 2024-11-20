import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getUserPreferences,
  updateUserPreferences,
  getUserNotifications,
} from "../controllers/user.controller";

const userRouter = express.Router();

// Route with Controllers
userRouter.get("/profile/:userId", authMiddleware, getUserProfile);
userRouter.patch("/profile/:userId", authMiddleware, updateUserProfile);
userRouter.get("/preferences/:userId", getUserPreferences);
userRouter.patch("/preferences/:userId", updateUserPreferences);
userRouter.get("/notification/:userId", getUserNotifications);

export default userRouter;
