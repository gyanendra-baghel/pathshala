import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";
import ReportController from "../controllers/reportController";
import { UserRole } from "../@types/types";

const router = Router();

router.get("/", authMiddleware, ReportController.getReports);

router.get("/:id", authMiddleware, ReportController.getReport);

router.post(
  "/",
  authMiddleware,
  roleMiddleware([UserRole.STUDENT]),
  ReportController.createReport
);

router.put(
  "/",
  authMiddleware,
  roleMiddleware([UserRole.STUDENT]),
  ReportController.updateReport
);

router.delete("/:id", authMiddleware, ReportController.deleteReport);

export default router;
