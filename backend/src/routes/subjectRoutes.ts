import { Router } from "express";
import SubjectController from "../controllers/subjectController";

const router = Router();

// Get all subjects for a specific school
router.get("/school/:schoolId", SubjectController.getSubjectsBySchool);

// Get a specific subject by ID
router.get("/:id", SubjectController.getSubjectById);

// Create a new subject
router.post("/", SubjectController.createSubject);

// Update a subject by ID
router.put("/:id", SubjectController.updateSubject);

// Delete a subject by ID
router.delete("/:id", SubjectController.deleteSubject);

export default router;
