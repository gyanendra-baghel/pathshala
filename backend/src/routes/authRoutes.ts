import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import AuthController from "../controllers/authController";

const router = Router();

router.get("/", authMiddleware, AuthController.getMe);

router.post("/login", AuthController.login);

export default router;
