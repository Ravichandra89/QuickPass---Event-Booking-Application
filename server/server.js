import app from "./src/app.js";
import { config } from "dotenv";
config();

const PORT = process.env.PORT;

app.listen(PORT,(req,res) => {
    console.log("Server is started");
})