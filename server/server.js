import app from "./src/app.js";
import dotenv from "dotenv";
import prisma from "./src/config/prisma.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database");

    app.listen(port, () => {
      console.log(`Server is running at port : ${port}`);
    });
  } catch (error) {
    console.log("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect(); // Close Prisma connection
  console.log("Disconnected from the database");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM, shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});
