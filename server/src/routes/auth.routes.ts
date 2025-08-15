import { Router } from "express";
import AuthControllers from "../controllers/auth.controllers.js";
import AuthServices from "../services/auth.services.js";

const router = Router();

const authServices = new AuthServices()
const authController = new AuthControllers(authServices);

/**
 * @path: /auth/register
 * @method: POST
 */

router.post("/register", authController.register);

/**
 * @path: /auth/login
 * @method: POST
 */
router.post("/login", authController.login);

/**
 * @path: /auth/logout
 * @method: POST
 */
router.post("/logout", authController.logout);

export default router;
