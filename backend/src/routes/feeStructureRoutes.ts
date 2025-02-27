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

// Route to get the fee structure
router.get("/:id", authMiddleware, FeeStructureController.getFeeStructureById);

// Route to get fee structure by student ID
router.get(
  "/student/:studentId",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  FeeStructureController.getFeeStructureByStudent
);

// Route to update fee structure details (Admin only)
router.put("/:id", authMiddleware, roleMiddleware([UserRole.ADMIN]));

// Route to update fee structure by student ID (Admin only)
router.put(
  "/student/:studentId",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  FeeStructureController.updateFeeStructureByStudent
);

// Route to delete a fee structure (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  FeeStructureController.deleteFeeStructure
);

export default router;
