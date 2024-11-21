import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// configuration
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
import eventRoute from '../src/routes/event.route.js';

// Define the routes
app.use('/api/v1/event', eventRoute);
app.use('/api/v1/user', userRoute);

// Catch-all for undefined routes
app.all('*', (_req, res) => {
  res.status(404).send('Route not found');
});
// Routes declaration
app.use('/api/v1/organizer', organizerRoute);
app.use('/api/v1/event', eventRoute);

export default app;
