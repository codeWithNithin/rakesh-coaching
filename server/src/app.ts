import express from 'express';
import healthCheckRouter from './routes/health-check.routes.js';

const app = express();

app.use('/health-check', healthCheckRouter);

export default app;