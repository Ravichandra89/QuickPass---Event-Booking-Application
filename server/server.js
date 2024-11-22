import app from './src/app.js';
import dotenv from 'dotenv';
import prisma from './src/config/prisma.js';

dotenv.config({ path: './.env' });

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Database connection established');

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal) => {
  console.log(`${signal} received, shutting down gracefully`);
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

startServer();
