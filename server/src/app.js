import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For handling URL-encoded data

// Static files and cookies
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import eventRoute from "../src/routes/event.route.js";

// Define the routes
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/user", userRoute);

// Catch-all for undefined routes
app.all("*", (_req, res) => {
  res.status(404).send("Route not found");
});

export default app;
