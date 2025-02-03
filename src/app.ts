import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.use(globalErrorHandler);

export default app;
