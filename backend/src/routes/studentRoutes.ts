import { Router } from "express";
import StudentController from "../controllers/studentController";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";
import { UserRole } from "../@types/types";

const router = Router();

// Route to create a new student (Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  StudentController.createStudent
);

// Route to get a all student in a school
router.get("/", authMiddleware, StudentController.getStudentsBySchool);

// Route to get all students in a class
router.get(
  "/grade",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  StudentController.getStudentsByGrade
);

// Route to get a specific student
router.get("/:id", authMiddleware, StudentController.getStudentById);

// Route to update student details (Admin only)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  StudentController.updateStudent
);

// Route to delete student (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  StudentController.deleteStudent
);

export default router;
