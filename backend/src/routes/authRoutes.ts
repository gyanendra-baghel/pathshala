import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Authenticated",
    user: req.user,
  });
});

export default router;
