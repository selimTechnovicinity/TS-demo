import dotenv from "dotenv";
import express from "express";
import router from "./app/routes";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/v1", router);

export default app;
