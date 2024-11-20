import express from "express"
import eventRoute from "../src/routes/event.route.js"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/event',eventRoute);

app.all('*', (_req, res) => {
    res.status(404).send('hello');
});

export default app;