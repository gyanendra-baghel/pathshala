import { Router } from "express";
import SubjectController from "../controllers/subjectController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Create a new subject
router.post("/", authMiddleware, SubjectController.createSubject);

// Get all subjects
router.get("/", authMiddleware, SubjectController.getAllSubjects);

// Get a specific subject by ID
router.get("/:id", authMiddleware, SubjectController.getSubjectById);

// Update a subject by ID
router.put("/:id", authMiddleware, SubjectController.updateSubject);

// Delete a subject by ID
router.delete("/:id", authMiddleware, SubjectController.deleteSubject);

// Add Students to a subject
router.post(
  "/:subjectId/students",
  authMiddleware,
  SubjectController.addStudent
);

// Get Students in a subject
router.get(
  "/:subjectId/students",
  authMiddleware,
  SubjectController.getStudents
);

// Remove a student from a subject
router.delete(
  "/:subjectId/students/:studentId",
  authMiddleware,
  SubjectController.removeStudent
);

export default router;
