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

export default router;
