import { Router } from "express";
import GradeController from "../controllers/gradeController";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";
import { UserRole } from "../@types/types";

const router = Router();

// Create a new grade
router.post(
  "/",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  GradeController.createGrade
);

// Get all grades for a specific school
router.get(
  "/school/:sid",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN, UserRole.TEACHER]),
  GradeController.getGradesBySchool
);

// Get a specific grade by ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN, UserRole.TEACHER]),
  GradeController.getGradeById
);

// Update grade information
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  GradeController.updateGrade
);

// Delete a grade by ID
router.delete(
  "/:id",
  // authMiddleware,
  // roleMiddleware([UserRole.ADMIN]),
  GradeController.deleteGrade
);

export default router;
