import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";
import notFound from "./app/middleware/notFound";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
