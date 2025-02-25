import { Router } from "express";
import FeeStructureController from "../controllers/feeStructureController";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";
import { UserRole } from "../@types/types";

const router = Router();

// Route to create a fee structure (Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  FeeStructureController.createFeeStructure
);

// Route to get the fee structure for a specific school
router.get(
  "/",
  authMiddleware,
  FeeStructureController.getFeeStructuresBySchool
);

// Route to update fee structure details (Admin only)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  FeeStructureController.updateFeeStructure
);

export default router;
