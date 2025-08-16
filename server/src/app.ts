import express, { type NextFunction, type Request, type Response } from "express";
import healthCheckRouter from "./routes/health-check.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import type { HttpError } from "http-errors";
import { logger } from "./config/logger.js";
import { globalErrHandler } from "./middlewares/globarErrorHandler.js";

const app = express();

app.use(cookieParser())
app.use(express.json())


app.use("/health-check", healthCheckRouter);
app.use('/auth', authRouter)

app.use(globalErrHandler)

export default app;
