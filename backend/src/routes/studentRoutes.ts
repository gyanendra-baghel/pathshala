import { Router } from "express";
import SchoolController from "../controllers/studentController";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";
import { UserRole } from "@prisma/client";

const router = Router();

// Route to create a new student (Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  SchoolController.createStudent
);

// Route to get a specific student
router.get("/:id", authMiddleware, SchoolController.getStudentById);

// Route to get all students in a class
router.get(
  "/:gradeId",
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  SchoolController.getStudentsByGrade
);

// Route to update student details (Admin only)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  SchoolController.updateStudent
);

export default router;
