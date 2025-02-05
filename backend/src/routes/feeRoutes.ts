import { Router } from "express";
import FeeController from "../controllers/feeController";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";
import { UserRole } from "../types/types";

const router = Router();

// Route to create a fee structure (Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  FeeController.createFeeStructure
);

// Route to get the fee structure for a specific class
router.get("/:gradeId", authMiddleware, FeeController.getFeeStructuresByGrade);

// Route to update fee structure details (Admin only)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  FeeController.updateFeeStructure
);

export default router;
