import express from 'express';
import cookieParser from 'cookie-parser';
import eventRoute from './routes/event.route.js';
import userRoute from './routes/user.route.js';
import organizerRoute from './routes/organizer.route.js';

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/v1/events', eventRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/organizer', organizerRoute);

// app.all('*', (_req, res) => {
//   res.status(404).send('Route not found');
// });

export default app;
