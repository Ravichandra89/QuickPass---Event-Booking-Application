import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes import
import eventRoute from '../src/routes/event.route.js';
import organizerRoute from '../src/routes/organizer.route.js';

const app = express();

// Configuration
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes declaration
app.use('/api/v1/organizer', organizerRoute);
app.use('/api/v1/event', eventRoute);

export default app;
