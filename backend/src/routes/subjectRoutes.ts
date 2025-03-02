import { Router } from "express";
import SubjectController from "../controllers/subjectController";
import { authMiddleware } from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";

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

// Get all subjectworks for a subject
router.get(
  "/:subjectId/subjectworks",
  authMiddleware,
  SubjectController.getSubjectworks
);

// Get a specific subjectwork by ID
router.get(
  "/:subjectId/subjectworks/:subjectworkId",
  authMiddleware,
  SubjectController.getSubjectwork
);

// Add a subjectwork
router.post(
  "/:subjectId/subjectworks",
  authMiddleware,
  upload.array("attachments"),
  SubjectController.addSubjectwork
);

// Update a subjectwork
router.put(
  "/:subjectId/subjectworks/:subjectworkId",
  authMiddleware,
  SubjectController.updateSubjectwork
);

// Delete a subjectwork
router.delete(
  "/:subjectId/subjectworks/:subjectworkId",
  authMiddleware,
  SubjectController.deleteSubjectwork
);

// Get all teachers for a subject
router.get(
  "/:subjectId/teachers",
  authMiddleware,
  SubjectController.getTeachers
);

// Add teachers to a subject
router.post(
  "/:subjectId/teachers",
  authMiddleware,
  SubjectController.addTeacher
);

// Delete a teacher from a subject
router.delete(
  "/:subjectId/teachers/:teacherId",
  authMiddleware,
  SubjectController.removeTeacher
);

export default router;
