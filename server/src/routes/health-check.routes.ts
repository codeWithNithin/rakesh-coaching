import { Router } from "express";
import healthCheckControllers from "../controllers/health-check.controllers.js";

const router = Router();

router.get("/", healthCheckControllers.healthCheck);

export default router