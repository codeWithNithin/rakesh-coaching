import express, { type NextFunction, type Request, type Response } from "express";
import healthCheckRouter from "./routes/health-check.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use("/health-check", healthCheckRouter);
app.use('/auth', authRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  res.status((err as any).status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
