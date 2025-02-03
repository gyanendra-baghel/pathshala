import { Router } from "express";
import GradeController from "../controllers/gradeController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Create a new grade
router.post("/grades", GradeController.createGrade);

// Get all grades for a specific school
router.get("/grades/school/:schoolId", GradeController.getGradesBySchool);

// Get a specific grade by ID
router.get("/grades/:id", GradeController.getGradeById);

// Update grade information
router.put("/grades/:id", authMiddleware, GradeController.updateGrade);

// Delete a grade by ID
router.delete("/grades/:id", GradeController.deleteGrade);

export default router;
