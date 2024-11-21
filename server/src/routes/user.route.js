import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getUserPreferences,
  updateUserPreferences,
  getUserNotifications,
} from "../controllers/user.controller.js";
import authenticate from "../middlewares/authenticate.js";

const userRoute = express.Router();

// Route with Controllers
userRoute.get("/profile/:userId", getUserProfile);
userRoute.patch("/profile/:userId", updateUserProfile);
userRoute.get("/preferences/:userId", getUserPreferences);
userRoute.patch("/preferences/:userId", updateUserPreferences);
userRoute.get("/notification/:userId", getUserNotifications);

export default userRoute;
