import { Router } from "express";
import AuthControllers from "../controllers/auth.controllers.js";
import UserService from "../services/user.services.js";

const router = Router();

const userService = new UserService()
const authController = new AuthControllers(userService);

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
