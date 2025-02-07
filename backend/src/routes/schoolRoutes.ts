import { Router } from "express";
import SchoolController from "../controllers/schoolController";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";
import { UserRole } from "../types/types";

const router = Router();

// Route to create a new school
router.post("/", SchoolController.createSchool);

// Route to get school details (Admin only)
router.get(
  "/",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  SchoolController.getAllSchools
);

// Route to get school details (Admin only)
router.get(
  "/",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  SchoolController.getSchoolById
);

// Route to update school details (Admin only)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  SchoolController.updateSchool
);

// Route to delete school details (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([UserRole.ADMIN]),
  SchoolController.deleteSchool
);

export default router;
