import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";

const app = express();

// configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import eventRoute from "../src/routes/event.route.js";

// routes declearation
app.use("/api/v1/event", eventRoute);

// Route declaration for User
app.use("/api/v1/user", userRoute);

app.all("*", (_req, res) => {
  res.status(404).send("hello");
});

export default app;
